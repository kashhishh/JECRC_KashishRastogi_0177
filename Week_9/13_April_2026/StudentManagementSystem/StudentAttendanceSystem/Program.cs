using Microsoft.EntityFrameworkCore;
using StudentAttendanceSystem.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ EF Core
builder.Services.AddDbContext<AttendanceDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AttendanceDB")));

// ✅ CORS
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

app.UseCors("AllowAngular");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();