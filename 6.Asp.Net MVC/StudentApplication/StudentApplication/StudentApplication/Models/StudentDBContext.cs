using System.Data.Entity;

namespace StudentApplication.Models
{
    public class StudentDBContext : DbContext
    {
        public StudentDBContext()
        {

        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}