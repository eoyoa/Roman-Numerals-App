import Translator from "./Translator.tsx";
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

describe('Translator Component', () => {
    test('convert roman numeral to integer test', async () => {
        const user = userEvent.setup();

        render(<Translator />);

        await user.type(screen.getByRole("textbox", { name: "Roman numeral" }), "I")

        expect(screen.getByRole("textbox", { name: "Integer" })).toHaveValue("1")
    })
})