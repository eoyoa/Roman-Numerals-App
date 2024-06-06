import Converter from "./Converter.tsx";
import {render, screen, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {beforeAll, expect} from "vitest";
import {server} from "../testing/mockBackend.ts";
import {http, HttpResponse} from "msw";

describe('Converter Component', () => {
    beforeEach(() => {
        render(<Converter />);

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

        const user = userEvent.setup();

        const expectedOutput = screen.getByRole("textbox", { name: "Integer" });

        await user.type(screen.getByRole("textbox", { name: "Roman numeral" }), "I")
        await user.click(screen.getByRole("button"));

        // wait for textbox to turn off, then turn back on
        await waitFor(() => expect(expectedOutput).toBeEnabled())

        // expect it to have proper value after on
        expect(expectedOutput).toHaveValue("1")
    })

    test('integer to roman numeral gives proper output', async () => {
        server.use(http.post("http://localhost:5000/convert/integerToRoman", ()=> {
            return HttpResponse.json({
                roman: "II",
                integer: 2
            })
        }))
        const user = userEvent.setup();

        const expectedElement = screen.getByRole("textbox", { name: "Roman numeral" })

        await user.type(screen.getByRole("textbox", { name: "Integer" }), "2")
        await user.click(screen.getByRole("button"))

        await waitFor(() => {expect(expectedElement).toBeEnabled()})

        expect(expectedElement).toHaveValue("II")
    })

    test('textboxes disable after click convert', async () => {
        server.use(http.post("http://localhost:5000/convert/romanToInteger", async () => {
            return HttpResponse.json({
                roman: "II",
                integer: 2
            });
        }));
        const user = userEvent.setup();

        user.click(screen.getByRole("button")).then(async () => {
            await waitFor(() => {
                expect(screen.getByRole("textbox", { name: "Roman numeral" })).toBeDisabled();
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
        const user = userEvent.setup();

        await user.click(screen.getByRole("button"));

        const romanNumeralTextbox = screen.getByRole("textbox", { name: "Roman numeral" });

        await waitFor(() => {
            expect(romanNumeralTextbox).toHaveValue("II");
        })

        expect(romanNumeralTextbox).toBeEnabled();
        expect(screen.getByRole("textbox", { name: "Integer" })).toBeEnabled();
    })

    test('convert button disabled after onClick', async () => {
        server.use(http.post("http://localhost:5000/convert/romanToInteger", () => {
            return HttpResponse.json({
                roman: "II",
                integer: 2,
            })
        }))

        const user = userEvent.setup();

        user.click(screen.getByRole("button")).then(async ()=> {
            expect(screen.getByRole("button")).toBeDisabled();
        })

    })
})