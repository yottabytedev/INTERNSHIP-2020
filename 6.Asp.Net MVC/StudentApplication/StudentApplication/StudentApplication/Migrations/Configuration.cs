namespace StudentApplication.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<StudentApplication.Models.StudentDBContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(StudentApplication.Models.StudentDBContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.

            if(!context.Students.Any())
            {
                context.Students.Add(new Models.Student
                {
                    FirstName = "devesh",
                    LastName = "kaushik",
                    DOB = DateTime.ParseExact("15/06/1997 13:45:00", "dd/MM/yyyy HH:mm:ss", null),
                    Email = "devesh@gmail.com",
                    Gender = "Male",
                    DepartmentId = 1
                });
            }

            if(!context.Departments.Any())
            {
                context.Departments.Add(new Models.Department
                {
                    DepartmentId = 1,
                    DepartmentName = "CSE",
                    Location = "BBS"
                });
            }

        }
    }
}
