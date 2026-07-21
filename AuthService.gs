const AuthService = (()=>{


function getUsuario(){


const email =
Session.getActiveUser()
.getEmail();



if(!email){


throw new Error(

"Não foi possível identificar sua conta Google.\n\nFaça login com seu e-mail corporativo."

);


}




if(
!email
.toLowerCase()
.endsWith(
CONFIG.DOMINIO.toLowerCase()
)

){


throw new Error(

"Acesso permitido somente para usuários corporativos Metrô BH."

);


}




return{


email:email,


nome:
formatarNome(email),


administrador:
verificarAdministrador(email)



};



}





function verificarAdministrador(email){



const administradores=[


"luiz.ferreira@metrobh.com.br"



];



return administradores

.map(e=>
e.toLowerCase()
)

.includes(

email.toLowerCase()

);



}





function formatarNome(email){



return email

.split("@")[0]

.replace(/\./g," ")

.replace(
/\b\w/g,

letra=>

letra.toUpperCase()

);



}





return{


getUsuario



};



})();