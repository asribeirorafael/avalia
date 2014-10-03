/**
 * Created by rafae_000 on 02/10/2014.
 */

Parse.initialize("LOhTWWFFtKEhzuBpX9IOQKzXQvN0d2fOW4zfamRs", "0mlWdmo9HQdeoAkDCzDKx0RJirGxloMAdH7cEggr");

window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
        appId      : '361738637322502',
        status     : true, // check Facebook Login status
        cookie     : true, // enable cookies to allow Parse to access the session
        xfbml      : true
    });

    // Run code after the Facebook SDK is loaded.
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function LoginSimpleParse(){
    var username = "default_exla";
    var password = "123456";

    if(!Parse.User.current()){
        Parse.User.logIn(username,password, {
            success: function(user) {
                alert("Estamos logados via PARSE!");
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
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
           alert("Usuário ja está logado no Sistema via FACEBOOK.");
            Parse.FacebookUtils.logIn(null, {
                success: function(user) {
                    if (!user.existed()) {
                        alert("Usuário cadastrado e logado através do FACEBOOK!");
                    } else {
                        alert("Usuário conectado através do FACEBOOK!");
                    }
                },
                error: function(user, error) {
                    alert("O usuário cancelou o login do Facebook ou não autorizar totalmente.");
                }
            });
        } else if (response.status === 'not_authorized') {
            alert("Usuário não está Autorizado para acessar.")
        } else {
            Parse.FacebookUtils.logIn(null, {
                success: function(user) {
                    if (!user.existed()) {
                        alert("Usuário cadastrado e logado através do FACEBOOK!");
                    } else {
                        alert("Usuário conectado através do FACEBOOK!");
                    }
                },
                error: function(user, error) {
                    alert("O usuário cancelou o login do Facebook ou não autorizar totalmente.");
                }
            });
        }
    });
}

function LogoutParse(user){
    Parse.User.logOut();
    alert("Usuário desconectado do Sistema.")
}