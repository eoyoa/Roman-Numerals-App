import {BackendSuccessRequest, Endpoint, converterReducer, UpdateLocalRequest} from "./ConverterReducer.ts";

describe("Converter Reducer", () => {
    test("Conversion request returns a proper state", () => {
        const fakeInitialState = {
            isLoading: false,
            roman: "III",
            int: 2,
            conversionEndpoint: "romanToInteger" as Endpoint,
        }

        expect(converterReducer(fakeInitialState,{ type: "Conversion" })).toEqual({
            ...fakeInitialState,
            isLoading: true,
        });
    })

    test("Successful response from backend returns a proper state", () => {
        const fakeInitialState = {
            isLoading: true,
            roman: "",
            int: 2,
            conversionEndpoint: "integerToRoman" as Endpoint,
        };
        const fakeRequest : BackendSuccessRequest = {
            type: "BackendSuccess",
            roman: "II",
            int: 2
        }

        expect(converterReducer(fakeInitialState,fakeRequest)).toEqual({
            ...fakeInitialState,
            isLoading: false,
            roman: "II",
            int: 2
        })
    })
    test.each([
        [ "III", 2, "romanToInteger" as Endpoint ],
        [ "I", 3, "integerToRoman" as Endpoint ]
    ])("Update local values to {%s, %s, %s} correctly fixes state", ( newRoman, newInt, newEndpoint) => {
        const fakeInitialState = {
            isLoading: false,
            roman: "II",
            int: 2,
            conversionEndpoint: "integerToRoman" as Endpoint
        }
        const fakeRequest: UpdateLocalRequest = {
            type: "UpdateLocal",
            roman: newRoman,
            int: newInt,
            conversionEndpoint: newEndpoint
        }

        expect(converterReducer(fakeInitialState, fakeRequest)).toEqual({
            ...fakeInitialState,
            roman: newRoman,
            int: newInt,
            conversionEndpoint: newEndpoint
        })
    })
})