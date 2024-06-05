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

    [HttpPost("romanToInteger")]
    public IActionResult convertRomanToInteger()
    {
        return Ok(new UpdatedStateResponse
        {
            Integer = 1
        });
    }

    public record UpdatedStateResponse
    {
        public bool IsFinished { get; set; }
        public string Roman { get; set; } = "";
        public int Integer { get; set; }
    }
}