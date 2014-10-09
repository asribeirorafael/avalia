/**
 * Created by rafae_000 on 09/10/2014.
 */

var game = function game(){
    this.id = "";
    this.nome = "";
    this.valor = null;
    this.faixaEtaria = "";
}

function setObjectFront(objetoBase){
    var objetoFront = new game;

    objetoFront.id = objetoBase.id;
    objetoFront.nome = objetoBase.get("nome");
    objetoFront.valor = parseFloat(objetoBase.get("valor"));
    objetoFront.faixaEtaria = objetoBase.get("faixa_etaria");

    return objetoFront;
}

function setObjectBase(objetoBase, objetoFront){

    objetoBase.set("nome", objetoFront.nome);
    objetoBase.set("valor", parseFloat(objetoFront.valor));
    objetoBase.set("faixa_etaria", objetoFront.faixaEtaria);

    return objetoBase;
}

