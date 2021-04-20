function criarQuizz(){
    const novaTela = document.querySelector(".novo-quizz");
    const telaAntiga = document.querySelector(".criar-quizz");
    const quizzes = document.querySelector(".quizzes");
    novaTela.classList.remove("esconder");
    telaAntiga.classList.add("esconder");
    quizzes.classList.add("esconder");
}
function criarPerguntas() {
    const novaTela = document.querySelector(".novo-quizz");
    novaTela.innerHTML = `
            <h1>Crie suas perguntas</h1>
            <div class="inputs">
            <p>Pergunta 1</p>
            <input type="text" placeholder="Texto da pergunta">
            <input type="text" placeholder="Cor de fundo da pergunta">
            <p>Resposta correta</p>
            <input type="text" placeholder="Resposta correta">
            <input type="text" placeholder="URL da imagem">
            <p>Respostas incorretas</p>
            <input type="text" placeholder="Resposta incorreta 1">
            <input type="text" placeholder="URL da imagem 1">
            <input type="text" placeholder="Resposta incorreta 2">
            <input type="text" placeholder="URL da imagem 2">
            <input type="text" placeholder="Resposta incorreta 3">
            <input type="text" placeholder="URL da imagem 3">
            </div>
        <div class="proxima-tela" onclick="criarNiveis()">Prosseguir pra criar níveis</div>
    `

}
function criarNiveis(){
    const novaTela = document.querySelector(".novo-quizz");
    novaTela.innerHTML = `
        <h1>Agora, decida os níveis!</h1>
        <div class="inputs">
        <p>Nível 1</p>
        <input type="text" placeholder="Título do nível">
        <input type="text" placeholder="% de acerto mínima">
        <input type="text" placeholder="URL da imagem do nível">
        <input type="text" placeholder="Descrição do nível">
        </div>
    <div class="proxima-tela" onclick="finalizarQuizz()">Finalizar Quizz</div>
    `
}
function finalizarQuizz(){
    const novaTela = document.querySelector(".novo-quizz");
    

}