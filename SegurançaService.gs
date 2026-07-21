const SegurancaService = (()=>{


function validarMovimento(
codigo,
quantidade
){



if(!codigo)

throw new Error(
"Código do material obrigatório."
);



if(
quantidade <=0
)

throw new Error(
"Quantidade inválida."
);



const material =
EstoqueRepository.buscarPorCodigo(
codigo
);



if(!material)

throw new Error(
"Material não encontrado."
);



return true;



}



return{


validarMovimento



};



})();