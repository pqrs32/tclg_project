function checkme()
{
    var email = getUrlVars()["id"];
    if (email === undefined)
    {
        $.blockUI({message: '<h1>Access forbidden</h1><br><h3>Please Select Forget Password Otpion First</h3><br>',
            css: {backgroundColor: '#f00', color: '#fff'}
        });
        return  false;
    }
}

function loginPage()
{
    window.location.href = "../template/login.html";
}
function signupPage()
{
    window.location.href = "http://www.talent.co";
}

function pswReset()
{
    var password = document.getElementById("psw").value;
    password = password.trim();
    var c_password = document.getElementById("c_psw").value;
    c_password = c_password.trim();

    if (password.length < 6 || c_password.length < 6)
    {
        if (password === "" || c_password === "")
            alert("Please Enter Your Password");
        else
            alert("Password must be greater than 6 character");
        document.getElementById("psw").focus();
        return false;
    }

    if (password !== c_password)
    {
        alert("Password Missmatch");
        document.getElementById("psw").focus();
        return false;
    }
    var email = getUrlVars()["id"];
    if (email === undefined)
    {
        $.blockUI({message: '<h1>Access forbidden</h1><br><h3>Please Select Forget Password Otpion First</h3><br>',
            css: {backgroundColor: '#f00', color: '#fff'}
        });
        return;
    }
    var email = window.atob(email);

    var flag = '';
    $.ajax({
        method: "GET",
        url: "http://ltalent.com/forgetpsw/" + email, //get method call
        dataType: "json",
        async: false,
        success: function (response)
        {
            flag = response['response']['data']['status'];
            if (flag === 0)
            {
                alert("You are not a valid user.");
                return false;
            }
        },
        error: function (data)
        {
            console.log(data);
        }
    });
    if (flag === 1)
    {
        var data = {
            isSend: 1, //link not send yet 
            email: email
        };

        $.ajax({
            method: "POST", //post method call   
            url: "http://ltalent.com/forgetpsw", //otp send by this url in post method
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
        alert("Your Password is successfully reset");
        window.location.href = "http://www.talent.co/template/login.html";
    }
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
