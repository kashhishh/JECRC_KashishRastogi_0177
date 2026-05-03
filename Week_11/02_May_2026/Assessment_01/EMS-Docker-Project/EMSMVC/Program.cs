var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

// ✅ Add HttpClient to call API
builder.Services.AddHttpClient("api", client =>
{
    client.BaseAddress = new Uri("http://emswebapi/");
});

var app = builder.Build();

app.UseStaticFiles();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();