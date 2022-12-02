function onRegisterClick(pseudoId, passwordId, descriptionId, genderId) {
    let pseudoVal = document.getElementById(pseudoId).value;
    let passwordVal = document.getElementById(passwordId).value;
    let descriptionVal = document.getElementById(descriptionId).value;
    let genderVal = document.getElementById(genderId).value;
    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(
            {
                user: {
                    pseudo: pseudoVal,
                    password: passwordVal,
                    description: descriptionVal,
                    gender: genderVal
                }
            }
        ),
        dataType: 'json',
        success: function(data){
            document.cookie = "token="+data;
        },
        error: function(){
            console.log("error")
        },
        type: 'POST',
        url: 'http://localhost/register'
    })
  }

function onLoginClick(pseudoId, passwordId){
    let pseudoVal =document.getElementById(pseudoId).value;
    let passwordVal = document.getElementById(passwordId).value;
    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(
            {
                user:{
                    pseudo: pseudoVal,
                    password:passwordVal
                }
            }
        ),
        dataType:'json',
        success:function(data){
            console.log("Success");
            document.cookie = "token="+data;
            window.location = "homepage.html"
        },
        error:function(){
            console.log("error")
        },
        type: 'POST',
        url:"http://localhost/connect"
    })
}