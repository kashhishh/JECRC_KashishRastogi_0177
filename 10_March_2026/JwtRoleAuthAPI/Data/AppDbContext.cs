using Microsoft.EntityFrameworkCore;
using JwtRoleAuthAPI.Models;
using System.Reflection.Metadata;

namespace JwtRoleAuthAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {}
        public DbSet<User> Users { get; set;}
    }
}