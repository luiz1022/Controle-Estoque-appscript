const MovimentacaoService = (()=>{


function executarEntrada(
codigo,
quantidade
){


return Sistema.entrada(

codigo,

quantidade

);


}


function executarSaida(
codigo,
quantidade,
observacao
){


return Sistema.saida(

codigo,

quantidade,

observacao

);


}


return{


executarEntrada,


executarSaida


};


})();