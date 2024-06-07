export type Endpoint = "romanToInteger" | "integerToRoman";
type RequestState = {
    isLoading: boolean;
    roman: string;
    int: number;
    conversionEndpoint: Endpoint
}
export type ConversionRequest = {
    type: "Conversion"
}
export type BackendSuccessRequest = {
    type: "BackendSuccess",
    roman: string,
    int: number
}
export type UpdateLocalRequest = {
    type: "UpdateLocal",
    roman: string,
    int: number,
    conversionEndpoint: Endpoint,
}
export type BackendFailureRequest = {
    type: "BackendFailure",
    error: string,
}
type RequestAction = ConversionRequest | BackendSuccessRequest | UpdateLocalRequest | BackendFailureRequest;

export function converterReducer(prev: RequestState, action: RequestAction): RequestState {
    switch (action.type) {
        case "Conversion": {
            return { ...prev, isLoading: true }
        }
        case "BackendSuccess": {
            return { ...prev, isLoading: false, roman: action.roman, int: action.int }
        }
        case "UpdateLocal": {
            return { ...prev, roman: action.roman, int: action.int, conversionEndpoint: action.conversionEndpoint }
        }
        case "BackendFailure": {
            return { ...prev, isLoading: false }
        }
        default:
            return prev
    }
}