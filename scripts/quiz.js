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
            conteudo.innerHTML += ` 
            <div class="quiz" id="pergunta${i}">
                <div class="titulo" style="background-color: ${quizEscolhido.questions[i].color}">
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
            conteudo.innerHTML += ` 
            <div class="quiz" id="pergunta${i}">
                <div class="titulo" style="background-color: ${quizEscolhido.questions[i].color}">
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
            conteudo.innerHTML += ` 
            <div class="quiz" id="pergunta${i}">
                    <div class="titulo" style="background-color: ${quizEscolhido.questions[i].color}">
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

    chamaSelecionaRespostaCorreta = function(event) {
        selecionaRespostaCorreta(event, quizEscolhido);
        const idDaPergunta = event.currentTarget.parentNode.parentNode.parentNode.getAttribute("id");
        setTimeout(function(){proximaPergunta(idDaPergunta)}, 1000);
    }

    function proximaPergunta(idDaPerguntaAtual) {
        let numeroDaPergunta = parseInt(idDaPerguntaAtual[idDaPerguntaAtual.length - 1]);
        let idDaProximaPergunta = idDaPerguntaAtual.slice(0, idDaPerguntaAtual.length - 1);
        
        numeroDaPergunta++;
        idDaProximaPergunta += numeroDaPergunta;

        document.querySelector(`#${idDaProximaPergunta}`).scrollIntoView(false);
    };

    const todasAsRespostas = document.querySelectorAll(".resposta");
    todasAsRespostas.forEach((resposta, index) => {
        resposta.addEventListener("click", chamaSelecionaRespostaCorreta);
    });
};

function selecionaRespostaCorreta(event, quizEscolhido) {
    const respostasDaPergunta = event.currentTarget.parentNode.parentNode;
    const arrayDasRespostas = respostasDaPergunta.querySelectorAll(".resposta");
    const respostaEscolhida = event.currentTarget;

    let respostaCorreta;
    arrayDasRespostas.forEach(resposta => {
        respostaCorreta = verificaAResposta(resposta, quizEscolhido);

        if(resposta === respostaEscolhida && respostaCorreta) { 
            resposta.classList.add("resposta-certa");
        } else if(resposta === respostaEscolhida && !respostaCorreta) {
            resposta.classList.add("resposta-errada");
        } else if(!respostaCorreta){
            resposta.classList.add("outras-respostas");
            resposta.classList.add("resposta-errada");
        } else if(respostaCorreta) {
            resposta.classList.add("outras-respostas");
            resposta.classList.add("resposta-certa");
        }
    });
    arrayDasRespostas.forEach(resposta => {
        resposta.removeEventListener("click", chamaSelecionaRespostaCorreta);
    });
};

function verificaAResposta(respostaEscolhida, quizEscolhido) {
    const textoDaRespostaEscolhida = respostaEscolhida.querySelector("p").innerHTML;
    let resultado;
    quizEscolhido.questions.forEach((pergunta, i) => {
        pergunta.answers.forEach((resposta, j) => {
            if(resposta.text === textoDaRespostaEscolhida) {
                resultado = resposta.isCorrectAnswer;
            }
        });
    });
    return resultado;
};

function carregarButoes() {

}