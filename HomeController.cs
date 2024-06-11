using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Practice.Models;
using System.Data;

namespace Practice.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        DatabaseStudent.db dblayer = new DatabaseStudent.db();
        private DataColumn ID;
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult SaveStudent(Student str)
        {
            string res = string.Empty;
            try
            {
                dblayer.SaveStudent(str);
                res = "Save";
            }
            catch (Exception )
            {
                res = "failed";
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

         [HttpGet]
        public ActionResult Get_stdList()
        {
            DataSet ds = dblayer.get_stdList();
            List<Student> listst = new List<Student>();

            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                listst.Add(new Student
                {
                    ID = Convert.ToInt32(dr["ID"]),
                    Roll = Convert.ToInt32(dr["Roll"]),
                    Name = dr["Name"].ToString(),
                    Phone = Convert.ToInt64(dr["Phone"]),
                    BirthDate = Convert.ToDateTime(dr["BirthDate"]),
                    Date =  Convert.ToDateTime(dr["BirthDate"]).ToString(),
                    Subject = dr["Subject"].ToString()

                    


                });
            }

            return Json(new {listst },JsonRequestBehavior.AllowGet);
            //return Json(listst, JsonRequestBehavior.AllowGet);
        }

         [HttpPost]
        public JsonResult Delete_Student(Student str)
        {
            string res = string.Empty;
            try
            {
                dblayer.Delete_Student(str);
                res = "Deleted";
            }
            catch (Exception )
            {
                res = "Failed";
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }

         [HttpPost]
        public JsonResult Update_stdList(Student str)
        {
            string res = string.Empty;
            try
            {
                dblayer.update_stdList(str);
                res = "Updated";
            }
            catch (Exception)
            {
                res = "Failed";
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }


        
    }
}
