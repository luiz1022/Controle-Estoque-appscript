function doGet(){


return HtmlService
.createTemplateFromFile("index")
.evaluate()

.setTitle(
CONFIG.SISTEMA
)

.setFaviconUrl(
"https://ssl.gstatic.com/docs/forms/forms_icon_2020q4.ico"
)

.addMetaTag(
"viewport",
"width=device-width, initial-scale=1"
)

.setXFrameOptionsMode(
HtmlService.XFrameOptionsMode.ALLOWALL
);



}


function include(nome){


return HtmlService

.createHtmlOutputFromFile(nome)

.getContent();



}



function apiUsuario(){

return Router.usuario();

}


function apiDashboard(){

return Router.dashboard();

}


function apiAtualizarDashboard(){

return Router.atualizarDashboard();

}



function apiListarMateriais(){

return Router.listarMateriais();

}



function apiPesquisar(texto){

return Router.pesquisar(texto);

}



function apiBuscarMaterial(codigo){

return Router.buscarMaterial(codigo);

}




function apiAdicionarMaterial(material){

return Sistema.adicionar(material);

}


function apiEntrada(
codigo,
quantidade
){

return Router.entrada(

codigo,

quantidade

);

}




function apiSaida(
codigo,
quantidade,
observacao
){

return Router.saida(

codigo,

quantidade,

observacao

);

}



function apiHistorico(){

return Router.historico();

}