const EstoqueRepository = (() => {

  const CACHE_KEY = "ESTOQUE";


  function getSheet(){

    const ss = SpreadsheetApp.openById(
      CONFIG.PLANILHA_ID
    );

    const sheet = ss.getSheetByName(
      CONFIG.ABAS.ESTOQUE
    );

    if(!sheet){
      throw new Error(
        "A aba de estoque não foi encontrada."
      );
    }

    return sheet;
  }



  function listar(){

    const cache = CacheServiceEstoque.obter(CACHE_KEY);
    if(cache) return cache;

    const sheet = getSheet();
    const ultimaLinha = sheet.getLastRow();

    if(ultimaLinha <= 1) return [];

    const dados = sheet.getRange(2, 1, ultimaLinha - 1, 6).getValues();

    const materiais = dados.map((linha, index) => {

      // Tratamento seguro de números e textos vindos da planilha
      const converterParaNumero = (valor) => {
        if (typeof valor === 'number') return valor;
        if (!valor) return 0;
        const limpo = String(valor).replace(/[^\d,-]/g, '').replace(',', '.');
        return parseFloat(limpo) || 0;
      };

      const quantidadeIdeal = converterParaNumero(linha[2]); // Coluna C
      const quantidadeAtual = converterParaNumero(linha[3]); // Coluna D
      const preco = Formatter.limparMoeda(linha[4]);         // Coluna E

      return {
        linha: index + 2,
        codigo: String(linha[0]).trim(),
        descricao: String(linha[1]).trim(),
        quantidadeIdeal,
        quantidadeAtual,
        precoUnitario: preco,
        precoTotal: quantidadeAtual * preco
      };
    });

    CacheServiceEstoque.salvar(CACHE_KEY, materiais);
    return materiais;
  }


  
  function buscarPorCodigo(codigo){

    codigo = Validator.codigo(codigo);

    return listar().find(
      item => item.codigo === codigo
    ) || null;

  }



  function pesquisar(texto){

    texto = Formatter.texto(texto);

    if(texto === "") return listar();

    return listar().filter(item => {
      return (
        Formatter.texto(item.codigo).includes(texto) ||
        Formatter.texto(item.descricao).includes(texto)
      );
    });

  }


 
  function atualizarQuantidade(codigo, novaQuantidade){

    const lock = LockService.getScriptLock();

    try {
      lock.waitLock(30000);

      const material = buscarPorCodigo(codigo);

      if(!material){
        throw new Error("Material não encontrado.");
      }

      const sheet = getSheet();

      sheet
      .getRange(
        material.linha,
        CONFIG.COLUNAS.QTD_ATUAL
      )
      .setValue(novaQuantidade);

      SpreadsheetApp.flush();
      limparCache();

      return true;

    } finally {
      lock.releaseLock();
    }

  }



  function entrada(codigo, quantidade){

    const material = buscarPorCodigo(codigo);

    if(!material)
      throw new Error("Material não localizado.");

    const saldoAnterior = material.quantidadeAtual;
    const saldoAtual = saldoAnterior + quantidade;

    atualizarQuantidade(codigo, saldoAtual);

    material.quantidadeAtual = saldoAtual;
    material.precoTotal = saldoAtual * material.precoUnitario;

    return {
      material,
      quantidade,
      saldoAnterior,
      saldoAtual
    };

  }



  function saida(codigo, quantidade){

    const material = buscarPorCodigo(codigo);

    if(!material)
      throw new Error("Material não encontrado.");

    if(quantidade > material.quantidadeAtual){
      throw new Error("Saldo insuficiente. Disponível: " + material.quantidadeAtual);
    }

    const saldoAnterior = material.quantidadeAtual;
    const saldoAtual = saldoAnterior - quantidade;

    atualizarQuantidade(codigo, saldoAtual);

    material.quantidadeAtual = saldoAtual;
    material.precoTotal = saldoAtual * material.precoUnitario;

    return {
      material,
      quantidade,
      saldoAnterior,
      saldoAtual
    };

  }



  function adicionar(material){

    const sheet = getSheet();

    const codigo = Validator.codigo(material.codigo);

    if(buscarPorCodigo(codigo)){
      throw new Error("Já existe material com este código.");
    }

    const quantidadeIdeal = Number(material.quantidadeIdeal) || 0;
    const quantidadeAtual = Number(material.quantidadeAtual) || 0;
    const preco = Formatter.limparMoeda(material.precoUnitario);

    const novaLinha = sheet.getLastRow() + 1;
    const formula = `=E${novaLinha}*D${novaLinha}`; // Coluna E x Coluna D

    sheet.appendRow([
      codigo,
      material.descricao,
      quantidadeIdeal,
      quantidadeAtual,
      preco,
      formula
    ]);

    limparCache();

    return true;

  }



  function dashboard(){

    const lista = listar();

    return {
      materiais: lista.length,
      zerados: lista.filter(m => m.quantidadeAtual === 0).length,
      baixo: lista.filter(m => m.quantidadeAtual < m.quantidadeIdeal).length,
      valor: lista.reduce((s, m) => s + m.precoTotal, 0)
    };

  }


  function limparCache(){
    CacheServiceEstoque.apagar(CACHE_KEY);
  }


  return {
    listar,
    pesquisar,
    buscarPorCodigo,
    entrada,
    saida,
    adicionar,
    dashboard,
    limparCache
  };

})();