import {BackendSuccessRequest, translatorReducer} from "./TranslatorReducer.ts";

describe("Translator Reducer", () => {
    test("Conversion request returns a proper state", () => {
        const fakeInitialState = {
            isLoading: false,
            roman: "III",
            int: 3
        }

        expect(translatorReducer(fakeInitialState,{ type: "Conversion" })).toEqual({
            isLoading: true,
            roman: "III",
            int: 3
        });
    })

    test("Successful response from backend returns a proper state", () => {
        const fakeInitialState = {
            isLoading: true,
            roman: "",
            int: 1
        };
        const fakeRequest : BackendSuccessRequest = {
            type: "BackendSuccess",
            roman: "II",
            int: 2
        }

        expect(translatorReducer(fakeInitialState,fakeRequest)).toEqual({
            isLoading: false,
            roman: "II",
            int: 2
        })
    })
})