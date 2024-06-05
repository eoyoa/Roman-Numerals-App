using Roman.Model;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMvc();
builder.Services.AddRouting();
// if RomanNumerals is not static:
// builder.Services.AddTransient<RomanNumerals>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();

public partial class Program { }
