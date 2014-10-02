/**
 * Created by rafae_000 on 02/10/2014.
 */

Parse.initialize("LOhTWWFFtKEhzuBpX9IOQKzXQvN0d2fOW4zfamRs", "0mlWdmo9HQdeoAkDCzDKx0RJirGxloMAdH7cEggr");

window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
        appId      : '361738637322502',
        status     : false, // check Facebook Login status
        cookie     : true, // enable cookies to allow Parse to access the session
        xfbml      : true,
        version    : 'v2.1'
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

function LoginFacebook(){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            alert("Usuário Ja esta logado no Facebook!");
            Linking(user);
        } else if (response.status === 'not_authorized') {
            alert("Usuário logado no Sistema porem não atenticado no sistema!")
        } else {
            // the user isn't logged in to Facebook.
            Parse.FacebookUtils.logIn(null, {
                success: function(user) {
                    console.log(user);
                    if (!user.existed()) {
                        alert("Usuário registrado e autenticado através do Facebook!");
                        Linking(user);
                    } else {
                        alert("Usuário conectado através do Facebook!");
                    }
                },
                error: function(user, error) {
                    alert("O usuário cancelou o login do Facebook ou não autorizou totalmente.");
                }
            });
        }
    });


}

function Linking(user){
    if (!Parse.FacebookUtils.isLinked(user)) {
        Parse.FacebookUtils.link(user, null, {
            success: function(user) {
                alert("Woohoo, user logged in with Facebook!");
            },
            error: function(user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    }
}

function UnLinking(user){
    Parse.FacebookUtils.unlink(user, {
        success: function(user) {
            alert("The user is no longer associated with their Facebook account.");
        }
    });
}