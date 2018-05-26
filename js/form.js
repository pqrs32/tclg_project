//accept="image/*"
function loginCheck()
{
    var username = document.getElementById("username").value;
    username = username.trim();  
    var psw = document.getElementById("psw").value;
    psw = psw.trim();

    if (username === "" || username === null) {
        alert("Please Enter Your Email id or Phone No.");
        document.getElementById("username").focus();
        document.getElementById("username").value = username;
        return false;
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var phoneno = /^\d{10}$/;
    if (!(reg.test(username) === true || phoneno.test(username) === true))
    {
        alert("Error in Your Email or Phone No Format");
        document.getElementById("username").focus();
        document.getElementById("username").value = username;
        return false;
    }
    if (psw.length < 6)
    {
        if (psw == "" || psw == null)
            alert("Please Enter Your Password");
        else
            alert("Password must be greater than 6 character");
        document.getElementById("psw").focus();
        return false;
    }


    var data = {
        username: $("#username").val(),
        password: $("#psw").val()
    };
    var flag = '';
    $.ajax({
        method: "POST",
        url: "http://ltalent.com/signin",
        data: data,
        dataType: "json",
        async: false,
        success: function (response)
        {
            flag = response['response']['data']['status'];
            console.log(response['response']['data']['status']);
            if (flag == 1)
            {
                //alert("Login Successs");
                saveSession(response['response']['data']['userDetails']);
                window.location.href = "http://www.talent.co/template/home.html";
             }
            if (flag == 0)
            {
                alert("Incorrect Password");
            }
            if (flag == -1)
            {
                alert("Invalid UserId");
            }
        },
        error: function (data)
        {
            console.log(data);
        }
    });
}

function saveSession(userData)
{
    sessionStorage.setItem('userName', userData['name']);
    sessionStorage.setItem('userEmail', userData['email']);
    sessionStorage.setItem('userPhone', userData['phone']);
    sessionStorage.setItem('userDob', userData['dob']);
    sessionStorage.setItem('userGender', userData['gender']);
    sessionStorage.setItem('userImg', userData['image'])
}


function signupCheck()
{

    var fname = document.getElementById("fname").value;
    fname = fname.trim();
    if (fname == "" || fname == null)
    {
        alert("Please Entsdsdser Your First Name ");
        document.getElementById("fname").focus();
        $("#fname").addClass("bd-change");         //element.classList.add("mystyle");   
        return false;
    }

    var email = document.getElementById("email").value;
    email = email.trim();
    if (email == "" || email == null)
    {
        alert("Please Enter Your Email Address");
        document.getElementById("email").focus();
        return false;
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false)
    {
        alert("Invalid Email Address");
        document.getElementById("email").focus();
        document.getElementById("email").value = email;
        return false;
    }
    var phone = document.getElementById("phone").value;
    phone = phone.trim();
    if (phone == "" || phone == null)
    {
        alert("Please Enter Your Phone Number");
        document.getElementById("phone").focus();
        return false;
    }
   if (phone.length != 10)
    {
        alert("Phone Number Must Be Ten Digits");
        document.getElementById("phone").focus();
        return false;
    }
    var password = document.getElementById("password").value;
    password = password.trim();
    var c_password = document.getElementById("c_password").value;
    c_password = c_password.trim();

    if (password.length < 6 || c_password.length < 6)
    {
        if (password == "" || c_password == "")
            alert("Please Enter Your Password");
        else
            alert("Password must be greater than 6 character");
        document.getElementById("password").focus();
        return false;
    }

    if (password != c_password)
    {
        alert("Password Missmatch");
        document.getElementById("password").focus();
        return false;
    }
    var dob = document.getElementById("dob").value;
    dob = dob.trim();

    if (dob == "" || dob == null)
    {
        alert("Please Select Your Date Of Birth");
        document.getElementById("dob").focus();
        return false;
    }
    var gen = document.getElementById("gen");
    if (gen.checked == true)
    {
        gen = "Male";
    }
    var gen1 = document.getElementById("gen1");
    if (gen1.checked == true)
    {
        gen = "Female";
    }


    var data = {
        name: $("#fname").val() + " " + $("#lname").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        password: $("#password").val(),
        dob: $("#dob").val(),
        gender: gen,
        otpsend: 0
    };

    var flag = '';
    $.ajax({
        method: "GET",
        url: "http://ltalent.com/signup/" + $("#email").val(), //get method call
        dataType: "json",
        async: false,
        success: function (response)
        {
            flag = response['response']['data']['status'];
            if (flag === 1)
            {
                alert("Email Id is already Registered");
                document.getElementById("email").focus();
                return false;
            }

        },
        error: function (data)
        {
            console.log(data);
        }
    });
   var x = localStorage.getItem($("#email").val());        // if user agian using same email but user was not fully registerd 
    if (x == 1)
    {
        window.location.href = "http://www.talent.co/template/otp.html";
    }

    if (flag === 0)
    {
        $.ajax({
            method: "POST",
            url: "http://ltalent.com/signup", //otp send by this url in post method
            data: data,
            dataType: "json",
            async: true,
            success: function (response)
            { // left empty for make it faster
            },
            error: function (data)
            {
                console.log(data);
            }
        });
        localStorage.setItem($("#email").val(), 1);       // for use to avoid send multiple otp;
        localStorage.setItem('email', $("#email").val());  //for otp page
        window.location.href = "http://www.talent.co/template/otp.html";
    }


}

var slideIndex = 0; 
function showSlides() {

    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    
    setTimeout(showSlides, 2500); // Change image every 2 seconds
}




