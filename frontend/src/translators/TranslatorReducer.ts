type RequestState = {
    isLoading: boolean,
    roman: string;
    int: number;
}
export type ConversionRequest = {
    type: "Conversion"
}
export type BackendSuccessRequest = {
    type: "BackendSuccess",
    roman: string,
    int: number
}
type RequestAction = ConversionRequest | BackendSuccessRequest;

export function translatorReducer(prev: RequestState, action: RequestAction): RequestState {
    switch (action.type) {
        case "Conversion": {
            return {
                isLoading: true,
                roman: prev.roman,
                int: prev.int
            }
        }
        case "BackendSuccess": {
            return {
                isLoading: false,
                roman: action.roman,
                int: action.int
            }
        }
    }
}