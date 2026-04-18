using Microsoft.EntityFrameworkCore;
using StudentAttendanceSystem.Model;

namespace StudentAttendanceSystem.Data
{
    public class AttendanceDbContext : DbContext
    {
        public AttendanceDbContext(DbContextOptions<AttendanceDbContext> options)
            : base(options) { }

        public DbSet<Attendance> Attendances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Attendance>().ToTable("Attendances");
        }
    }
}