function onRegisterClick() {
    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(
            {
                user: {
                    pseudo: 'WASSIIIIAAAIIM',
                    password: 'WASSIM',
                    description: 'WASSIM',
                    gender: 'WASSIM'
                }
            }
        ),
        dataType: 'json',
        success: function(data){
            console.log(data)
        },
        error: function(){
            console.log("error")
        },
        type: 'POST',
        url: 'http://localhost/register'
    })
  }
