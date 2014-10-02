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
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function LoginFacebook(){
//    FB.getLoginStatus(function(response) {
//        if (response.status === 'connected') {
//            alert("Usuário Ja esta logado no Facebook!");
//        } else if (response.status === 'not_authorized') {
//            alert("Usuário logado no Sistema porem não atenticado no sistema!")
//        } else {
    // the user isn't logged in to Facebook.
//            Parse.FacebookUtils.logIn(null, {
//                success: function(user) {
//                    console.log(user);
//                    if (!user.existed()) {
//                        alert("Usuário registrado e autenticado através do Facebook!");
//                    } else {
//                        alert("Usuário conectado através do Facebook!");
//                    }
//                },
//                error: function(user, error) {
//                    alert("O usuário cancelou o login do Facebook ou não autorizou totalmente.");
//                }
//            });
    if (!Parse.FacebookUtils.isLinked(Parse.User)) {
        Parse.FacebookUtils.link(Parse.User, null, {
            success: function (user) {
                console.log(user);
                alert("Woohoo, usuário logado no Facebook!");
            },
            error: function (user, error) {
                alert("O usuário cancelou o login do Facebook ou não autorizar totalmente.");
            }
        });
    }
//        }
//    });


}

function UnLinking(user){
    Parse.FacebookUtils.unlink(Parse.User.current(), {
        success: function(user) {
            alert("The user is no longer associated with their Facebook account.");
        }
    });
}