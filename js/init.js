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

function LoginFacebook(){
    var username = "default_exla";
    var password = "123456";

    if(!Parse.User.getSessionToken()){
        Parse.User.Login(username,password, {
            success: function(user) {
                alert("Estamos logados via PARSE!Verificando se conta esta atrelada ao FACEBOOK.");
                if (!Parse.FacebookUtils.isLinked(user)) {
                    Parse.FacebookUtils.link(user, null, {
                        success: function(user) {
                            alert("Acesso por Facebook Liberado.");
                        },
                        error: function(user, error) {
                            alert("Acesso Negado para o Usuário do Facebook.");
                        }
                    });
                }
            },
            error: function(user, error) {
                alert("Você não possui acesso ao sistema.");
            }
        });
    }else{
        alert("Usuário com sessão ativa no sistema, continuando!");
    }

}

function UnLinking(user){
    Parse.FacebookUtils.unlink(Parse.User.current(), {
        success: function(user) {
            alert("The user is no longer associated with their Facebook account.");
        }
    });
}