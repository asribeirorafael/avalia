/**
 * Created by rafae_000 on 02/10/2014.
 */

Parse.initialize("LOhTWWFFtKEhzuBpX9IOQKzXQvN0d2fOW4zfamRs", "0mlWdmo9HQdeoAkDCzDKx0RJirGxloMAdH7cEggr");

localStorage.setItem("Game", null);
localStorage.setItem("ListaGames", null);

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
    var gameFront = new game;

    gameFront.nome = jQuery("#valNG").val();
    gameFront.valor = jQuery("#valVL").val();
    gameFront.faixaEtaria = jQuery("#valFE").val();

    var gameSend = setObjectBase(new Game(), gameFront);

    gameSend.save(null, {
        success: function(gameScore) {
            console.log("Create executado com sucesso.");
            jQuery("#valNG").val("");
            jQuery("#valVL").val("");
            jQuery("#valFE").val("");
            readGames();
        },
        error: function(gameScore, error) {
            console.log("Create falhou. Erro: "+ error.message);
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
                $("#tableGames").append("<tr style='border: 1px solid #000;'><td>"+arrayGames[j].nome+"</td><td>"+arrayGames[j].valor+"</td><td>"+arrayGames[j].faixaEtaria+"</td><td><input type='button' value='Selecionar' onclick='loadUpdateGames("+j+")'/></td></tr>");
            }

            localStorage.setItem("ListaGames", JSON.stringify(arrayGames));

        },
        error: function(object, error) {
            console.log("Ocorreu um erro: "+error);
        }
    });
}

function updateGames(){
    var Game = Parse.Object.extend("Games");
    var gameBack = new Game();
    var gameFront = new game;
    var gameArmazenado = JSON.parse(localStorage.getItem("Game"));

    if(gameArmazenado){
        gameFront.nome = jQuery("#valNG").val();
        gameFront.valor = jQuery("#valVL").val();
        gameFront.faixaEtaria = jQuery("#valFE").val();

        gameBack.id = gameArmazenado.id;

        var gameSend = setObjectBase(gameBack, gameFront);

        gameSend.save(null, {
            success: function(gameScore) {
                console.log("Update realizado com sucesso");
                jQuery("#valNG").val("");
                jQuery("#valVL").val("");
                jQuery("#valFE").val("");
                localStorage.setItem("Game", null);
                readGames();
            },
            error: function(gameScore, error) {
                console.log("Update falhou. Erro: " + error.message);
            }
        });
    }else{
        alert("Selecione um Game para fazer Update.")
    }

}

function deleteGames(){
    var Game = Parse.Object.extend("Games");
    var gameBack = new Game();
    var gameFront = new game;
    var gameArmazenado = JSON.parse(localStorage.getItem("Game"));

    if(gameArmazenado){
        gameBack.id = gameArmazenado.id;
        gameBack.destroy({
            success: function(gameScore) {
                console.log("Delete realizado com sucesso");
                jQuery("#valNG").val("");
                jQuery("#valVL").val("");
                jQuery("#valFE").val("");
                localStorage.setItem("Game", null);
                readGames();
            },
            error: function(gameScore, error) {
                console.log("Delete falhou. Erro: " + error.message);
            }
        });
    }else{
        alert("Selecione um Game para fazer Delete.")
    }

}

//EVENTOS

function loadUpdateGames(e){
    var arrayGames = JSON.parse(localStorage.getItem("ListaGames"));

    jQuery("#valNG").val(arrayGames[e].nome);
    jQuery("#valVL").val(arrayGames[e].valor);
    jQuery("#valFE").val(arrayGames[e].faixaEtaria);

    localStorage.setItem("Game", JSON.stringify(arrayGames[e]));
}

//CLOUD CODE

function getFirstCloudCode(){
    Parse.Cloud.run('averageStars', { movie: 'The Matrix' }, {
        success: function(ratings) {
            // ratings should be 4.5
            console.log("Avaliação: "+ratings);
        },
        error: function(error) {
            console.log("Erro: "+error);
        }
    });
}