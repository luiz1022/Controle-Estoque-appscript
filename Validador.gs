const Validator={

codigo(codigo){

codigo=String(codigo).trim();

if(codigo=="")
throw new Error("Código inválido.");

return codigo;

},

quantidade(qtd){

qtd=Number(qtd);

if(isNaN(qtd))
throw new Error("Quantidade inválida.");

if(qtd<=0)
throw new Error("A quantidade deve ser maior que zero.");

return qtd;

},

material(material){

if(!material)
throw new Error("Material inexistente.");

}

};