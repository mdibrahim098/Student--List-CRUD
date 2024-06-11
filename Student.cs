using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Practice.Models
{
    public class Student
    {
       
        public int ID { get; set; }
        public int Roll { get; set; }

        public  string Name { get; set; }
        public long Phone { get; set; }

        public DateTime BirthDate { get; set; }

        public string Subject { get; set; }
        public string Date { get; set; }
    }

}