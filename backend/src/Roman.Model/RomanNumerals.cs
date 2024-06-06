namespace Roman.Model;
/*
 * Converting between Roman numeral and integer value.
 */
public static class RomanNumerals
{
    
    // Structure for a pair of an integer and equivalent Roman numeral string
    private readonly struct SymbolNumberPair(int value, string symbol)
    {
        public int Value { get; init; } = value;
        public string Symbol { get; init; } = symbol;
    }

    // A lists containing instances of the struct for a pair of number and string
    // This prefixed lookup structure is the bases for our logic when doing conversion
    private static readonly SymbolNumberPair[] SymbolNumbers = [
        new SymbolNumberPair(1000, "M"),
        new SymbolNumberPair(900, "CM"),
        new SymbolNumberPair(500, "D"),
        new SymbolNumberPair(400, "CD"),
        new SymbolNumberPair(100, "C"),
        new SymbolNumberPair(90, "XC"),
        new SymbolNumberPair(50, "L"),
        new SymbolNumberPair(40, "XL"),
        new SymbolNumberPair(10, "X"),
        new SymbolNumberPair(9, "IX"),
        new SymbolNumberPair(5, "V"),
        new SymbolNumberPair(4, "IV"),
        new SymbolNumberPair(1, "I")
    ];
    
    /*
     * Method for converting an integer value to its equivalent Roman numeral string symbol.
     */
    public static string ConvertToRomanNumeral(int num)
    {
        // Initialize result to store the string of the resulting Roman numeral
        var result = "";
        // Initialize a integer to hold the value of input number that will be subtracted until 0
        var remainingValue = num;
        
        /* Looping through the input number to calculate its Roman numeral representation by repeatedly
         * subtracting the largest prefixed Roman numeral value from the given number until the
         * number becomes zero or would be less than 0. 
         */
        while (remainingValue > 0)
        {
            // Finding the largest possible prefixed Ronan numeral pair when compared to the remaining value
            // .Find returns the default type of the element of the array if no match found
            var pair = Array.Find(SymbolNumbers, s => remainingValue >= s.Value );
            
            // Guard if we can't find a match, then skip the rest of the code and move on to the next loop
            if (pair.Equals(default(SymbolNumberPair)))
            {
                continue;
            }
            
            // With each subtraction, append the corresponding Roman numeral symbol to the resulting string
            result += pair.Symbol;
            remainingValue -= pair.Value; // Update remainingValue to prevent infinity loop
        }

        return result;
    }

    public static int ConvertToInteger(string symbol)
    {
        // Initialize local variables 
        var result = 0; 
        var prev = 0;
        
        // Split and reverse the input Roman numeral, e.g. VII -> ['I', 'V', 'V']
        var reversedArrayOfChar = symbol.ToCharArray().Reverse();
        
        /*
         * Iterate through each character in the array, compare that to the prefixed structure, while keeping track
         * of the value of the previous character in order to either do subtraction numeral or addition numeral calculation.
         */
        foreach (var digit in reversedArrayOfChar)
        {
            // Finding the exact match between Roman representation and integer value
            // .Find returns the default type of the element of the array if no match found
            var pair = Array.Find(SymbolNumbers, s => digit.ToString().Equals(s.Symbol));
            
            // No need for guard check of default type because all of the possible Roman character representation is included in the prefixed structure

            // Calculation:
            if (prev > pair.Value) // In the case of subtractive numeral, e.g. IV where V > I
            {
                result -= pair.Value; // Subtract the current match's integer value
            }
            else // In the case of addition numeral or when prev is still set to 0 because pair.Value is the first item in the character array
            {
                result += pair.Value; // Add the current match's integer value
            }

            prev = pair.Value; // Move the 'cursor' of prev by updating it to be equal to the current match's integer value
        }

        return result;
    }
}
