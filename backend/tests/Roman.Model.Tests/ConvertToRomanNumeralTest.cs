namespace Roman.Model.Tests;
/*
 * Test file for RomanNumerals.ConvertToInteger method.
 * This file contains test cases to verify the correctness of the calculation/conversion from
 *   integer value, to its equivalent Roman numeral symbol (string).
 */
public class ConvertToRomanNumeralTest
{
    // Test helper method to perform the conversion and assert the result
    private static void AssertConversion(int value, string expectedSymbol)
    {
        var actualSymbolReturned = RomanNumerals.ConvertToRomanNumeral(value);
        
        // Assert that the ConvertToRomanNumeral method returns the expected symbol for the given integer value.
        Assert.Equal(expectedSymbol, actualSymbolReturned);
    }
    
    /*
     * Test Batch 1: When integer value maps to one of the unique character
     *   - Verifies that the conversion of check point integer (1, 5, 10, ...) to its equivalent unique one character symbol is correct.
     *   - Verifies the easiest case where the integer value maps to a Roman numeral symbol (string) in the prefixed structure.
     */
    [Theory]
    [InlineData(1, "I")]
    [InlineData(5, "V")]
    [InlineData(10, "X")]
    [InlineData(50, "L")]
    [InlineData(100, "C")]
    [InlineData(500, "D")]
    [InlineData(1000, "M")]
    public void TestSingleSymbolNumbers(int value, string expectedSymbol)
    {
        AssertConversion(value, expectedSymbol);
    }
    
    /*
     * Test Batch 2: When integer value maps to Roman numeral symbol that requires appending another character to the end/back of the string
     *   - Verifies the conversion of addition numerals.
     */
    [Theory]
    [InlineData(2, "II")]
    [InlineData(3, "III")]
    [InlineData(6, "VI")]
    [InlineData(7, "VII")]
    [InlineData(15, "XV")]
    [InlineData(16, "XVI")]
    [InlineData(20, "XX")]
    public void TestAppendToTheBack(int value, string expectedSymbol) 
    {
        AssertConversion(value, expectedSymbol);
    }
    
    /*
     * Test Batch 3: When integer value maps to Roman numeral symbol that requires inserting another character to the front of the string
     *   - Verifies the conversion of subtraction numerals.
     */
    [Theory]
    [InlineData(4, "IV")]
    [InlineData(14, "XIV")]
    [InlineData(1004, "MIV")]
    [InlineData(9, "IX")]
    [InlineData(49, "XLIX")]
    [InlineData(99, "XCIX")]
    [InlineData(999, "CMXCIX")]
    public void TestInsertToFront(int value, string expectedSymbol)
    {
        AssertConversion(value, expectedSymbol);
    }
    
    /*
     * Test Batch 4: When integer value could be anything randomly generated in range 1-1000
     *   - Verifies that the conversion between any integer and its equivalent Roman numeral is correct.
     */
    [Theory]
    [InlineData(857, "DCCCLVII")]
    [InlineData(484, "CDLXXXIV")]
    [InlineData(48, "XLVIII")]
    [InlineData(993, "CMXCIII")]
    [InlineData(96, "XCVI")]
    [InlineData(495, "CDXCV")]
    public void TestRandomNumberGenerator(int value, string expectedSymbol)
    {
        AssertConversion(value, expectedSymbol);
    }
}