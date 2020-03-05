using StudentApplication.Models;
using System.Collections.Generic;

namespace StudentApplication.ViewModels
{
    public class StudentViewModel
    {
        public Student Student { get; set; }
        public IEnumerable<Department> Department { get; set; }
    }
}