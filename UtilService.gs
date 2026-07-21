const UtilService = (()=>{


function agora(){


return Utilities.formatDate(

new Date(),

Session.getScriptTimeZone(),

"dd/MM/yyyy HH:mm:ss"

);


}


function gerarID(){


return Utilities.getUuid();



}


function limparTexto(
texto
){


return String(texto)

.trim()

.replace(/\s+/g," ");



}


function validarEmail(
email
){


return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

.test(email);



}



return{


agora,


gerarID,


limparTexto,


validarEmail



};



})();