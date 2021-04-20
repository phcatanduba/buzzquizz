const listaQuizz = document.querySelector("ul");

const promessa = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes`);
promessa.then(carregarQuizes);

function carregarQuizes(resposta) {
    arrayQuizes = resposta.data;
    arrayQuizes.forEach(quiz => {
        listaQuizz.innerHTML +=    `<li>
                                        <div class="degrade"></div>
                                        <img src=${quiz.image}>
                                        <span>${quiz.title}</span>
                                    </li>`
    }); 
};