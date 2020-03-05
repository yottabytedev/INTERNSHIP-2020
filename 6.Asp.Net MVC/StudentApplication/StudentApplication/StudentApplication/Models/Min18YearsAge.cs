using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace StudentApplication.Models
{
    class Min18YearsAgeAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var student = (Student)validationContext.ObjectInstance;

            if (student.DOB == null)
                return new ValidationResult("Date of Birth is required");

            var age = DateTime.Today.Year - student.DOB.Value.Year;

            return (age >= 18)
                ? ValidationResult.Success
                : new ValidationResult("Minimum 18 years of age is required");
        }
    }
}
