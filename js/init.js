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

function adicionarRole(){
    // By specifying no write privileges for the ACL, we can ensure the role cannot be altered.
    var roleACL = new Parse.ACL();
    roleACL.setPublicReadAccess(true);
    roleACL.setPublicWriteAccess(true)
    var role = new Parse.Role("Administrador", roleACL);
    role.save();

    var roleACL2 = new Parse.ACL();
    roleACL2.setPublicReadAccess(true);
    var role2 = new Parse.Role("Leitor", roleACL2);
    role2.save();
}

function adicionarUserInRoles(){
    var User = Parse.Object.extend("User");
    var Role = Parse.Object.extend("_Role");

    var queryUser = new Parse.Query(User);
    var queryRole = new Parse.Query(Parse.Role);

    queryRole.equalTo("name", "Leitor");
    queryRole.find({
        success: function(roleReturn) {
            queryUser.get("A6sgIWJZyD", {
                success: function(user) {
                    var roleACL = new Parse.ACL();
                    var role = new Parse.Role("Leitor", roleACL);
                    role.getUsers().add(user);
                    role.getRoles().add(roleReturn[0]);
                    role.save();
                    alert("Salvo com Sucesso!");
                },
                error: function(object, error) {
                    alert("Retorno de Usuário com Problemas!");
                }
            });
        }
    });

//    var queryRole = new Parse.Query(Role);

//    queryRole.get("fMiCwlZw65", {
//        success: function(roleR){
//            queryUser.get("A6sgIWJZyD", {
//                success: function(user) {
//                    var roleACL = new Parse.ACL();
//                    var role = new Parse.Role("LeitorXx", roleACL);
//                    role.getUsers().add(user);
//                    role.getRoles().add(Parse.Role("Leitor", roleACL));
//                    role.save();
//                    alert("Salvo com Sucesso!");
//                },
//                error: function(object, error) {
//                    alert("Retorno de Usuário com Problemas!");
//                }
//            });
//        },
//        error: function(object, error){
//            alert("Retorno de Role com Problemas!");
//        }
//    });

//    queryRole.get("4pPDhFoo9R", {
//        success: function(roleR){
//            queryUser.get("ihIMmAHDBT", {
//                success: function(user) {
//                    var role = new Parse.Role("Administrador", roleACL);
//                    role.getUsers().add(user);
//                    role.getRoles().add(roleR);
//                    role.save();
//                },
//                error: function(object, error) {
//                    alert("Retorno de Usuário com Problemas!");
//                }
//            });
//        },
//        error: function(object, error){
//            alert("Retorno de Role com Problemas!");
//        }
//    });
}


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

    game.set("valor", parseInt(V));
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