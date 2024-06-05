import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, useCallback, useReducer, useState} from 'react';
import {translatorReducer} from "./TranslatorReducer.ts";

function Translator() {
    // TODO: why does it render multiple times?
    const [int, setInt] = useState(0);
    const [roman, setRoman] = useState("");
    const [toTranslate, setToTranslate] = useState("");

    const handleRoman = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setRoman(e.currentTarget.value);
        setToTranslate("toInt");
    }, [setRoman]);

    const handleInt = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInt(Number(e.currentTarget.value));
        setToTranslate("toRoman");
    }, [setInt])

    const [request, dispatch] = useReducer(translatorReducer, {
        isFinished: false,
        roman: roman,
        int: int,
    })

    const handleClick = useCallback(() => {
        dispatch({
            type: "translate",
            request: toTranslate === "toInt" ? {
                type: "convertRomanToInt",
                roman: roman,
            } : {
                type: "convertIntToRoman",
                int: int
            }
        })}, [dispatch, toTranslate, int, roman]);

    if (request.isFinished) {
        setRoman(request.roman)
        setInt(request.int)
        dispatch({
            type: "finish"
        })
    }

    return (
        <Box>
            <Box>
                <TextField
                    id="roman-numeral"
                    label="Roman numeral"
                    variant="outlined"
                    value={roman}
                    onChange={ handleRoman }
                />
                <TextField
                    id="integer"
                    label="Integer"
                    variant="outlined"
                    value={int}
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