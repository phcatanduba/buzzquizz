const listaQuizz = document.querySelector("ul");
const conteudo = document.querySelector("main");
let arrayQuizes = [];
let quizesDaListas = [];

const promessa = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes`);
promessa.then(carregarQuizes);

function carregarQuizes(resposta) {
    arrayQuizes = resposta.data;
    arrayQuizes.forEach(quiz => {
        listaQuizz.innerHTML +=    `<li id=${quiz.id}>
                                        <div class="degrade"></div>
                                        <img src=${quiz.image}>
                                        <span>${quiz.title}</span>
                                    </li>`
    });
    quizesDaListas = document.querySelectorAll("li");
    quizesDaListas.forEach(quiz => {
        quiz.addEventListener("click", acessarQuiz);  
    });
};

function acessarQuiz(event) {
    let quizId = event.currentTarget.getAttribute("id");
    let quizEscolhido = arrayQuizes.find(quiz => quiz.id == quizId);
    conteudo.innerHTML = `  <div class="topo-quiz" style="background: url(${quizEscolhido.image})">
                                <div class="degrade"></div>
                                <span>${quizEscolhido.title}</span>
                            </div>
                            <div class="titulo-pergunta1">
                                ${quizEscolhido.questions[0].title}
                            </div>
                            `;
};