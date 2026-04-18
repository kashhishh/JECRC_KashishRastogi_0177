using Microsoft.EntityFrameworkCore;
using StudentAdmissionSystem.Model;

namespace StudentAdmissionSystem.Data
{
    public class AdmissionDbContext : DbContext
    {
        public AdmissionDbContext(DbContextOptions<AdmissionDbContext> options)
            : base(options) { }

        public DbSet<Admission> Admissions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admission>().ToTable("Admissions");
        }
    }
}