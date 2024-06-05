using System.Linq.Expressions;

namespace Roman.Model;

public static class RomanNumerals
{
    private readonly struct SymbolNumberPair(int value, string symbol)
    {
        public int Value { get; init; } = value;
        public string Symbol { get; init; } = symbol;
    }

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

    public static string ConvertToRomanNumeral(int num)
    {
        var result = "";
        var remainingValue = num;

        while (remainingValue > 0)
        {
            var pair = Array.Find(SymbolNumbers, s => remainingValue >= s.Value );
            if (pair.Equals(default(SymbolNumberPair)))
            {
                continue;
            }

            result += pair.Symbol;
            remainingValue -= pair.Value;
        }

        return result;
    }

    public static int ConvertToInteger(string symbol)
    {
        var result = 0;
        var prev = 0;

        foreach (var digit in symbol.ToCharArray().Reverse())
        {
            var pair = Array.Find(SymbolNumbers, s => digit.ToString().Equals(s.Symbol));
            if (pair.Equals(default(SymbolNumberPair)))
            {
                continue;
            }

            if (prev > pair.Value)
            {
                result -= pair.Value;
            }
            else
            {
                result += pair.Value;
            }

            prev = pair.Value;
        }

        return result;
    }
}
