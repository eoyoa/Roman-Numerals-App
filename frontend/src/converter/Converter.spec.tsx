import Converter from "./Converter.tsx";
import {render, screen, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {afterEach, beforeAll} from "vitest";
import {server} from "../testing/mockBackend.ts";
import {http, HttpResponse} from "msw";

describe('Converter Component', () => {
    beforeAll(() => {
        server.listen();

        // clean up function, called once after all tests run
        return server.close
    })

    afterEach(() => {
        // This will remove any runtime request handlers
        // after each test, ensuring isolated network behavior.
        server.resetHandlers();
    })

    test('roman numeral to integer gives proper output', async () => {
        server.use(http.post("http://localhost:5000/convert/romanToInteger", () => {
            return HttpResponse.json({
                roman: "I",
                integer: 1
            });
        }));

        const user = userEvent.setup();

        render(<Converter />);

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

        render(<Converter />);
        const expectedElement = screen.getByRole("textbox", { name: "Roman numeral" })

        await user.type(screen.getByRole("textbox", { name: "Integer" }), "2")
        await user.click(screen.getByRole("button"))

        await waitFor(() => {expect(expectedElement).toBeEnabled()})

        expect(expectedElement).toHaveValue("II")
    })
})