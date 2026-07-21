const DashboardService = (()=>{

  const CACHE_KEY = "DASHBOARD_CACHE";


  function atualizar(){
    CacheServiceEstoque.apagar(CACHE_KEY);
    return obterDados();
  }


  function limparCache(){
    CacheServiceEstoque.apagar(CACHE_KEY);
  }


  function obterDados(){

    const cache = CacheServiceEstoque.obter(CACHE_KEY);

    if(cache) return cache;

    const materiais = EstoqueRepository.listar();

    const totalMateriais = materiais.length;

    const zerados = materiais.filter(m => m.quantidadeAtual === 0);

    const abaixoIdeal = materiais.filter(m => m.quantidadeAtual < m.quantidadeIdeal);

    const valorTotal = materiais.reduce((s, m) => s + m.precoTotal, 0);

    const materiaisCriticos = abaixoIdeal
      .sort((a, b) => a.quantidadeAtual - b.quantidadeAtual)
      .slice(0, 10)
      .map(item => ({
        codigo: item.codigo,
        descricao: item.descricao,
        atual: item.quantidadeAtual,
        ideal: item.quantidadeIdeal,
        falta: item.quantidadeIdeal - item.quantidadeAtual
      }));


    const dashboard = {
      cards: {
        materiais: totalMateriais,
        zerados: zerados.length,
        baixo: abaixoIdeal.length,
        valorTotal
      },
      materiaisCriticos,
      atividadeRecente: HistoricoService.ultimos(10)
    };

    CacheServiceEstoque.salvar(CACHE_KEY, dashboard);

    return dashboard;

  }


  return {
    obterDados,
    atualizar,
    limparCache
  };

})();