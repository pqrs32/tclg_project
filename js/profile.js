function loadData()
{
  var x = sessionStorage.getItem('userEmail');
  if(x === null){
       window.location.href = "http://www.talent.co/template/login.html";
    }  
    
    
    document.getElementById("p_name").innerHTML = sessionStorage.getItem('userName');
    document.getElementById("p_email").innerHTML = sessionStorage.getItem('userEmail');
    document.getElementById("p_phone").innerHTML = sessionStorage.getItem('userPhone');
    document.getElementById("p_dob").innerHTML = sessionStorage.getItem('userDob');
    document.getElementById("p_gen").innerHTML = sessionStorage.getItem('userGender');
    document.getElementById("p_img").src = sessionStorage.getItem('userImg');
}