using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Model;

namespace StudentManagementSystem.Data
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options)
            : base(options) { }

        public DbSet<Student> Students { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().ToTable("Students");
        }
    }
}