using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using ProductAPI.Models;
namespace ProductAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options) {}
        
        public DbSet<Product> Products {get; set;}
        
    }
}