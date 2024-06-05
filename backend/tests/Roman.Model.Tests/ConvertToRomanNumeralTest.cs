namespace Roman.Model.Tests;

public class ConvertToRomanNumeralTest
{
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
        Assert.Equal(expectedSymbol, RomanNumerals.ConvertToRomanNumeral(value));
    }
    
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
        Assert.Equal(expectedSymbol, RomanNumerals.ConvertToRomanNumeral(value));
    }

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
        Assert.Equal(expectedSymbol, RomanNumerals.ConvertToRomanNumeral(value));
    }
    
    [Theory]
    [InlineData(857, "DCCCLVII")]
    [InlineData(484, "CDLXXXIV")]
    [InlineData(48, "XLVIII")]
    [InlineData(993, "CMXCIII")]
    [InlineData(96, "XCVI")]
    [InlineData(495, "CDXCV")]
    public void TestRandomNumberGenerator(int value, string expectedSymbol)
    {
        Assert.Equal(expectedSymbol, RomanNumerals.ConvertToRomanNumeral(value));
    }
}