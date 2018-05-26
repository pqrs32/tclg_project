function logout()
{
    var x = confirm("You Are About To Signout \n Are You Sure?");
    if (x == true)
    {
        sessionStorage.clear();
        window.location.href = "http://www.talent.co/template/login.html";
    }
    return false;
}

function textPost()
{
    var msg = document.getElementById('postbox').value;
    if (msg === '')
    {
        document.getElementById('postbox').placeholder = "Please write something ";
        return false;
    }

    var data = {
        email: sessionStorage.getItem('userEmail'),
        post: msg
    };

    var flag = '';
    $.ajax({
        method: "POST",
        url: "http://ltalent.com/user/textpost", //post
        data: data,
        dataType: "json",
        async: false,
        success: function (response)
        {
            flag = response['response']['data']['status'];
            console.log(response['response']['data']['status']);
            if (flag == 1)
            {
                //saveSession(response['response']['data']['userDetails']);
                //window.location.href = "http://www.talent.co/template/home.html";
            }
        },
        error: function (data)
        {
            console.log(data);
        }
    });

    alert("dfdfdfd");
    return;
}


//function PreFetchData()
//{
//   var x = sessionStorage.getItem('userEmail');
//   if(x === null)
//     {
//      window.location.href = "http://www.talent.co/template/login.html";
//    }  
// }

function fill(Value) {
    $('#searchBox').val(Value);
    $('#display').hide();
}

$(document).ready(function () {

    var x = sessionStorage.getItem('userEmail');
    if (x === null)
    {
        window.location.href = "http://www.talent.co/template/login.html";
    }

    $("#searchBox").keyup(function () {
        var boxData = $('#searchBox').val();
        if (boxData.length < 2) {
            $("#display").html("");
            return;
        } else {
            $.ajax({
                type: "POST",
                url: "http://ltalent.com/userslist",
                async: true,
                data: {
                    searchData: boxData
                },
                success: function (res) {
                    if (res['response']['data']['result'] != false)
                    {
                        showSearchDiv(res['response']['data']['result']);
                    }
                }
            });

        }

    });

});


function showSearchDiv(userData)
{
    $('#display').html('')
    var counter = 1;
    var SearchDiv;
    SearchDiv = $(document.createElement('div'))
            .attr("id", 'searchDiv');
    
    userData.forEach(function () {
        console.log(counter);
        SearchDiv.html('hello'+counter);
        SearchDiv.appendTo("#display");
    counter++;
    });
    SearchDiv.appendTo("#display");
}


//'<label>Textbox #'+ counter + ' : </label>' +
//	      '<input type="text" name="textbox' + counter + 
//	      '" id="textbox' + counter + '" value="" >'




//
//
//function Image() {
//    var $someDiv = $('my');
//
//    
//        var img = document.createElement('img');
////        img.onload = function () {
////            //window.URL.revokeObjectURL(this.src);   C:\Users\Rohit Tomar\Desktop\New folder
////        window.URL.revokeObjectURL("C:/Users/Rohit Tomar/Desktop/New folder/1.jpg");
////        };
//        img.height = 100;
//        img.src = "C:/Users/Rohit Tomar/Desktop/New folder/1.jpg";
//        $someDiv.append(img);
//        alert("hello");
//    
//}
//
//
//function profilePic()
//{
//    
//    //code which show user detail when user click on my profile ;
//}
//
//function changeProfilePic()
//{
//    
//}
//
//function logout()
//{
//    alert("Go");
//    window.location.href = "http://www.talent.co/template/login.html";
// }
// 
// 
//
//function loadData()
// {
//    // alert("hello");
//     
// }
//
