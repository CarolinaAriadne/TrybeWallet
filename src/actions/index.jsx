export const LOGIN = 'LOGIN';
export const DESPESAS = 'DESPESAS';
export const MOEDAS = 'MOEDAS';
export const DELETA = 'DELETA';

export const sendEmailuser = (email) => ({
  type: LOGIN,
  payload: email,
});

export const sendExpenses = (retornoApi, estadosLocais) => ({
  type: DESPESAS,
  retornoApi,
  estadosLocais,
});

export const sendMoedas = (todasMoedas) => ({
  type: MOEDAS,
  todasMoedas,
});

export const deletExpense = (excluiDespesa) => ({
  type: DELETA,
  excluiDespesa,
});

export const fetchApiTotal = (estadosLocais) => async (dispatch) => { // thunk
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const retornoApiTotal = await request.json();
    dispatch(sendExpenses(retornoApiTotal, estadosLocais));
  } catch (error) {
    console.error(error.message);
  }
};

export const fetchApiMoedas = () => async (dispatch) => {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const retornoApiMoedas = await request.json();
    const retornoMoedas = Object.keys(retornoApiMoedas);
    const todasMoedas = retornoMoedas.filter((moeda) => moeda !== 'USDT');
    dispatch(sendMoedas(todasMoedas));
  } catch (error) {
    console.error(error.message);
  }
};

// function para definir action, que recebe como parâmetro o email que será digitado pelo usuário no input. Defino o type, e a carta (payload), neste caso, é o email, que é  de fato a informação descritiva da action.

// REq 5 - parte 2 -  aqui temos nossa action sendMoedas (renomeada), que possui um objeto que recebe um parâmetro, e o tipo de action, que no cas é uma string. Quando a action fetchApi foi disparada, o thunk identifica que se trata de uma função que retorna uma função, logo, pára o fluxo do envio da action, e neste momento, de forma assíncrona, a requisição da Api é realizada.O retorno da API é um obj json, sendo que para que apareça no select as opções de moedas, utilizo Object.keys, para definir que do retorno da Api, só quero "pegar" as moedas. Após, realizado um filter, para que eu obtenha somente as moedas que quero (filtrar moedas, menos a USDT). Terminado esse processo assíncrono, o fluxo da action volta a ocorrer, logo, há o dispatch da action sendMoedas (linha 37) sendo que o retorno da minha API já filtrada, está como parâmetro dela. Este retorno da API com as moedas, é "jogado" para o todasMoedas que está na linha 18 após o type.Após isso, a action é enviada ao reducer para que ele faça o tratamento deste dado.

// REQ 4 - parte 2 - No momento que a action é disparada (no clique do button enviar despesa), meus estados locais já atualizados, é recebido na action, isto é, as despesas cadastradas, por isso definimos a action sendExpenses que recebe as informações das despesas cadastradas (estados locais), além de um parâmetro pra retorno da API (pois iremos precisar das chaves moedas novamente pra fazer cálculo de soma de despesa). A action bate no thunk e por isso seu fluxo é interrompido, para que a requisição da API seja realizada, após o retorno da API, o fluxo do despacho da action volta, sendo que este disparo da action é realizado tendo como parâmetro minhas despesas cadastradas e o retorno da Api. Em caso de erro nda requisição, uma mensagem de erro é lançado na tela. Meu retornoApi na function action recebe de fato o retorno da Api, e o estadosLocais, recebe meus estados locais (despesas cadastradas).
