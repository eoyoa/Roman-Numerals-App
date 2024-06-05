import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, useCallback, useReducer, useState} from 'react';
import {BackendSuccessRequest, translatorReducer} from "./TranslatorReducer.ts";

function Translator() {
    // TODO: why does it render multiple times?
    const [localInt, setLocalInt] = useState(0);
    const [localRoman, setLocalRoman] = useState("");
    const [updateInputs, setUpdateInputs] = useState(false);
    const [conversionEndpoint, setConversionEndpoint] = useState<"romanToInteger" | "integerToRoman">("romanToInteger");

    const handleRoman = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLocalRoman(e.currentTarget.value);
        setConversionEndpoint("romanToInteger");
    }, [setLocalRoman]);

    const handleInt = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLocalInt(Number(e.currentTarget.value));
        setConversionEndpoint("integerToRoman");
    }, [setLocalInt])

    const [backendRequestState, dispatch] = useReducer(translatorReducer, {
        isLoading: false,
        roman: localRoman,
        int: localInt,
    })

    if (updateInputs) {
        setLocalRoman(backendRequestState.roman);
        setLocalInt(backendRequestState.int);
        setUpdateInputs(false);
    }

    type ConvertRomanToIntRequest = {
        Roman: string
    }
    type ConvertIntToRomanRequest = {
        Integer: number
    }

    const handleClick = useCallback(async () => {
        dispatch({
            type: "Conversion"
        })

        let jsonBody: ConvertRomanToIntRequest | ConvertIntToRomanRequest;
        switch (conversionEndpoint) {
            case "romanToInteger": {
                jsonBody = {
                    Roman: localRoman
                }
                break;
            }
            case "integerToRoman": {
                jsonBody = {
                    Integer: localInt
                }
            }
        }

        // TODO: CORS error, please fix!
        const response = await fetch(new Request(`http://localhost:5000/convert/${conversionEndpoint}`, {
            method: "POST",
            body: JSON.stringify(jsonBody)
        }));
        if (response.ok) {
            const content = await response.json()
            const successReq: BackendSuccessRequest = {
                type: "BackendSuccess",
                roman: content.Roman,
                int: content.Integer
            }
            dispatch(successReq);
            setUpdateInputs(true);
        } else {
            // dispatch failure
        }
    }, [dispatch, conversionEndpoint, localInt, localRoman]);

    console.log(backendRequestState);

    return (
        <Box>
            <Box>
                <TextField
                    id="roman-numeral"
                    label="Roman numeral"
                    variant="outlined"
                    value={localRoman}
                    onChange={ handleRoman }
                />
                <TextField
                    id="integer"
                    label="Integer"
                    variant="outlined"
                    value={localInt}
                    onChange={ handleInt }
                />
            </Box>
            <Box>
                <Button
                    variant="contained"
                    onClick={ handleClick }
                >
                    Translate
                </Button>
            </Box>
        </Box>
    );
}

export default Translator;