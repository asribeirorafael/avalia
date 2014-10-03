/**
 * Created by rafae_000 on 02/10/2014.
 */

Parse.initialize("LOhTWWFFtKEhzuBpX9IOQKzXQvN0d2fOW4zfamRs", "0mlWdmo9HQdeoAkDCzDKx0RJirGxloMAdH7cEggr");

window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
        appId      : '361738637322502',
        status     : false, // check Facebook Login status
        cookie     : true, // enable cookies to allow Parse to access the session
        xfbml      : true
    });

    // Run code after the Facebook SDK is loaded.
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/pt_BR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function LoginSimpleParse(){
    var username = "default_exla";
    var password = "123456";

    if(!Parse.User.current()){
        Parse.User.logIn(username,password, {
            success: function(user) {
                jQuery("#btsnLogin").css("display","none");
                jQuery("#cadastro").css("display","block");
            },
            error: function(user, error) {
                alert("Você não possui acesso ao sistema.");
            }
        });
    }else{
        alert("Usuário com sessão ativa no sistema, continuando.");
    }
}

function LoginFacebookParse(){
//    FB.getLoginStatus(function(response) {
//        if (response.status === 'connected') {
//           alert("Usuário ja está logado no Sistema via FACEBOOK.");
//            Parse.FacebookUtils.logIn(null, {
//                success: function(user) {
//                    if (!user.existed()) {
//                        jQuery("#btsnLogin").css("display","none");
//                        jQuery("#cadastro").css("display","block");
//                    } else {
//                        alert("Usuário conectado através do FACEBOOK!");
//                    }
//                },
//                error: function(user, error) {
//                    alert("O usuário cancelou o login do Facebook ou não autorizar totalmente.");
//                }
//            });
//        } else if (response.status === 'not_authorized') {
//            alert("Usuário não está Autorizado para acessar.")
//        } else {
            Parse.FacebookUtils.logIn(null, {
                success: function(user) {
                    if (!user.existed()) {
                        jQuery("#btsnLogin").css("display","none");
                        jQuery("#cadastro").css("display","block");
                    } else {
                        alert("Usuário conectado através do FACEBOOK!");
                    }
                },
                error: function(user, error) {
                    alert("O usuário cancelou o login do Facebook ou não autorizar totalmente.");
                }
            });
//        }
//    });
}

function LogoutParse(user){
    Parse.User.logOut();
    jQuery("#btsnLogin").css("display","block");
    jQuery("#cadastro").css("display","none");
    alert("Usuário desconectado do Sistema.")
}

function salvarDado(){
    var Game = Parse.Object.extend("Games");
    var game = new Game();

    game.set("nome", jQuery("#valNG").val);
    game.set("valor", jQuery("#valVL").val);
    game.set("faixa_etaria", jQuery("#valFE").val);

    game.save(null, {
        success: function(gameScore) {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + gameScore.id);
        },
        error: function(gameScore, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
}