import {Box, Button, TextField} from "@mui/material";

function Translator() {
    return (
        <Box>
            <Box>
                <TextField id="roman-numeral" label="Roman numeral" variant="outlined" />
                <TextField id="integer" label="Integer" variant="outlined" />
            </Box>
            <Box>
                <Button variant="contained" color="primary">Translate</Button>
            </Box>
        </Box>
    );
}

export default Translator;