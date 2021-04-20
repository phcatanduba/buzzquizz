function criarQuizz(){
    const novaTela = document.querySelector(".novo-quizz");
    const telaAntiga = document.querySelector(".criar-quizz");
    novaTela.classList.remove("esconder");
    telaAntiga.classList.add("esconder");
}
function criarNiveis() {
    const novaTela = document.querySelector(".novo-quizz");
    novaTela.innerHTML = `
            <h1>Crie suas perguntas</h1>
            <div class="perguntas">
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
        <div class="proximaTela">Prosseguir pra criar níveis</div>
    `

}