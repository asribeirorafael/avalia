/**
 * Created by rafae_000 on 02/10/2014.
 */

Parse.initialize("LOhTWWFFtKEhzuBpX9IOQKzXQvN0d2fOW4zfamRs", "0mlWdmo9HQdeoAkDCzDKx0RJirGxloMAdH7cEggr");

window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({
        appId      : '361738637322502',
//        status     : false, // check Facebook Login status
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
        jQuery("#btsnLogin").css("display","none");
        jQuery("#cadastro").css("display","block");
    }
}

function LoginFacebookParse(){
    if(!Parse.User.current()){
        Parse.FacebookUtils.logIn(null, {
            success: function(user) {
                if (!user.existed()) {
                    alert("Inserindo o usuario no sistema aguarde a liberação.")
                    jQuery("#btsnLogin").css("display","none");
                    jQuery("#cadastro").css("display","block");
                } else {
                    alert("Usuário conectado através do FACEBOOK!");
                    jQuery("#btsnLogin").css("display","none");
                    jQuery("#cadastro").css("display","block");
                }
            },
            error: function(user, error) {
                alert("O usuário cancelou o login do Facebook ou não autorizar totalmente.");
            }
        });
    }else{
        alert("Usuário com sessão ativa no sistema, continuando.");
        jQuery("#btsnLogin").css("display","none");
        jQuery("#cadastro").css("display","block");
    }
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

    var N = jQuery("#valNG").val();
    var V = jQuery("#valVL").val();
    var FE = jQuery("#valFE").val();

    game.set("nome", N);
    game.set("valor", V);
    game.set("faixa_etaria", FE);

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