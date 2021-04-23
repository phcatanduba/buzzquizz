const listaGuardada = localStorage.getItem('id');
const quizCriado = document.querySelector('.quizz-criado');
let listaJson = [];
let listaDeID = [];

listaJson.push(JSON.parse(listaGuardada));

listaJson[0].forEach((element) => {
    if (element !== null) {
        listaDeID.push(element);
    }
});

console.log(listaDeID);
console.log(listaJson);
