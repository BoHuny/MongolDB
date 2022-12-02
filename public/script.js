let timeLeft = 10000000000

setInterval(function(){
    timeLeft--
    if(timeLeft >= 0){
        document.getElementById("timeLeftID").innerHTML = "Temps restant : " + timeLeft;
    }
    else {
        $.ajax({
            contentType: 'application/json',
            dataType: 'json',
            type: 'GET',
            url: 'http://20.111.50.245/getStats',
            success: function(data){
                alert("Résultats de la derniere session : " + JSON.stringify(data))
            },
            error: function(){
                console.log("error")
            }
        })
        initSessionTime()
    }

},1000)

initSessionTime()

function initSessionTime(){
    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        url: 'http://20.111.50.245/getTimeLeft',
        success: function(data){
            timeLeft = data
        },
        error: function(){
            console.log("error")
        }
    })
}

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
        url: 'http://20.111.50.245/register'
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
            window.location = "/"
        },
        error:function(){
            console.log("error")
        },
        type: 'POST',
        url:"http://20.111.50.245/connect"
    })
}

function getUserList(){
    $.ajax({
        contentType: 'application-json',
        dataType:'json',
        success:function(data){
            const users = data;
            let list = document.getElementById("myList");
  
            users.forEach((item) => {
                let div = document.createElement("div");
                let pseudo = item.pseudo;
                let description = item.description;
                let gender= translateGender(item.gender);
                let button1 = document.createElement("button");
                let button2 = document.createElement("button");
                button1.id= "askToProtectedF";
                button2.id= "askToNonProtectedF";
                let personId = item._id;
                button1.setAttribute('onclick',"asktoF('"+personId+"','true','"+button1.id+"')");
                button2.setAttribute('onclick',"asktoF('"+personId+"','false','"+button2.id+"')");
                button1.textContent="Lui proposer un rapport protégé";
                button2.textContent="Lui proposer un rapport non protégé";
                div.textContent = pseudo+", "+gender+" : "+" \"..."+description+" \"";
                div.appendChild(button1);
                div.appendChild(button2);
                list.appendChild(div);
            });
        },
        error:function(){
            console.log("error")
        },
        type: 'GET',
        url:"http://20.111.50.245/getRandomUsers"
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

function asktoF(personId,isProtected,idButton){
    
    document.getElementById(idButton).parentElement.innerHTML = "";

    console.log(personId);
    console.log(isProtected);


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
        url: 'http://20.111.50.245/askToF'
    })


}

function getUserScore(){
    $.ajax({
        contentType: 'application-json',
        dataType:'json',
        success:function(data){
            const user = data;
            let p = document.getElementById("profileContainer");
            p.textContent = "Mon score = "+user.shownScore;
        },
        error:function(){
            console.log("error")
        },
        type: 'GET',
        url:"http://20.111.50.245/getUser"
    })
}


function getUserNotifs(){
    $.ajax({
        contentType: 'application/json',
        dataType:'json',
        data: JSON.stringify(
            {
                sendOnlyUnread:false,
            }),
        success:function(data){
            console.log("Success");
            console.log(data);
            const notifs = data;
            let list = document.getElementById("myNotifList");
            let message= "";
            notifs.forEach((item) => {
                let div = document.createElement("div");
                let title = item.title;
                let pseudo = item.data.pseudo;
                let isProtected = item.data.isProtected;
                let notifId=item._id;

                if (isProtected){
                    var message = pseudo+ " veut coucher avec toi avec une protection ;)\n";
                }
                else{
                    var message = pseudo+ " veut coucher avec toi sans protection... C'est plus excitant !\n";
                }
                console.log(message);

                let bloc = document.createElement("p");
                let next_line = document.createElement("br");
                let t = document.createElement("b"); 
                t.textContent = title;
                bloc.appendChild(t);
                bloc.append(next_line);
                bloc.append(message);

                div.appendChild(bloc);

                let button1 = document.createElement("button");
                let button2 = document.createElement("button");
                button1.id= "acceptToF";
                button2.id= "refuseToF";
                let personId = item._id;
                button1.setAttribute('onclick',"respondtoF('"+notifId+"','true','"+button1.id+"')");
                button2.setAttribute('onclick',"respondtoF('"+notifId+"','false','"+button2.id+"')");
                button1.textContent="Accepter le rapport";
                button2.textContent="Refuser le rapport";
                div.appendChild(button1);
                div.appendChild(button2);
                list.appendChild(div);
            });
        },
        error:function(){
            console.log("error")
        },
        type: 'GET',
        url:"http://20.111.50.245/getNotifs"
    })
}

function respondtoF (idNotif,isAccepted, idButton) {

    document.getElementById(idButton).parentElement.innerHTML = "";


    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(
            {
                idNotif:idNotif,
                response:isAccepted
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
        url: 'http://localhost/respondToF'
    })

}