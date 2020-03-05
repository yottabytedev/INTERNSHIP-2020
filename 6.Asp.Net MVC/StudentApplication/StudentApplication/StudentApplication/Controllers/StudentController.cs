using StudentApplication.Models;
using StudentApplication.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StudentApplication.Controllers
{
    public class StudentController : Controller
    {
        private StudentDBContext db = new StudentDBContext();

        public ActionResult Home()
        {
            return View();
        }

        // GET: Student
        public ActionResult Index()
        {
            var students = from s in db.Students.Include("Department")
                           orderby s.ID
                           select s;

            foreach (var std in students)
            {
                if (std.Department == null)
                {
                    std.Department = new Department()
                    {
                        DepartmentName = "N/A"
                    };
                }
            }

            return View(students);
        }

        public ActionResult Edit(int id)
        {
            var student = new StudentViewModel()
            {
                Student = db.Students.Include("Department").Single(x => x.ID == id),
                Department = db.Departments.ToList()
            };
            return View(student);
        }

        [HttpPost]
        public ActionResult Edit(int id,Student student)
        {
            try
            {
                var std = db.Students.Include("Department").Single(x => x.ID == id);
                try
                {
                    std.FirstName = student.FirstName;
                    std.LastName = student.LastName;
                    std.DOB = student.DOB;
                    std.Email = student.Email;
                    std.Gender = student.Gender;
                    std.DepartmentId = student.DepartmentId;   
                }
                catch(Exception)
                {
                    var viewModel = new StudentViewModel()
                    {
                        Student = student,
                        Department = db.Departments.ToList()
                    };
                    return View(viewModel);
                }
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            catch (Exception)
            {
                return View();
            }
            
        }

        public ActionResult Details(int id)
        {
            var std = db.Students.Single(x => x.ID == id);
            return View(std);
        }

        public ActionResult Delete(int id)
        {
            var std = db.Students.Single(x => x.ID == id);
            return View(std);
        }

        [HttpPost]
        public ActionResult Delete(int id,Student student)
        {
            try
            {
                var std = db.Students.Single(x => x.ID == id);
                db.Students.Remove(std);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            catch 
            {

                return View(); 
            }
            
        }

        public ActionResult Create()
        {
            var viewModel = new StudentViewModel()
                {
                    Student = new Student(),
                    Department = db.Departments.ToList()
                };
            viewModel.Student.DOB = DateTime.Now;
            return View("Create",viewModel);
        }

        [HttpPost]
        public ActionResult Create(Student student)
        {
            if(!ModelState.IsValid)
            {
                var viewModel = new StudentViewModel()
                {
                    Student = student,
                    Department = db.Departments.ToList()
                };
                return View("Create", viewModel);
            }

            db.Students.Add(student);
            db.SaveChanges();
            return RedirectToAction("Index");   
        }
    }
}