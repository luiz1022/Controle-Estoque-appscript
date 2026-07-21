const GestorService = (()=>{


function listar(){


const ss =
SpreadsheetApp.openById(
CONFIG.PLANILHA_ID
);



const aba =
ss.getSheetByName(
CONFIG.ABAS.GESTORES
);



if(!aba)
return [];



const dados =
aba.getRange(

2,

1,

aba.getLastRow()-1,

3

)

.getValues();




return dados.map(
linha=>({


setor:linha[0],

nome:linha[1],

email:linha[2]


})

);



}



function buscarEmail(
setor
){


const lista =
listar();



const gestor =
lista.find(

g=>

g.setor
.toUpperCase()
===

setor
.toUpperCase()

);



return gestor
?
gestor.email
:
CONFIG.EMAIL_ADMIN;



}



return{

listar,

buscarEmail


};



})();