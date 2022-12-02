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

function getUserList(){
    $.ajax({
        contentType: 'application-json',
        dataType:'json',
        success:function(data){
            const users = data;
            console.log(users);
            let list = document.getElementById("myList");
  
            users.forEach((item) => {
                let li = document.createElement("li");
                let div = document.createElement("div");
                let pseudo = item.pseudo;
                let description = item.description;
                let gender= translateGender(item.gender);
                let button1 = document.createElement("button");
                let button2 = document.createElement("button");
                button1.id= "askToProtectedF";
                button2.id= "askToNonProtectedF";
                button1.setAttribute('onclick',"asktoF('item.id','true')");
                button2.setAttribute('onclick',"asktoF('item.id','false')");
                button1.textContent="Lui proposer un rapport protégé";
                button2.textContent="Lui proposer un rapport non protégé";
                div.textContent = pseudo+", "+gender+" : "+" \"..."+description+" \"";
                div.appendChild(button1);
                div.appendChild(button2);
                li.appendChild(div);
                list.appendChild(li);
            });
        },
        error:function(){
            console.log("error")
        },
        type: 'GET',
        url:"http://localhost/getRandomUsers"
    })
}
function translateGender(englishGender){
    if (englishGender == "men") {
        return "Homme";
      } else if (englishGender == "women") {
        return "Femme";
      } else {
        return "Autre";
      } 
}

function asktoF(personId,isProtected){

    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(
            {
                idPerson:personId,
                protected:isProtected
            }
        ),
        dataType: 'json',
        success: function(data){
            console.log("Success");
        },
        error: function(){
            console.log("error")
        },
        type: 'POST',
        url: 'http://localhost/askToF'
    })


}