using Microsoft.EntityFrameworkCore;
using EMSWebAPI.Models;

namespace EMSWebAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Employee> Employees { get; set; }
    }
}