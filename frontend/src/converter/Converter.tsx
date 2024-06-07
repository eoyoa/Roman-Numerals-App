import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, useCallback, useReducer} from 'react';
import {BackendSuccessRequest, converterReducer} from "./ConverterReducer.ts";

function Converter() {
    const [backendRequestState, dispatch] = useReducer(converterReducer, {
        isLoading: false,
        roman: "",
        int: 0,
        conversionEndpoint: "romanToInteger"
    })

    const handleRoman = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "UpdateLocal",
            roman: e.target.value,
            int: backendRequestState.int,
            conversionEndpoint: "romanToInteger"
        })
    }, [backendRequestState.int]);

    const handleInt = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const intValue = isNaN(parseInt(inputValue)) ? 0 : parseInt(inputValue);
        dispatch({
            type: "UpdateLocal",
            roman: backendRequestState.roman,
            int: intValue,
            conversionEndpoint: "integerToRoman"
        })
    }, [backendRequestState.roman])

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

        // can send both fields as backend will ignore extra
        const jsonBody: ConvertRomanToIntRequest & ConvertIntToRomanRequest = {
            Roman: backendRequestState.roman,
            Integer: backendRequestState.int,
        }

        try {
            const response = await fetch(new Request(`http://localhost:5000/convert/${backendRequestState.conversionEndpoint}`, {
                method: "POST",
                body: JSON.stringify(jsonBody),
                headers: {
                    "Content-Type": "application/json"
                }
            }));
            if (response.ok) {
                const content = await response.json()
                const successReq: BackendSuccessRequest = {
                    type: "BackendSuccess",
                    roman: content.roman,
                    int: content.integer
                }
                dispatch(successReq);
            } else {
                const errorText = await response.text();
                dispatch({
                    type: "BackendFailure",
                    error: errorText
                })
            }
        } catch (error) {
            dispatch({
                type: "BackendFailure",
                error: error.message
            })
        }
    }, [backendRequestState.conversionEndpoint, backendRequestState.int, backendRequestState.roman]);

    return (
        <Box>
            <Box marginBottom={2}>
                <TextField
                    id="roman-numeral"
                    label="Roman numeral"
                    variant="outlined"
                    value={ backendRequestState.roman }
                    onChange={ handleRoman }
                    disabled={ backendRequestState.isLoading }
                    //error={ !(typeof backendRequestState.roman != "string") }
                />
                <TextField
                    id="integer"
                    label="Integer"
                    variant="outlined"
                    value={ backendRequestState.int }
                    onChange={ handleInt }
                    disabled = { backendRequestState.isLoading }
                    //error={ !(typeof backendRequestState.int != "number") }
                />
            </Box>
            <Box marginBottom={2}>
                <Button
                    variant="contained"
                    onClick={ handleClick }
                    // TODO: if wifi cuts out, handle turning .everything back on?
                    disabled={ backendRequestState.isLoading }
                >
                    Convert
                </Button>
            </Box>
        </Box>
    );
}

export default Converter;