let numeroPerguntas;
let numeroNiveis;
let valoresDigitados = [];
const conteudoInputs = {
    title: "",
    image: "",
    questions: [],
    levels: []
}

function criarQuizz() {
    const novaTela = document.querySelector(".novo-quizz");
    const telaAntiga = document.querySelector(".criar-quizz");
    const quizzes = document.querySelector(".quizzes");
    novaTela.classList.remove("esconder");
    telaAntiga.classList.add("esconder");
    quizzes.classList.add("esconder");
}
function criarPerguntas() {
    const novaTela = document.querySelector(".novo-quizz");
    const inputs = document.querySelectorAll("input");
    numeroNiveis = inputs[3].value
    numeroPerguntas = inputs[2].value
    novaTela.innerHTML = `<h1>Crie suas perguntas</h1>`
    for (let i = 0; i < numeroPerguntas; i++) {
        let pergunta = `
            
            <div class="inputs">
            <p class="input-formulario">Pergunta ${i + 1}</p>
            <input type="text" placeholder="Texto da pergunta">
            <input type="text" placeholder="Cor de fundo da pergunta">
            <p class="input-formulario">Resposta correta</p>
            <input type="text" placeholder="Resposta correta">
            <input type="text" placeholder="URL da imagem">
            <p class="input-formulario">Respostas incorretas</p>
            <input type="text" placeholder="Resposta incorreta 1">
            <input type="text" placeholder="URL da imagem 1">
            <input type="text" placeholder="Resposta incorreta 2">
            <input type="text" placeholder="URL da imagem 2">
            <input type="text" placeholder="Resposta incorreta 3">
            <input type="text" placeholder="URL da imagem 3">
            </div>`

        novaTela.innerHTML += pergunta
    }
    conteudoInputs.title = inputs[0].value;
    conteudoInputs.image = inputs[1].value;
    console.log(conteudoInputs);
    console.log(valoresDigitados);
    novaTela.innerHTML += `<div class="proxima-tela" onclick="criarNiveis()">Prosseguir pra criar níveis</div>
    `
}

function criarNiveis() {
    const novaTela = document.querySelector(".novo-quizz");
    const inputs = document.querySelectorAll("input");
    novaTela.innerHTML = ` <h1>Agora, decida os níveis!</h1>`
    for (let i = 0; i < numeroNiveis; i++) {
        let niveis = `
       
        <div class="inputs">
        <p>Nível ${i + 1} </p>
        <input type="text" placeholder="Título do nível">
        <input type="text" placeholder="% de acerto mínima">
        <input type="text" placeholder="URL da imagem do nível">
        <input type="text" placeholder="Descrição do nível">
        </div>`
        novaTela.innerHTML += niveis;
    }
    for (let j = 0; j < inputs.length; j += 10) {
        for (let i = 0; i < numeroPerguntas; i++) {
            conteudoInputs.questions.push(
                {
                    title: inputs[j].value,
                    color: inputs[j + 1].value,
                    answers: [
                        {
                            text: inputs[j + 2].value,
                            image: inputs[j + 3].value,
                            isCorrectAnswer: true
                        },
                        {
                            text: inputs[j + 4].value,
                            image: inputs[j + 5].value,
                            isCorrectAnswer: false
                        },
                        {
                            text: inputs[j + 6].value,
                            image: inputs[j + 7].value,
                            isCorrectAnswer: false
                        },
                        {
                            text: inputs[j + 8].value,
                            image: inputs[j + 9].value,
                            isCorrectAnswer: false
                        }
                    ]
                }

            )
            j += 10;
        }

    }
    novaTela.innerHTML += `<div class="proxima-tela" onclick="finalizarQuizz()">Finalizar Quizz</div>`
}
function finalizarQuizz() {
    const inputs = document.querySelectorAll("input");
    valoresDigitados = [];
    for (let j = 0; j < inputs.length; j += 4) {
        for (let i = 0; i < numeroNiveis; i++) {
            conteudoInputs.levels.push(
                {
                    title: inputs[j].value,
                    minValue: Number(inputs[j + 1].value),
                    image: inputs[j + 2].value,
                    text: inputs[j + 3].value
                }
            )
            j += 4;
        }
    }
    let enviarQuizz = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes', conteudoInputs);
    enviarQuizz.then(envioOk);
    enviarQuizz.catch(envioErro);
    const promessa = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes`);
    promessa.then(atualizarQuizes);
    function atualizarQuizes(resposta) {
        arrayQuizes = resposta.data;
    }

    console.log(conteudoInputs);
}

function envioOk(elemento) {
    const novaTela = document.querySelector(".novo-quizz");
    novaTela.innerHTML = `
    <h1> Seu quizz está pronto!</h1>
    <ul>
    <li>
    <div class="degrade" onclick="acessarQuiz()"  id=${elemento.data.id} ></div>
    <img src = ${conteudoInputs.image}>
    <span>${conteudoInputs.title}</span>
    <li>
    </ul>
    <div class="proxima-tela" onclick="finalizarQuizz()">Finalizar Quizz</div>

    `

}
function envioErro() {
    console.log("falhou!");
}