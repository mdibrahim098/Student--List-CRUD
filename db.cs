using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Practice.Models;
using System.Data;

namespace Practice.DatabaseStudent
{
    public class db
    {
        SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);

        public void SaveStudent(Student str)
        {
            SqlCommand com = new SqlCommand("Sp_SaveStudent", con);
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@Roll", str.Roll);
            com.Parameters.AddWithValue("@Name", str.Name);
            com.Parameters.AddWithValue("@Phone", str.Phone);
            com.Parameters.AddWithValue("@BirthDate", str.BirthDate);
            com.Parameters.AddWithValue("@Subject", str.Subject);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
        public DataSet get_stdList()
        {
            SqlCommand com = new SqlCommand("Sp_ShowStudentList", con);

            com.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter da = new SqlDataAdapter(com);
            DataSet ds = new DataSet();
            da.Fill(ds);

            return ds;
        }

        public  void Delete_Student(Student str)
        {
            SqlCommand com = new SqlCommand("Sp_delete", con);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@ID", str.ID);
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }

       public void update_stdList(Student str)
        {
            SqlCommand com = new SqlCommand("Sp_updateStudent", con);
            com.CommandType = CommandType.StoredProcedure;

            com.Parameters.AddWithValue("@ID", str.ID);
            com.Parameters.AddWithValue("@Roll", str.Roll);
            com.Parameters.AddWithValue("@Name", str.Name);
            com.Parameters.AddWithValue("@Phone", str.Phone);
            com.Parameters.AddWithValue("@BirthDate", str.BirthDate);
            com.Parameters.AddWithValue("@Subject", str.Subject);
          
            con.Open();
            com.ExecuteNonQuery();
            con.Close();
        }
    }
}