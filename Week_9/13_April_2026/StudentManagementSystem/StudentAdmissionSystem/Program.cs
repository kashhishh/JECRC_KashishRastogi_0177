using Microsoft.EntityFrameworkCore;
using StudentAdmissionSystem.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ EF Core + SQL Server
builder.Services.AddDbContext<AdmissionDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AdmissionDB")));

// ✅ CORS for Angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();    // ✅ Must be before UseAuthorization
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();