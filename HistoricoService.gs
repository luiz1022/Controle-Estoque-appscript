const HistoricoService = (() => {

  const CACHE_KEY = "HISTORICO";

  /**
   * Retorna a aba de histórico
   */
  function getSheet() {

    const ss = SpreadsheetApp.openById(CONFIG.PLANILHA_ID);

    let sheet = ss.getSheetByName(CONFIG.ABAS.HISTORICO);

    if (!sheet) {

      sheet = ss.insertSheet(CONFIG.ABAS.HISTORICO);

      sheet.appendRow([
        "DATA",
        "USUÁRIO",
        "TIPO",
        "CÓDIGO",
        "DESCRIÇÃO",
        "QUANTIDADE",
        "SALDO ANTERIOR",
        "SALDO ATUAL",
        "OBSERVAÇÃO"
      ]);

    }

    return sheet;

  }


  function registrar(
    tipo,
    material,
    quantidade,
    saldoAnterior,
    saldoAtual,
    observacao = ""
  ) {

    const sheet = getSheet();

    const usuario =
      Session.getActiveUser().getEmail() ||
      "sistema@metrobh.com.br";

    const linha = sheet.getLastRow() + 1;

    sheet.getRange(linha,1,1,9).setValues([[
      new Date(),
      usuario,
      tipo,
      material.codigo,
      material.descricao,
      quantidade,
      saldoAnterior,
      saldoAtual,
      observacao
    ]]);

    limparCache();

  }

  function listar() {

    const cache = CacheServiceEstoque.obter(CACHE_KEY);

    if(cache) return cache;

    const sheet = getSheet();

    const ultimaLinha = sheet.getLastRow();

    if(ultimaLinha<=1)
      return [];

    const dados = sheet
      .getRange(
        2,
        1,
        ultimaLinha-1,
        9
      )
      .getValues();

    const historico = dados.map(linha=>({

      data:Formatter.dataHora(linha[0]),

      usuario:linha[1],

      tipo:linha[2],

      codigo:linha[3],

      descricao:linha[4],

      quantidade:Number(linha[5]),

      saldoAnterior:Number(linha[6]),

      saldoAtual:Number(linha[7]),

      observacao:linha[8]

    }));

    CacheServiceEstoque.salvar(

      CACHE_KEY,

      historico

    );

    return historico;

  }


  function ultimos(limite=10){

    return listar()

      .reverse()

      .slice(0,limite);

  }


  function porUsuario(usuario){

    usuario=usuario.toLowerCase();

    return listar().filter(item=>

      item.usuario.toLowerCase()

      .includes(usuario)

    );

  }


  function porCodigo(codigo){

    return listar().filter(

      item=>item.codigo==codigo

    );

  }

  function limparCache(){

    CacheServiceEstoque.apagar(

      CACHE_KEY

    );

  }

 
  function limpar(){

    const sheet=getSheet();

    if(sheet.getLastRow()>1){

      sheet.getRange(

        2,

        1,

        sheet.getLastRow()-1,

        9

      ).clearContent();

    }

    limparCache();

  }

  return{

    registrar,

    listar,

    ultimos,

    porUsuario,

    porCodigo,

    limpar,

    limparCache

  };

})();