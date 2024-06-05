import {TranslateRequest, translatorReducer} from "./TranslatorReducer.ts";

describe("Translator Reducer", () => {
    test("Conversion request from roman to integer returns a proper state", () => {
        const fakeRequest : TranslateRequest = {
            type: "translate",
            request: {
                type: 'convertRomanToInt',
                roman: "I"
            }
        }
        const fakeInitialState = {
            isFinished: false,
            roman: "",
            int: 0
        }

        expect(translatorReducer(fakeInitialState,fakeRequest)).toEqual({
            isFinished: true,
            roman: "I",
            int: 1
        })
    })

    test("Conversion request from integer to roman returns a proper state", () => {
        const fakeRequest : TranslateRequest = {
            type: "translate",
            request: {
                type: 'convertIntToRoman',
                int: 1
            }
        }
        const fakeInitialState = {
            isFinished: false,
            roman: "",
            int: 0
        }

        expect(translatorReducer(fakeInitialState,fakeRequest)).toEqual({
            isFinished: true,
            roman: "I",
            int: 1
        })
    })
})