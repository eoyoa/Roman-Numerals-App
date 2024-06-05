using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Roman.Web.Tests;

public class IntegerToRomanEndpointTest
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public IntegerToRomanEndpointTest()
    {
        _factory = new WebApplicationFactory<Program>();
        _client = _factory.CreateClient();
    }

    [Fact]
    public async Task TestEndpointOk()
    {
        // make mock response
        var response = await _client.PostAsJsonAsync("/convert/integerToRoman", new
        {
            Integer = 1
        });
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
    
    [Theory]
    [InlineData(1, "I")]
    [InlineData(5, "V")]
    [InlineData(10, "X")]
    [InlineData(50, "L")]
    [InlineData(100, "C")]
    [InlineData(500, "D")]
    [InlineData(1000, "M")]
    public async Task TestSingleSymbol(int value, string symbol)
    {
        var response = await _client.PostAsJsonAsync("/convert/integerToRoman", new
        {
            Integer = value
        });

        // check response
        var content = await response.Content.ReadFromJsonAsync<RomanNumeralController.UpdatedStateResponse>();
        Assert.Equal(new RomanNumeralController.UpdatedStateResponse {
            Roman = symbol,
            Integer = value
        }, content);
    }
}