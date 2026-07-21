const Sistema = (()=>{



function listar(){


return EstoqueRepository.listar();


}



function pesquisar(texto){


return EstoqueRepository.pesquisar(
texto
);


}


function buscar(codigo){


return EstoqueRepository.buscarPorCodigo(
codigo
);


}


function entrada(
codigo,
quantidade
){


try{


quantidade =
Validator.quantidade(
quantidade
);



const retorno =
EstoqueRepository.entrada(

codigo,

quantidade

);



HistoricoService.registrar(

"ENTRADA",

retorno.material,

retorno.quantidade,

retorno.saldoAnterior,

retorno.saldoAtual

);



EmailService.enviarMovimentacao(

"ENTRADA",

retorno

);



DashboardService.limparCache();



return {


sucesso:true,


mensagem:
"Entrada realizada com sucesso.",


dados:retorno



};



}

catch(erro){


return {


sucesso:false,


mensagem:
erro.message



};


}


}


function saida(
codigo,
quantidade,
observacao=""
){


try{


quantidade =
Validator.quantidade(
quantidade
);



const retorno =
EstoqueRepository.saida(

codigo,

quantidade

);



HistoricoService.registrar(

"SAÍDA",

retorno.material,

retorno.quantidade,

retorno.saldoAnterior,

retorno.saldoAtual,

observacao

);



EmailService.enviarMovimentacao(

"SAÍDA",

retorno,

observacao

);



DashboardService.limparCache();



return {


sucesso:true,


mensagem:
"Saída realizada com sucesso.",


dados:retorno



};



}

catch(erro){


return {


sucesso:false,


mensagem:
erro.message



};


}



}



function adicionar(material){


try{


const resultado =
EstoqueRepository.adicionar(
material
);



return {


sucesso:true,


mensagem:
"Material cadastrado.",


dados:resultado



};


}

catch(erro){


return {


sucesso:false,


mensagem:
erro.message



};


}


}





return{


listar,


pesquisar,


buscar,


entrada,


saida,


adicionar



};



})();