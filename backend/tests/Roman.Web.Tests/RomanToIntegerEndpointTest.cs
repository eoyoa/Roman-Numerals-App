using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Roman.Web.Tests;

public class RomanToIntegerEndpointTest
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public RomanToIntegerEndpointTest()
    {
        // making a mock client
        _factory = new WebApplicationFactory<Program>();
        _client = _factory.CreateClient();
    }

    [Fact]
    public async Task TestEndpointOk()
    {
        // make the mock response
        var response = await _client.PostAsJsonAsync("/convert/romanToInteger", new
        {
            roman = "I"
        });
        
        // check response
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
        // make the mock response
        var response = await _client.PostAsJsonAsync("/convert/romanToInteger", new RomanNumeralController.ConvertRomanToIntRequest()
        {
            Roman = symbol
        });
        
        // check response
        var actualResponse = await response.Content.ReadFromJsonAsync<RomanNumeralController.UpdatedStateResponse>();
        Assert.Equal(value, actualResponse?.Integer);
    }
}