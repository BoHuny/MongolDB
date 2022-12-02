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
            document.cookie = "token="+data.token+";expires=Fri, 31 Dec 2100 23:59:59 UTC";
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

            document.cookie ="token="+data.token+";expires=Fri, 31 Dec 2100 23:59:59 UTC";
        },
        error:function(){
            console.log("error")
        },
        type: 'POST',
        url:"http://localhost/connect"
    })
}
