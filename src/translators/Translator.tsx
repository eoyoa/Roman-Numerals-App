import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import {convertToInteger, convertToRomanNumeral} from "./romanNumerals.ts";

function Translator() {
    const [romanNum, setRomanNum] = useState("");
    const [int, setInt] = useState("");
    const [toTranslate, setToTranslate] = useState("");

    function handleTranslate() {
        switch (toTranslate) {
            case "int": {
                // convert from roman to int
                return setInt(convertToInteger(romanNum).toString())
            }
            case "rom": {
                // convert from int to roman
                return setRomanNum(convertToRomanNumeral(parseInt(int)))
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
                    value={romanNum}
                    onChange={e => {
                        setRomanNum(e.target.value)
                        setToTranslate("int")
                    }} />
                <TextField
                    id="integer"
                    label="Integer"
                    variant="outlined"
                    value={int}
                    onChange={e => {
                        setInt(e.target.value)
                        setToTranslate("rom")
                    }}
                />
            </Box>
            <Box>
                <Button variant="contained" color="primary" onClick={handleTranslate}>Translate</Button>
            </Box>
        </Box>
    );
}

export default Translator;