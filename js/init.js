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


//PROCESSO DE CRIAR ROLES E ADICIONAR USUÁRIOS EM ROLES
function adicionarRole(){
    // By specifying no write privileges for the ACL, we can ensure the role cannot be altered.
    var roleACL = new Parse.ACL();
    roleACL.setPublicReadAccess(true);
    roleACL.setPublicWriteAccess(true);
    var role = new Parse.Role("Administrador", roleACL);
    role.save();

    var roleACL2 = new Parse.ACL();
    roleACL2.setPublicReadAccess(true);
    roleACL2.setPublicWriteAccess(true);
    var role2 = new Parse.Role("Leitor", roleACL2);
    role2.save();
}

function adicionarUserInRoles(){

    Parse.initialize("LOhTWWFFtKEhzuBpX9IOQKzXQvN0d2fOW4zfamRs", "0mlWdmo9HQdeoAkDCzDKx0RJirGxloMAdH7cEggr");

    var User = Parse.Object.extend("User");
    var Role = Parse.Object.extend("_Role");

    var queryUser = new Parse.Query(User);
    var queryRole = new Parse.Query(Role);

    queryRole.get("Ji1y7vQB9E", {
        success: function(roleR){
            queryUser.get("1QQqZuRor8", {
                success: function(user1) {

                    var user2 = new Parse.User();
                    user2.id = user1.id;

                    roleR.getUsers().add(user2);

                    roleR.save();

                    alert("Salvo com Sucesso!");
                },
                error: function(object, error) {
                    alert("Retorno de Usuário com Problemas!");
                }
            });
        },
        error: function(object, error){
            alert("Retorno de Role com Problemas!");
        }
    });
}


//LOGIN VIA CADASTRO, FACEBOOK E LOGOUT
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
                console.log("Você não possui acesso ao sistema.");
            }
        });
    }else{
        console.log("Usuário com sessão ativa no sistema, continuando.");
        jQuery("#btsnLogin").css("display","none");
        jQuery("#cadastro").css("display","block");
    }
}

function LoginFacebookParse(){
    if(!Parse.User.current()){
        Parse.FacebookUtils.logIn(null, {
            success: function(user) {
                if (!user.existed()) {
                    console.log("Inserindo o usuario no sistema aguarde a liberação.")
                    jQuery("#btsnLogin").css("display","none");
                    jQuery("#cadastro").css("display","block");
                } else {
                    console.log("Usuário conectado através do FACEBOOK!");
                    jQuery("#btsnLogin").css("display","none");
                    jQuery("#cadastro").css("display","block");
                }
            },
            error: function(user, error) {
                console.log("O usuário cancelou o login do Facebook ou não autorizar totalmente.");
            }
        });
    }else{
        console.log("Usuário com sessão ativa no sistema, continuando.");
        jQuery("#btsnLogin").css("display","none");
        jQuery("#cadastro").css("display","block");
    }
}

function LogoutParse(user){
    Parse.User.logOut();
    jQuery("#btsnLogin").css("display","block");
    jQuery("#cadastro").css("display","none");
    console.log("Usuário desconectado do Sistema.")
}


//CRUD - CREATE, READ, UPDATE, DELETE
function createGames(){
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
            console.log('New object created with objectId: ' + gameScore.id);
            readGames();
        },
        error: function(gameScore, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            console.log('Failed to create new object, with error code: ' + error.message);
        }
    });
}

function readGames(){
    var query = new Parse.Query("Games");

    query.find({
        success: function(listaGames) {
            var arrayGames = new Array();
            for(var i = 0, lenG = listaGames.length; i < lenG; i++){
                var game = setObjectFront(listaGames[i]);
                arrayGames.push(game);
            }

            $("#collectionGames").html('<table id="tableGames" style="border: 1px solid #000;"><tr><td style="border: 1px solid #000;"><strong>Nome</strong></td><td style="border: 1px solid #000;"><strong>Valor</strong></td><td style="border: 1px solid #000;"><strong>Faixa Etária</strong></td><td>&nbsp</td></tr></table>');

            for(var j = 0, lenAG = arrayGames.length; j < lenAG; j++){
                $("#tableGames").append("<tr style='border: 1px solid #000;'><td>"+arrayGames[j].nome+"</td><td>"+arrayGames[j].valor+"</td><td>"+arrayGames[j].faixaEtaria+"</td><td><input type='button' value='Editar' onclick='console.log("+j+")'/></td></tr>");
            }
            console.log(arrayGames);

        },
        error: function(object, error) {
            console.log("Ocorreu um erro: "+error);
        }
    });
}