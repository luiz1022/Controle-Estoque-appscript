function criarTriggers(){



const triggers =
ScriptApp.getProjectTriggers();



triggers.forEach(
t=>{

ScriptApp.deleteTrigger(t);

}

);



ScriptApp.newTrigger(

"verificarEstoqueMinimo"

)

.timeBased()

.everyDays(1)

.atHour(8)

.create();



ScriptApp.newTrigger(

"backupEstoque"

)

.timeBased()

.everyWeeks(1)

.onWeekDay(
ScriptApp.WeekDay.MONDAY
)

.atHour(7)

.create();



}


function verificarEstoqueMinimo(){


const materiais =
EstoqueRepository.listar();



const criticos =
materiais.filter(

m=>

m.quantidadeAtual <=
m.quantidadeIdeal

);





if(
criticos.length===0
)
return;





let tabela="";



criticos.forEach(
m=>{


tabela += `

<tr>

<td>${m.codigo}</td>

<td>${m.descricao}</td>

<td>${m.quantidadeAtual}</td>

<td>${m.quantidadeIdeal}</td>

</tr>


`;


});



const html=`


<h2>
🚆 Metrô BH - Estoque Crítico
</h2>


<p>

Os materiais abaixo estão no limite de estoque:

</p>


<table border="1"
cellpadding="8">


<tr>

<th>Código</th>

<th>Material</th>

<th>Atual</th>

<th>Ideal</th>

</tr>


${tabela}


</table>


`;



MailApp.sendEmail({

to:
CONFIG.EMAIL_ADMIN,


subject:

"[Estoque] Materiais abaixo do mínimo",


htmlBody:
html


});



}


function backupEstoque(){



const origem =
SpreadsheetApp.openById(
CONFIG.PLANILHA_ID
);


const arquivo =
DriveApp.getFileById(
CONFIG.PLANILHA_ID
);

const pasta =
DriveApp.createFolder(

"BACKUP_CONTROLE_ESTOQUE"

);

arquivo.makeCopy(

"Backup Estoque - "
+
Utilities.formatDate(

new Date(),

"America/Sao_Paulo",

"dd-MM-yyyy HH-mm"

),

pasta

);



}