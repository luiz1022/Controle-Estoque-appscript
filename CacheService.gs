const CacheServiceEstoque=(()=>{

const cache=CacheService.getScriptCache();

function salvar(chave,dados){

cache.put(

chave,

JSON.stringify(dados),

CONFIG.CACHE_MINUTOS*60

);

}

function obter(chave){

const dados=cache.get(chave);

if(!dados) return null;

return JSON.parse(dados);

}

function apagar(chave){

cache.remove(chave);

}

function limpar(){

cache.removeAll([

"ESTOQUE",

"DASHBOARD",

"HISTORICO"

]);

}

return{

salvar,

obter,

apagar,

limpar

};

})();