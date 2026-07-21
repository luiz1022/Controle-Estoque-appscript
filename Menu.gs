function onOpen(){


const ui =
SpreadsheetApp.getUi();



ui.createMenu(
"Controle Estoque"
)

.addItem(
"Limpar Cache",
"limparCacheSistema"
)

.addItem(
"Testar Email",
"testeEmailSistema"
)

.addToUi();



}



function limparCacheSistema(){


AdminService.limparTodosCaches();


SpreadsheetApp.getUi()
.alert(
"Cache limpo com sucesso."
);


}




function testeEmailSistema(){


AdminService.testarEmail();


SpreadsheetApp.getUi()
.alert(
"E-mail enviado."
);


}