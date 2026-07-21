const ErrorService = (()=>{


function tratar(
erro,
origem=""
){


const usuario =
Session.getActiveUser()
.getEmail()
||
"SISTEMA";



const mensagem =

`
ERRO NO SISTEMA

Origem:
${origem}

Usuário:
${usuario}

Data:
${new Date()}

Mensagem:

${erro.message}

Stack:

${erro.stack || ""}

`;



Logger.log(
mensagem
);



try{


MailApp.sendEmail({

to:
CONFIG.EMAIL_ADMIN,


subject:
"[Erro] Controle de Estoque",


body:
mensagem


});



}
catch(e){



Logger.log(
e
);



}



return {


sucesso:false,


mensagem:
"Erro interno no sistema. Contate o administrador."

};


}



return{


tratar

};

})();