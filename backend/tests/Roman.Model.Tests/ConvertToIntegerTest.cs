namespace Roman.Model.Tests;

public class ConvertToIntegerTest
{
    // assert helper method
    private static void AssertCorrectConversion(int expectedValue, string symbol)
    {
        Assert.Equal(expectedValue, RomanNumerals.ConvertToInteger(symbol));
    }
    
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
        AssertCorrectConversion(expectedValue, symbol);
    }

    [Theory]
    [InlineData(2, "II")]
    [InlineData(3, "III")]
    [InlineData(20, "XX")]
    public void TestSameDigits(int expectedValue, string symbol)
    {
        AssertCorrectConversion(expectedValue, symbol);
    }
    
    [Theory]
    [InlineData(6, "VI")]
    [InlineData(7, "VII")]
    [InlineData(13, "XIII")]
    [InlineData(1006, "MVI")]
    public void TestDifferentDigits(int expectedValue, string symbol)
    {
        AssertCorrectConversion(expectedValue, symbol);
    }
    
    [Theory]
    [InlineData(4, "IV")]
    [InlineData(90, "XC")]
    [InlineData(400, "CD")]
    [InlineData(900, "CM")]
    public void TestPrefixedDigits(int expectedValue, string symbol)
    {
        AssertCorrectConversion(expectedValue, symbol);
    }
    
    [Theory]
    [InlineData(857, "DCCCLVII")]
    [InlineData(484, "CDLXXXIV")]
    [InlineData(48, "XLVIII")]
    [InlineData(993, "CMXCIII")]
    [InlineData(96, "XCVI")]
    [InlineData(495, "CDXCV")]
    public void TestRandomNumberGenerator(int expectedValue, string symbol)
    {
        AssertCorrectConversion(expectedValue, symbol);
    }
    
}