function validateOTP()
{
    var otp = document.getElementById("otp").value;
    otp = otp.trim();
    if (otp === "" || otp === null)
    {
        alert("Please Enter Otp");
        document.getElementById("otp").focus();
        return false;
    }
    if (otp.length !== 6)
    {
        alert("Otp  Must Be A Six Digit Number");
        document.getElementById("otp").focus();
        return false;
    }
    var email = localStorage['email'];
    //alert(email);

    if (email !== undefined)
    {
        var data = {
            email: email,
            otp: otp,
            otpsend: 1
        };

        var flag = '';
        $.ajax({
            method: "post",
            url: "http://ltalent.com/signup", //create method call
            data: data,
            dataType: "json",
            async: false,
            success: function (response)
            {
                flag = response['response']['data']['status'];
                if (flag === 0)
                {
                    alert("Incorrect Otp Number! \nPlease check Your Email Id For Otp");
                    document.getElementById("otp").focus();
                }

                if (flag === 1)
                {
                    localStorage.removeItem("email");
                    localStorage.removeItem(email);
                    alert("Sign Up Sucessfull");
                    saveSession(response['response']['data']['userDetails']);
                    window.location.href = "http://www.talent.co/template/home.html";
                }
            },
            error: function (data)
            {
                console.log(data);
            }
        });


    }
}


var myVar;

function loadData() {
    var x = localStorage['email'];
    if (x === undefined)
    {
        $.blockUI({message: '<h1>Access forbidden</h1><br><h3>Please register yourself first</h3><br>',
            css: {backgroundColor: '#f00', color: '#fff'}
        });
        return  false;
    }

    myVar = setTimeout(showPage, 2000);
}

function showPage() {

    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
    document.getElementById("emailid").innerHTML = localStorage['email'];
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

