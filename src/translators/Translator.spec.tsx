import Translator from "./Translator.tsx";
import {render} from "@testing-library/react";

describe('Translator Component', () => {
    test('Render input fields and translate button correctly', () => {
        render(<Translator />);
    })
})