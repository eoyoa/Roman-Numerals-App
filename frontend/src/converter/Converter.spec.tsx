import Converter from "./Converter.tsx";
import {render, screen, waitFor} from "@testing-library/react";
import {UserEvent, userEvent} from "@testing-library/user-event";
import {beforeAll, expect} from "vitest";
import {server} from "../testing/mockBackend.ts";
import {http, HttpResponse} from "msw";

describe('Converter Component', () => {
    let user: UserEvent;
    let romanNumeralTextField: HTMLElement;
    let integerTextField: HTMLElement;
    let convertButton: HTMLElement;

    beforeEach(() => {
        render(<Converter />);
        user = userEvent.setup();
        romanNumeralTextField = screen.getByRole("textbox", { name: "Roman numeral" });
        integerTextField = screen.getByRole("textbox", { name: "Integer" });
        convertButton = screen.getByRole("button");

        // This will remove any runtime request handlers
        // after each test, ensuring isolated network behavior.
        return server.resetHandlers();
    })

    beforeAll(() => {
        server.listen();

        // clean up function, called once after all tests run
        return server.close
    })

    test('roman numeral to integer gives proper output', async () => {
        server.use(http.post("http://localhost:5000/convert/romanToInteger", () => {
            return HttpResponse.json({
                roman: "I",
                integer: 1
            });
        }));

        await user.type(romanNumeralTextField, "I")
        await user.click(convertButton);

        // wait for textbox to turn off, then turn back on
        await waitFor(() => expect(integerTextField).toBeEnabled())

        // expect it to have proper value after on
        expect(integerTextField).toHaveValue("1")
    })

    test('integer to roman numeral gives proper output', async () => {
        server.use(http.post("http://localhost:5000/convert/integerToRoman", ()=> {
            return HttpResponse.json({
                roman: "II",
                integer: 2
            })
        }))

        await user.type(integerTextField, "2")
        await user.click(convertButton);

        await waitFor(() => {expect(romanNumeralTextField).toBeEnabled()})

        expect(romanNumeralTextField).toHaveValue("II")
    })

    test('textboxes disable after click convert', async () => {
        server.use(http.post("http://localhost:5000/convert/romanToInteger", async () => {
            return HttpResponse.json({
                roman: "II",
                integer: 2
            });
        }));

        user.click(convertButton).then(async () => {
            await waitFor(() => {
                expect(romanNumeralTextField).toBeDisabled();
                expect(screen.getByRole("textbox", {name: "Integer"})).toBeDisabled()
            })
        })
    })

    test('textboxes re-enable after server response', async () => {
        server.use(http.post("http://localhost:5000/convert/romanToInteger", () => {
            return HttpResponse.json({
                roman: "II",
                integer: 2
            });
        }));

        await user.click(convertButton);

        await waitFor(() => {
            expect(romanNumeralTextField).toHaveValue("II");
        })

        expect(romanNumeralTextField).toBeEnabled();
        expect(integerTextField).toBeEnabled();
    })

    test('convert button disabled after onClick', async () => {
        server.use(http.post("http://localhost:5000/convert/romanToInteger", () => {
            return HttpResponse.json({
                roman: "II",
                integer: 2,
            })
        }))

        user.click(convertButton).then(async ()=> {
            await waitFor(() => {
                expect(convertButton).toBeDisabled();
            })
        })

    })

    test("error thrown on click doesn't change state and re-enables ui", async () => {
        server.use(http.post("http://localhost:5000/convert/integerToRoman", () => {
            return HttpResponse.error();
        }))

        await user.type(romanNumeralTextField, "II");
        await user.type(integerTextField, "3");
        await user.click(convertButton);

        expect(romanNumeralTextField).toHaveValue("II");
        expect(integerTextField).toHaveValue("3");

        await waitFor(()=> {
            expect(romanNumeralTextField).toBeEnabled()
            expect(integerTextField).toBeEnabled()
            expect(convertButton).toBeEnabled()
        });
    })

    test("int becomes 0 when invalid input to int text field", async () => {
        await user.type(integerTextField, "a");
        expect(integerTextField).toHaveValue("0")
    })

    test("previous state does not change when invalid input to roman text field", async () => {
        await user.type(romanNumeralTextField, "II");
        await user.type(romanNumeralTextField, "p");
        expect(romanNumeralTextField).toHaveValue("II")
    })
})