function signupPage()
{
   window.location.href = "http://www.talent.co";
}

function reset()
{
    var f_username = document.getElementById("f_username").value;
    f_username = f_username.trim();
    if (f_username === "" || f_username === null) {
        alert("Please Enter a Email id");
        document.getElementById("f_username").focus();
        document.getElementById("f_username").value = f_username;
        return false;
    }
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(f_username) !== true)
    {
        alert("Invalid Email Address");
        document.getElementById("f_username").focus();
        document.getElementById("f_username").value = f_username;
        return false;
    }

    var flag = '';
    $.ajax({
        method: "GET",
        url: "http://ltalent.com/forgetpsw/" + $("#f_username").val(), //get method call
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
            isSend: 0, //link not send yet 
            email: $("#f_username").val()
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
       // alert("We send a link on your email for further Instruction");
        window.location.href = "http://www.talent.co/template/Thanks.html";
    }
}