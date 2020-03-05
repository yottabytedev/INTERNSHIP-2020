using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace StudentApplication.Models
{
    public class Student
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Min18YearsAge]
        public DateTime? DOB { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Gender { get; set; }

        public int? DepartmentId { get; set; }

        [ForeignKey("DepartmentId")]
        public virtual Department Department { get; set; }

    }
}