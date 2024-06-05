using Microsoft.AspNetCore.Mvc;
using Roman.Model;

namespace Roman.Web;

[Route("convert")]
public class RomanNumeralController : Controller
{
    /**
     * if romanNumerals is not static
     */
    // private readonly RomanNumerals _romanNumerals;

    // public RomanNumeralController(RomanNumerals romanNumerals)
    // {
    //     _romanNumerals = romanNumerals;
    // }
    
    public record ConvertRomanToIntRequest
    {
        public string Roman { get; set; } = "";
    }

    [HttpPost("romanToInteger")]
    public IActionResult ConvertRomanToInteger([FromBody] ConvertRomanToIntRequest request)
    {
        return Ok(new UpdatedStateResponse
        {
            IsFinished = true,
            Integer = RomanNumerals.ConvertToInteger(request.Roman),
            Roman = request.Roman
        });
    }

    public record ConvertIntToRomanRequest
    {
        public int Integer { set; get; }
    }

    [HttpPost("integerToRoman")]
    public IActionResult ConvertIntegerToRoman([FromBody] ConvertIntToRomanRequest request)
    {
        return Ok(new UpdatedStateResponse
        {
            IsFinished = true,
            Roman = RomanNumerals.ConvertToRomanNumeral(request.Integer),
            Integer = request.Integer
        });
    }

    public record UpdatedStateResponse
    {
        public bool IsFinished { get; set; }
        public string Roman { get; set; } = "";
        public int Integer { get; set; }
    }
}