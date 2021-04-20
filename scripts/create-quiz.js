function criarQuizz(){
    const novaTela = document.querySelector(".novo-quizz");
    const telaAntiga = document.querySelector(".criar-quizz");
    novaTela.classList.remove("esconder");
    telaAntiga.classList.add("esconder");
}