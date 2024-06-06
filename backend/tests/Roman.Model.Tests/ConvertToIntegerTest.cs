namespace Roman.Model.Tests;
/*
 * Test file for RomanNumerals.ConvertToInteger method.
 * Verifies that the calculation/conversion from
 *   Roman symbol (string), to its equivalent integer (int) is correct.
 */
public class ConvertToIntegerTest
{
    // Test helper method that tests whether the function ConvertToInteger when takes in a symbol (string)
    //   returns the expected/correct value (integer) or not.
    private void AssertConversion(int expectedValue, string symbol)
    {
        var actualValueReturned = RomanNumerals.ConvertToInteger(symbol);
        
        // Assert that the ConvertToInteger method returns the expected value for the given Roman numeral symbol
        Assert.Equal(expectedValue, actualValueReturned);
    }
    
    /*
     * Test Batch 1: When Roman numeral is one of the unique character
     *   - Verifies that the conversion between Roman numeral of 1 character to its equivalent integer is correct.
     *   - Verifies the easiest case where the symbol maps to a value in the prefixed structure.
     */
    [Theory]
    [InlineData(1, "I")]
    [InlineData(5, "V")]
    [InlineData(10, "X")]
    [InlineData(50, "L")]
    [InlineData(100, "C")]
    [InlineData(500, "D")]
    [InlineData(1000, "M")]
    public void TestSingleSymbolNumbers(int expectedValue, string symbol)
    {
        AssertConversion(expectedValue, symbol);
    }

    /*
     * Test Batch 2: When Roman numeral has multiple digits of the same character
     *   - Verifies that the conversion between Roman numeral that has multiple digits of one character and its equivalent integer is correct.
     *   - Verifies that when two adjacent characters maps to the same integer value, calculation is still correct.
     */
    [Theory]
    [InlineData(2, "II")]
    [InlineData(3, "III")]
    [InlineData(20, "XX")]
    public void TestSameDigits(int expectedValue, string symbol)
    {
        AssertConversion(expectedValue, symbol);
    }
    
    /*
     * Test Batch 3: When Roman numeral has different character digits
     *   - Verifies that the conversion between Roman numeral that has multiple digits of one character and its equivalent integer is correct.
     *   - Verifies that when two adjacent characters don't map to the same integer value, calculation is still correct.
     */
    [Theory]
    [InlineData(6, "VI")]
    [InlineData(7, "VII")]
    [InlineData(13, "XIII")]
    [InlineData(1006, "MVI")]
    public void TestDifferentDigits(int expectedValue, string symbol)
    {
        AssertConversion(expectedValue, symbol);
    }
    
    /*
     * Test Batch 4: When Roman numeral maps to integer in the prefixed structure 
     *   - Verifies that the conversion between Roman numeral that has more than one digit but is defined in the prefixed structure.
     *   - Verifies that when two adjacent characters maps to the same integer value, calculation is still correct.
     */
    [Theory]
    [InlineData(4, "IV")]
    [InlineData(90, "XC")]
    [InlineData(400, "CD")]
    [InlineData(900, "CM")]
    public void TestPrefixedDigits(int expectedValue, string symbol)
    {
        AssertConversion(expectedValue, symbol);
    }
    
    /*
     * Test Batch 5: When Roman numeral could be anything randomly generated in range 1-1000 
     *   - Verifies that the conversion between any Roman numeral and its equivalent integer is correct.
     */
    [Theory]
    [InlineData(857, "DCCCLVII")]
    [InlineData(484, "CDLXXXIV")]
    [InlineData(48, "XLVIII")]
    [InlineData(993, "CMXCIII")]
    [InlineData(96, "XCVI")]
    [InlineData(495, "CDXCV")]
    public void TestRandomNumberGenerator(int expectedValue, string symbol)
    {
        AssertConversion(expectedValue, symbol);
    }
    
}