const listaQuizz = document.querySelector('.todos-quizzes');
const conteudo = document.querySelector('main');
let acertos = 0;
let arrayQuizes = [];
let quizesDaListas = [];
let primeiraVez = true;
let quizEscolhido;
let meuQuiz;

const promessa = axios.get(
    `https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes`
);
promessa.then(carregarQuizes);

function carregarQuizes(resposta) {
    arrayQuizes = resposta.data;

    if (listaDeID.length > 0) {
        quizCriado.classList.remove('esconder');

        document.querySelector('div.esconder').classList.remove('esconder');
        document.querySelector('.criar-quizz').classList.add('esconder');

        listaDeID.forEach((id, i) => {
            const meusQuizzes = axios.get(
                'https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/' +
                    id
            );

            meusQuizzes.then(carregarSeusQuizzes);
        });
    }

    arrayQuizes.forEach((quiz, index) => {
        if (quiz.id !== listaDeID[index]) {
            listaQuizz.innerHTML += `<li id=${quiz.id}>
                                          <div class="degrade"></div>
                                          <img src=${quiz.image}>
                                          <span>${quiz.title}</span>
                                      </li>`;
        }
    });
    quizesDaListas = document.querySelectorAll('li');
    quizesDaListas.forEach((quiz) => {
        quiz.addEventListener('click', acessarQuiz);
    });
}

function acessarQuiz(event) {
    if (primeiraVez) {
        let quizId = event.currentTarget.getAttribute('id');
        quizEscolhido = arrayQuizes.find((quiz) => quiz.id == quizId);
        primeiraVez = false;
    }

    conteudo.innerHTML = `  <div class="topo-quiz" style="background: url(${quizEscolhido.image})">
                                <div class="degrade"></div>
                                <span>${quizEscolhido.title}</span>
                            </div>`;

    document.querySelector('.topo-quiz').scrollIntoView('false');

    for (let i = 0; i < quizEscolhido.questions.length; i++) {
        quizEscolhido.questions[i].answers.sort(() => 0.5 - Math.random());

        if (quizEscolhido.questions[i].answers.length === 4) {
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
            <div>    `;
        } else if (quizEscolhido.questions[i].answers.length === 3) {
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
            <div>    `;
        } else if (quizEscolhido.questions[i].answers.length === 2) {
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
            <div>    `;
        }
    }

    conteudo.innerHTML += `<div class="resultado"></div>`;

    carregarButoes('geral');

    let qtdDeRespostasDadas = 0;
    chamaSelecionaRespostaCorreta = function (event) {
        qtdDeRespostasDadas++;
        selecionaRespostaCorreta(event, quizEscolhido);
        const idDaPergunta = event.currentTarget.parentNode.parentNode.parentNode.getAttribute(
            'id'
        );
        setTimeout(function () {
            proximaPergunta(idDaPergunta);
        }, 2000);
    };

    function proximaPergunta(idDaPerguntaAtual) {
        let numeroDaPergunta = parseInt(
            idDaPerguntaAtual[idDaPerguntaAtual.length - 1]
        );
        let idDaProximaPergunta = idDaPerguntaAtual.slice(
            0,
            idDaPerguntaAtual.length - 1
        );
        if (quizEscolhido.questions.length - 1 > numeroDaPergunta) {
            numeroDaPergunta++;
            idDaProximaPergunta += numeroDaPergunta;

            document
                .querySelector(`#${idDaProximaPergunta}`)
                .scrollIntoView(false);
        } else {
            if (qtdDeRespostasDadas === quizEscolhido.questions.length) {
                carregaResultado(quizEscolhido);
            }
            document.querySelector('button').scrollIntoView();
        }
    }

    const todasAsRespostas = document.querySelectorAll('.resposta');
    todasAsRespostas.forEach((resposta) => {
        resposta.addEventListener('click', chamaSelecionaRespostaCorreta);
    });
}

function selecionaRespostaCorreta(event, quizEscolhido) {
    const respostasDaPergunta = event.currentTarget.parentNode.parentNode;
    const arrayDasRespostas = respostasDaPergunta.querySelectorAll('.resposta');
    const respostaEscolhida = event.currentTarget;
    let respostaCorreta;

    arrayDasRespostas.forEach((resposta) => {
        respostaCorreta = verificaAResposta(resposta, quizEscolhido);
        if (resposta === respostaEscolhida && respostaCorreta) {
            acertos++;
            resposta.classList.add('resposta-certa');
        } else if (resposta === respostaEscolhida && !respostaCorreta) {
            resposta.classList.add('resposta-errada');
        } else if (!respostaCorreta) {
            resposta.classList.add('outras-respostas');
            resposta.classList.add('resposta-errada');
        } else if (respostaCorreta) {
            resposta.classList.add('outras-respostas');
            resposta.classList.add('resposta-certa');
        }
    });
    arrayDasRespostas.forEach((resposta) => {
        resposta.removeEventListener('click', chamaSelecionaRespostaCorreta);
    });
}

function verificaAResposta(respostaEscolhida, quizEscolhido) {
    const textoDaRespostaEscolhida = respostaEscolhida.querySelector('p')
        .innerHTML;
    const imagemDaRespostaEscolhida = respostaEscolhida
        .querySelector('img')
        .getAttribute('src');
    let resultado;

    quizEscolhido.questions.forEach((pergunta, i) => {
        pergunta.answers.forEach((resposta, j) => {
            if (
                resposta.text === textoDaRespostaEscolhida &&
                resposta.image === imagemDaRespostaEscolhida
            ) {
                resultado = resposta.isCorrectAnswer;
                return;
            }
        });
    });
    return resultado;
}

function carregarButoes(id) {
    conteudo.innerHTML += `<div class="butoes">
                                <button class="reiniciar">Reiniciar Quizz</button>
                                <button class="voltar">Voltar pra home</button>
                          </div> `;

    const butaoVoltar = document.querySelector('.voltar');
    butaoVoltar.addEventListener('click', recarregarPagina);

    const butaoReiniciar = document.querySelector('.reiniciar');
    butaoReiniciar.addEventListener('click', reiniciarQuiz(id));
}

function recarregarPagina() {
    window.location.reload();
}

function carregaResultado(quizEscolhido) {
    const porcentagem = Math.floor(
        (acertos / quizEscolhido.questions.length) * 100
    );
    const resultadoTela = document.querySelector('.resultado');
    let index = 0;
    quizEscolhido.levels.forEach((level, i) => {
        if (level.minValue <= porcentagem) {
            index = i;
        }
    });

    resultadoTela.innerHTML = ` <div class="titulo" style="background-color: red">${porcentagem}% de acerto: ${quizEscolhido.levels[index].title}</div>
                                <div class="conteudo-resultado">
                                    <img src="${quizEscolhido.levels[index].image}">
                                    <div class="texto-resultado">${quizEscolhido.levels[index].text}</div>
                                </div>
                                `;
}

function carregarSeusQuizzes(resposta) {
    quizCriado.innerHTML += `<li id=${resposta.data.id}>
                                <div class="degrade"></div>
                                <img src=${resposta.data.image}>
                                <span>${resposta.data.title}</span>
                            </li>`;

    quizesDaListas = document.querySelectorAll('li');
    quizesDaListas.forEach((quiz) => {
        quiz.addEventListener('click', function () {
            meuQuiz = resposta.data;
            acessarSeusQuizzes(resposta.data);
        });
    });
}

function reiniciarQuiz(id) {
    conteudo.innerHTML = '';
    acertos = 0;
    if (id === 'geral') {
        acessarQuiz();
    } else {
        acessarSeusQuizzes(meuQuiz);
    }
}

function acessarSeusQuizzes(quizEscolhido) {
    conteudo.innerHTML = `  <div class="topo-quiz" style="background: url(${quizEscolhido.image})">
                              <div class="degrade"></div>
                              <span>${quizEscolhido.title}</span>
                          </div>`;

    document.querySelector('.topo-quiz').scrollIntoView('false');

    for (let i = 0; i < quizEscolhido.questions.length; i++) {
        quizEscolhido.questions[i].answers.sort(() => 0.5 - Math.random());

        if (quizEscolhido.questions[i].answers.length === 4) {
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
          <div>    `;
        } else if (quizEscolhido.questions[i].answers.length === 3) {
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
          <div>    `;
        } else if (quizEscolhido.questions[i].answers.length === 2) {
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
          <div>    `;
        }
    }

    conteudo.innerHTML += `<div class="resultado"></div>`;

    carregarButoes('meus');

    let qtdDeRespostasDadas = 0;
    chamaSelecionaRespostaCorreta = function (event) {
        qtdDeRespostasDadas++;
        selecionaRespostaCorreta(event, quizEscolhido);
        const idDaPergunta = event.currentTarget.parentNode.parentNode.parentNode.getAttribute(
            'id'
        );
        setTimeout(function () {
            proximaPergunta(idDaPergunta);
        }, 2000);
    };

    function proximaPergunta(idDaPerguntaAtual) {
        let numeroDaPergunta = parseInt(
            idDaPerguntaAtual[idDaPerguntaAtual.length - 1]
        );
        let idDaProximaPergunta = idDaPerguntaAtual.slice(
            0,
            idDaPerguntaAtual.length - 1
        );
        if (quizEscolhido.questions.length - 1 > numeroDaPergunta) {
            numeroDaPergunta++;
            idDaProximaPergunta += numeroDaPergunta;

            document
                .querySelector(`#${idDaProximaPergunta}`)
                .scrollIntoView(false);
        } else {
            if (qtdDeRespostasDadas === quizEscolhido.questions.length) {
                carregaResultado(quizEscolhido);
            }
            document.querySelector('button').scrollIntoView();
        }
    }

    const todasAsRespostas = document.querySelectorAll('.resposta');
    todasAsRespostas.forEach((resposta) => {
        resposta.addEventListener('click', chamaSelecionaRespostaCorreta);
    });
}
