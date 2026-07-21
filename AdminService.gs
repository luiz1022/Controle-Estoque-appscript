const AdminService = (()=>{


function limparTodosCaches(){


CacheServiceEstoque.limpar();



return true;


}


function testarEmail(){


MailApp.sendEmail({

to:
CONFIG.EMAIL_ADMIN,


subject:
"Teste Controle Estoque",


body:
"Sistema funcionando."

});


return true;


}


return{


limparTodosCaches,


testarEmail



};



})();