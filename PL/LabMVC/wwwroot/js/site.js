$(document).ready(function () {
    hydeShowSection('about');
    hydeShowSection('adminProfile');
    hydeShowSection('adminAcceptDeny');
    hydeShowSection('adminProfessor');
    hydeShowSection('adminCourses');
    hydeShowSection('studentProfile');
    hydeShowSection('studentCourses');
    hydeShowSection('studentHoursOfAttention');
    hydeShowSection('studentNews');
    GetStudents();
    LoadData(); 
});


function hydeShowSection(a) {
    var e = document.getElementById(a);
    if (!e) return true;
    if (e.style.display == "none") {
        e.style.display = "block"
    }
    else {
        e.style.display = "none"
    }
    return true;
}

function Add() {

    var student = {
        idCard: $('#studentCard').val(),
        name: $('#name').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        phone: $('#phone').val(),
        address: $('#address').val()

    };

    var messageValidate = validateStudent(student);
    if (messageValidate == "") {


        $.ajax({
            url: "/Home/Insert",
            data: JSON.stringify(student),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                clean();

                var done = $('#correctLabel');
                done.removeClass();
                done.addClass("alert alert-success register-alert")
                done.fadeIn(1500);
                done.fadeOut(4000);

            },
            error: function (errorMessage) {
                var response = $('#incorrectLabel');
                response.removeClass();
                response.addClass("alert alert-warning register-alert");
                response.html("El usuario ya está registrado");
                response.fadeIn(1500);
                response.fadeOut(4000);

            }
        });
    } else {
        var response = $('#incorrectLabel');
        response.removeClass();
        response.addClass("alert alert-danger register-alert");
        response.html(messageValidate);
        response.fadeIn(1800);
        response.fadeOut(4000);
    }

}

function GetStudents() {

    $.ajax({
        url: "/Home/GetStudents",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';

            $.each(result, function (key, item) {
                html += '<option id="' + item.idCard + '" name= "' + item.name + '"  lastName= "' + item.lastName +
                    '"email= "' + item.email + '" phone= "' + item.phone + '" >' + item.idCard + " - " + item.name + " " + item.lastName + '</option>';

            });
            $('#studentAcceptDeny').append(html);

        },
        error: function (errorMessage) {

            alert(errorMessage.responseText);
        }
    });
}

function AcceptStudent() {

    var student = {

        idCard: $("#chargedId").val(),
        name: $("#chargedName").val(),
        email: $("#chargedEmail").val(),
        Approval: "Aceptado"
    };

    $.ajax({
        url: "/Home/UpdateApprovalAccept",
        data: JSON.stringify(student),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {



        },
        error: function (errorMessage) {


        }
    });


}


function denyStudent() {

    var student = {

        idCard: $("#chargedId").val(),
        name: $("#chargedName").val(),
        email: $("#chargedEmail").val(),
        Approval: "Rechazado"

    };

    $.ajax({
        url: "/Home/UpdateApprovalDeny",
        data: JSON.stringify(student),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {



        },
        error: function (errorMessage) {


        }
    });


}


function AddProfessor() {

    var professor = {
        idCard: $('#CardProfessor').val(),
        name: $('#nameProfessor').val(),
        lastName: $('#lastNameProfessor').val(),
        email: $('#emailProfessor').val(),
        password: $('#passwordProfessor').val(),
        phone: $('#phoneProfessor').val(),
        address: $('#addressProfessor').val()

    };

        $.ajax({
            url: "/Home/InsertProfessor",
            data: JSON.stringify(professor),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                alert("Bien");
                

            },
            error: function (errorMessage) {
               
                alert("Mal");
            }
        });
    

}

function AddCourse() {

    var course = {
        initials: $('#acronymCourse').val(),
        name: $('#nameCourse').val(),
        credits: parseInt($('#creditsCourse').val()),
        semester: $('#semester').val(),
        scheduleId: parseInt($('#scheduleCourse').val()),
        activity: parseInt($('#conditionCourse').val())

    };

    $.ajax({
        url: "/Home/InsertCourses",
        data: JSON.stringify(course),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            alert("nice");

        },
        error: function (errorMessage) {
            alert("jajant");
        
        }
    });


}

function LoadDataCourses() {
    $.ajax({
        url: "/Home/GetCourses",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.initials + '</td>';
                html += '<td>' + item.name + '</td>';
                html += '<td>' + item.credits + '</td>';
                html += '<td>' + item.semester + '</td>';
                html += '<td>' + item.scheduleId + '</td>';
                html += '<td>' + item.activity + '</td>';
                html += '<td><a onclick= GetById(' + item.initials + ')>Editar</a> | <a onclick="Delete(' + item.initials + ')">Borrar</a></td>';
            });
            $('.tbodyCourses').html(html);

        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })

}

function DeleteCourse(ID) {

    $.ajax({
        url: "/Home/DeleteCourse/" + ID,
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            LoadDataCourses();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}

//------------------------------------------------------------

function GetByInitials(ID) {

    $.ajax({
        url: "/Home/GetById/" + ID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#idCourse').val(result.initials);
            $('#nameCourse').val(result.name);
            $('#creditsCourse').val(result.credits);
            $('#semesterCourse').val(result.semester);
            $('#scheduleCourse').val(result.scheduleId);
            $('#activityCourse').val(result.activity);



            $('#modalCourse').modal('show');
            $('#btnUpdateCourse').show();

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
//------------------------------------------------------------


function UpdateCourse() {

    var student = {

        id: parseInt($('#idCourse').val()),
        name: $('#nameCourse').val(),
        credits: $('#creditsCourse').val(),
        semester: $('#semesterCourse').val(),
        scheduleId: $('#scheduleCourse').val(),
        activity: $('#activityCourse').val(),

    };

    $.ajax({
        url: "/Home/UpdateCourse",
        data: JSON.stringify(student),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            LoadDataCourses();
            $('#myModal').modal('hide');

            $('#idCourse').val("");
            $('#nameCourse').val("");
            $('#creditsCourse').val("");
            $('#semesterCourse').val("");
            $('#scheduleCourse').val("");
            $('#activityCourse').val("");


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}  






//////////////////////////////////////////////////////////////////////

function clean() {
    document.getElementById('studentCard').value = '';
    document.getElementById('name').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
}

function validateStudent(student) {
    var e = student.email + '';
    if (student.idCard == "") {
        return "Se requiere una identificación";
    } else if (student.name == "") {
        return "Se requiere un nombre";
    } else if (student.lastName == "") {
        return "Se requieren apellidos";
    } else if (student.email == "") {
        return "Se requiere un correo electrónico";
    } else if ((student.email + '').includes("@gmail.com") == false) {
        return "El correo debe contener @gmail.com";
    } else if (student.phone == "") {
        return "Se requiere un número de teléfono";
    } else if (student.address == "") {
        return "Se requiere una dirección";
    } else if (student.password == "") {
        return "Se requiere una contraseña";

    } else {
        return "";
    }
}

function fillInputs() {
    var ddl = document.getElementById("studentAcceptDeny");
    var selectedOption = ddl.options[ddl.selectedIndex];

    var idValue = selectedOption.getAttribute("id");
    var textBox0 = document.getElementById("chargedId");
    textBox0.value = idValue;
    var nameValue = selectedOption.getAttribute("name");
    var textBox1 = document.getElementById("chargedName");
    textBox1.value = nameValue;
    var lastNameValue = selectedOption.getAttribute("lastName");
    var textBox2 = document.getElementById("chargedLastName");
    textBox2.value = lastNameValue;
    var emailValue = selectedOption.getAttribute("email");
    var textBox3 = document.getElementById("chargedEmail");
    textBox3.value = emailValue;
    var phoneValue = selectedOption.getAttribute("phone");
    var textBox4 = document.getElementById("chargedPhone");
    textBox4.value = phoneValue;
}
