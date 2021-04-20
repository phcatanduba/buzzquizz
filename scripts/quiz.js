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
                            </div>`;

    for(let i = 0; i < quizEscolhido.questions.length; i ++) {
        
        quizEscolhido.questions[i].answers.sort( () => .5 - Math.random() );

        if(quizEscolhido.questions[i].answers.length === 4) {
            conteudo.innerHTML += ` <div class="quiz">
            <div class="titulo pergunta1" style="background-color: ${quizEscolhido.questions[i].color}">
                <span>${quizEscolhido.questions[i].title}</span>
            </div>
            <div class="respostas">
                <div>
                    <span class="resposta">
                        <img src=${quizEscolhido.questions[i].answers[0].image}>
                        <p>${quizEscolhido.questions[i].answers[0].text}</p>
                    </span>
                    <span class="resposta">
                        <img src=${quizEscolhido.questions[i].answers[1].image}>
                        <p>${quizEscolhido.questions[i].answers[1].text}</p>
                    </span>
                </div>
                <div>
                    <span class="resposta">
                        <img src=${quizEscolhido.questions[i].answers[2].image}>
                        <p>${quizEscolhido.questions[i].answers[2].text}</p>
                    </span>
                    <span class="resposta">
                        <img src=${quizEscolhido.questions[i].answers[3].image}>
                        <p>${quizEscolhido.questions[i].answers[3].text}</p>
                    </span>
                </div>
            <div>    `
        } else if(quizEscolhido.questions[i].answers.length === 3) {
            conteudo.innerHTML += ` <div class="quiz">
            <div class="titulo pergunta1" style="background-color: ${quizEscolhido.questions[i].color}">
                <span>${quizEscolhido.questions[i].title}</span>
            </div>
            <div class="respostas">
                <div>
                    <span class="resposta">
                        <img src=${quizEscolhido.questions[i].answers[0].image}>
                        <p>${quizEscolhido.questions[i].answers[0].text}</p>
                    </span>
                    <span class="resposta">
                        <img src=${quizEscolhido.questions[i].answers[1].image}>
                        <p>${quizEscolhido.questions[i].answers[1].text}</p>
                    </span>
                </div>
                <div>
                    <span class="resposta">
                        <img src=${quizEscolhido.questions[i].answers[2].image}>
                        <p>${quizEscolhido.questions[i].answers[2].text}</p>
                    </span>
                </div>
            <div>    `
        } else if(quizEscolhido.questions[i].answers.length === 2) {
            conteudo.innerHTML += ` <div class="quiz">
            <div class="titulo pergunta1" style="background-color: ${quizEscolhido.questions[i].color}">
                <span>${quizEscolhido.questions[i].title}</span>
            </div>
            <div class="respostas">
                <div>
                    <span class="resposta">
                        <img src=${quizEscolhido.questions[i].answers[0].image}>
                        <p>${quizEscolhido.questions[i].answers[0].text}</p>
                    </span>
                    <span class="resposta">
                        <img src=${quizEscolhido.questions[i].answers[1].image}>
                        <p>${quizEscolhido.questions[i].answers[1].text}</p>
                    </span>
                </div>
            <div>    `
        }
    }
};