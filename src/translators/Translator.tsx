import {Box, TextField} from "@mui/material";
import {convertToInteger, convertToRomanNumeral} from "./romanNumerals.ts";
import { useReducer } from 'react';

function Translator() {
    // const [romanNum, setRomanNum] = useState("");
    // const [int, setInt] = useState("");
    // const [toTranslate, setToTranslate] = useState("");

    const [ numbers, dispatch ] = useReducer(translatorReducer, {
        romanNum: '',
        int: ''
    });

    function translatorReducer(_: unknown, action: { [key: string]: string | number }) {
        switch (action.type) {
            case 'convert roman numeral': {
                const convertedNum = convertToInteger(action.romanNum as string);
                return {
                    romanNum: action.romanNum,
                    int: convertedNum === 0 ? '' : convertedNum
                }
            }
            case 'convert integer': {
                return {
                    int: action.int === 0 ? '' : action.int,
                    romanNum: convertToRomanNumeral(action.int as number)
                }
            }
        }
    }

    return (
        <Box>
            <Box>
                <TextField
                    id="roman-numeral"
                    label="Roman numeral"
                    variant="outlined"
                    value={numbers?.romanNum}
                    onChange={e => {
                        dispatch(
                            // "action" object:
                            {
                                type: 'convert roman numeral',
                                romanNum: e.target.value
                            }
                        );
                    }} />
                <TextField
                    id="integer"
                    label="Integer"
                    variant="outlined"
                    value={numbers?.int}
                    onChange={e => {
                        dispatch(
                            // "action" object:
                            {
                                type: 'convert integer',
                                int: e.target.value,
                            }
                        );
                    }}
                />
            </Box>
        </Box>
    );
}

export default Translator;