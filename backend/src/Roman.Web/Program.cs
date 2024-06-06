using Roman.Model;

// Create a new instance of the 'WebApplicationBuilder' class
var builder = WebApplication.CreateBuilder(args); // args: command-line arguments

// Configure the services collection of the builder to include MVC services
// MVC (Model-View-Controller design pattern)
builder.Services.AddMvc();

// Configure the services collection of the builder to include routing services
// Routing: mapping incoming HTTP requests to the corresponding controller actions
builder.Services.AddRouting();

// if RomanNumerals is static -> cannot be instantiated, all members are static and accessible globally
// if RomanNumerals is not static:
// builder.Services.AddTransient<RomanNumerals>();
// Dependency injection, allow to control lifetime of each istances
// Whenever a component in the application requests an instance of RomanNumerals, a new instance will be created

// Build the 'WebApplication' instance 'app' with the configured services defined above in the 'builder'
var app = builder.Build();

// Configure the web app to use routing, enabling the routing system to inspect incoming HTTP requests and determine how to route them to the appropriate controler action
app.UseRouting();

// Configure the web app to map incoming HTTP requests to controller actions
app.MapControllers();

// Start the web app and begins listening for incoming HTTP requests
app.Run();

public partial class Program { } // Allowing the class Program to be divided into multiple source files
