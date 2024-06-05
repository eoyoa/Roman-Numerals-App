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
    public IActionResult convertRomanToInteger([FromBody] ConvertRomanToIntRequest request)
    {
        return Ok(new UpdatedStateResponse
        {
            Integer = RomanNumerals.ConvertToInteger(request.Roman)
        });
    }

    public record UpdatedStateResponse
    {
        public bool IsFinished { get; set; }
        public string Roman { get; set; } = "";
        public int Integer { get; set; }
    }
}