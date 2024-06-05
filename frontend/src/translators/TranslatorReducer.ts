import {convertToInteger, convertToRomanNumeral} from "./romanNumerals.ts";

export type RequestState = {
    isFinished: boolean,
    roman: string;
    int: number;
}
export type ConvertRomanToIntRequest = {
    type: 'convertRomanToInt',
    roman: string
}
export type ConvertIntToRomanRequest = {
    type: 'convertIntToRoman',
    int: number
}
type ConversionRequest = ConvertIntToRomanRequest | ConvertRomanToIntRequest;
export type TranslateRequest = {
    type: 'translate',
    request: ConversionRequest,
}
type FinishedRequest = {
    type: 'finish'
}
type RequestAction = TranslateRequest | FinishedRequest;

export function translatorReducer(prev: RequestState, action: RequestAction): RequestState {
    switch (action.type) {
        case 'translate': {
            switch (action.request.type) {
                case 'convertRomanToInt': {
                    return {
                        isFinished: true,
                        roman: action.request.roman,
                        int: convertToInteger(action.request.roman)
                    }
                }
                case 'convertIntToRoman': {
                    return {
                        isFinished: true,
                        roman: convertToRomanNumeral(action.request.int),
                        int: action.request.int
                    }
                }
            }
            break;
        }
        case 'finish':  {
            return {
                isFinished: false,
                roman: prev.roman,
                int: prev.int
            }
        }

            // TODO: in the future, we want to handle actions from the backend
    }
}