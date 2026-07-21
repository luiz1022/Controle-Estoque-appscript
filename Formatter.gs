const Formatter={

moeda(valor){

return Number(valor).toLocaleString(

'pt-BR',

{

style:'currency',

currency:'BRL'

}

);

},

numero(valor){

return Number(valor).toLocaleString('pt-BR');

},

texto(txt){

return String(txt)

.trim()

.replace(/\s+/g," ")

.toUpperCase();

},

data(data){

return Utilities.formatDate(

new Date(data),

Session.getScriptTimeZone(),

"dd/MM/yyyy"

);

},

dataHora(data){

return Utilities.formatDate(

new Date(data),

Session.getScriptTimeZone(),

"dd/MM/yyyy HH:mm:ss"

);

},

limparMoeda(valor){

if(typeof valor==="number")
return valor;

return Number(

String(valor)

.replace("R$","")

.replace(/\./g,"")

.replace(",", ".")

.trim()

)||0;

}

};