using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Roman.Web.Tests;

public class RomanNumeralControllerTest
{
    [Fact]
    public async Task TestRomanToInteger()
    {
        var factory = new WebApplicationFactory<Program>();
        var client = factory.CreateClient();
        var response = await client.PostAsJsonAsync("/convert/romanToInteger", new
        {
            roman = "I"
        });

        var actualResponse = await response.Content.ReadFromJsonAsync<RomanNumeralController.UpdatedStateResponse>();
        Assert.Equal(1, actualResponse?.Integer);
    }
}