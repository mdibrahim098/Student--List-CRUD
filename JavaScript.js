



       $(document).ready(function () {
           $("#form").show();
           $("#listContainer").hide();
           $("#save").show();

           function resetForm() {
               $("#ID").val(),
               $("#RollNo").val('');
               $("#Name").val('');
               $("#Phone").val('');
               $("#Test_DatetimeLocal").val('');
               $("#Subject").val('');
           }

           $("#save").click(function () {
               const action = $(this).text();

               let Student = {
                   ID: $("#ID").val(),
                   Roll: $("#RollNo").val(),
                   Name: $("#Name").val(),
                   Phone: $("#Phone").val(),
                   BirthDate: $("#Test_DatetimeLocal").val(),
                   Subject: $("#Subject").val()
               };

               if (action === "Save") {
                   $.ajax({
                       type: 'POST',
                       url: '/Home/SaveStudent',
                       data: JSON.stringify(Student),
                       contentType: 'application/json',
                       success: function () {
                           alert("Success");
                           resetForm();
                          
                       },
                       error: function () {
                           alert("Failed");
                       }
                   });
               } else if (action === "Update") {
                   $.ajax({
                       type: "POST",
                       url: '/Home/Update_stdList',
                       data: JSON.stringify(Student),
                       contentType: 'application/json',
                       success: function () {
                           alert("Success");
                           resetForm();
                           $("#save").text("Save");

                       },
                       error: function () {
                           alert("Failed");
                       }
                   });
               }
           });

           $("#list").click(function () {
               var action = $(this).text();

               if (action === "List") {
                   $("#form").hide();
                   $("#listContainer").show();
                   $("#save").hide();

                   $.ajax({
                       type: "GET",
                       url: '/Home/Get_stdList',
                       success: function (response) {
                           let students = response.listst;
                           let studentListHtml = "";

                           students.forEach(function (student) {
                               var date = new Date(parseInt(student.BirthDate.substr(6)));
                               const options = { timeZone: 'Asia/Dhaka' };
                               student.BirthDate = date.toLocaleDateString("en-IN", options);

                              studentListHtml += '<tr class="active"><td>' +
                              student.ID + '</td><td>' +
                              student.Roll + '</td><td>' +
                              student.Name + '</td><td>' +
                              student.Phone + '</td><td>' +
                              student.BirthDate + '</td><td>' +
                              student.Subject + '</td><td><div>' +
                              '<button class="edit btn btn-warning" data-student=\'' + JSON.stringify(student) + '\'>Edit</button>' +
                              '<button class="delete btn btn-danger" data-id="' + student.ID + '">Delete</button>' +
                              '</div></td></tr>';

                             
                           });

                           $("#studentList").html(studentListHtml);
                       },
                       error: function () {
                           alert("Failed");
                       }
                   });

                   $(this).text("Create");
               } else if (action === "Create") {
                   $("#form").show();
                   $("#listContainer").hide();
                   $("#save").show();
                   $(this).text("List");
               }
           });

           $(document).on('click', '.delete', function () {
               let studentID = $(this).data('id');

               $.ajax({
                   type: 'POST',
                   url: '/Home/Delete_Student',
                   data: JSON.stringify({ ID: studentID }),
                   contentType: 'application/json',
                   success: function () {
                       alert("Deleted");
                       $("#list").click(); // Refresh list
                   },
                   error: function () {
                       alert("Failed");
                   }
               });
           });

           $(document).on('click', '.edit', function () {
               let student = $(this).data('student');
               $("#ID").val(student.ID);
               $("#RollNo").val(student.Roll);
               $("#Name").val(student.Name);
               $("#Phone").val(student.Phone);
               $("#Test_DatetimeLocal").val(student.BirthDate);
               $("#Subject").val(student.Subject);

               $("#save").text("Update");
               $("#form").show();
               $("#listContainer").hide();
               $("#save").show();
               $("#list").text("List");
           });
       });



       //$(document).ready(function () {

       //    $("#form").show();
       //    $("#listContainer").hide();
       //    $("#save").show();

       //    function resetForm() {
       //        $("#RollNo").val('');
       //        $("#Name").val('');
       //        $("#Phone").val('');
       //        $("#Text_DatetimeLocal").val('');
       //        $("#Subject").val('');
       //    }

       //    $("save").click(function () {
       //        let action = $(this).text();

       //        let Student = {
       //            Roll: $("#RollNo").val(),
       //            Name: $("#Name").val(),
       //            Phone: $("#Phone").val(),
       //            BirthDate: $("#Test_DatetimeLocal").val(),
       //            Subject: $("#Subject").val()
       //        };

       //        if (action === 'Save') {
       //            $ajax({
       //                type: 'POST',
       //                url: '/Home/SaveStudent',
       //                data: JSON.stringify(Student),
       //                datatype: 'application/json',
       //                success: function () {
       //                    alert('Success');
       //                    resetForm();
       //                },
       //                error : function(error){
       //                    alert("Failed");
       //            }
       //            });
       //        }
       //        else if(action ==='Update'){
       //            $ajax({
       //                type : 'POST',
       //                url: '/Home/Update_stdList',
       //                data: JSON.stringify(Student),
       //                datatype: 'application/json',
       //                success: function () {
       //                    alert("Success");
       //                    resetForm();
       //                    $("#save").text("Save");
       //                },
       //                error: function () {
       //                    alert("Failed");
       //                }
       //            });
       //        }



       //    });


       //    $("#list").click(function () {
       //        var action = $(this).text();
               

       //        if (action === 'list') {
       //            $("#form").hide();
       //            $("#listContainer").show();
       //            $("#save").hide();

       //            $.ajax({
       //                type: "GET",
       //                url: "/Home/Get_stdList",
       //                success: function (response) {
       //                    let students = response.listst;
       //                    let studentListHtml = "";

       //                    students.forEach(function(student){
       //                        var date = new Date(parseInt(student.BirthDate.substr(6)));
       //                        const options = { timeZone: 'Asia/Dhaka' };
       //                        student.BirthDate = date.toLocaleDateString("en-IN", options);

       //                        studentListHtml += '<tr class="active"><td>' +
       //                        student.ID + '</td><td>' +
       //                        student.Roll + '</td><td>' +
       //                        student.Name + '</td><td>' +
       //                        student.Phone + '</td><td>' +
       //                        student.BirthDate + '</td><td>' +
       //                        student.Subject + '</td><td><div>' +
       //                        '<button class="edit btn btn-warning" data-student=\'' +  student.ID  + '\'>Edit</button>' +
       //                        '<button class="delete btn btn-danger" data-id="' + student.ID + '">Delete</button>' +
       //                        '</div></td></tr>';
       //                    });
       //                    $("studentList").html(studentListHtml);
                           
       //                },
       //                error: function () {
       //                    alert("Failed");
       //                }

       //        });
       //            $(this).text("Create");
       //        }
       //        else if (action === 'Create') {
       //            $("#form").show();
       //            $("#listContainer").hide();
       //            $("#save").show();
       //            $(this).text("list");
       //        }

       //    });

       //    $(document).on('click', '.delete', function () {

       //    });


       //});