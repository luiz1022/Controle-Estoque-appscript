const Router = (()=>{


function usuario(){


return AuthService.getUsuario();


}




function dashboard(){


return DashboardService.obterDados();


}





function listarMateriais(){


return EstoqueRepository.listar();


}





function pesquisar(texto){


return EstoqueRepository.pesquisar(
texto
);


}





function buscarMaterial(codigo){


return EstoqueRepository.buscarPorCodigo(
codigo
);


}





function entrada(
codigo,
quantidade
){


return MovimentacaoService.executarEntrada(

codigo,

quantidade

);


}





function saida(
codigo,
quantidade,
observacao
){


return MovimentacaoService.executarSaida(

codigo,

quantidade,

observacao

);


}





function historico(){


return HistoricoService.listar();


}





function atualizarDashboard(){



EstoqueRepository.limparCache();


DashboardService.limparCache();



return DashboardService.obterDados();



}




return{


usuario,


dashboard,


listarMateriais,


pesquisar,


buscarMaterial,


entrada,


saida,


historico,


atualizarDashboard



};



})();