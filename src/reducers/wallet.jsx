// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { DELETA, DESPESAS, MOEDAS } from '../actions';

const INITIAL_STATE = {

  currencies: [],
  expenses: [],

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DESPESAS:
    return {
      ...state, // pra não apagar resto das coisas do estado global
      expenses: [...state.expenses,
        { ...action.estadosLocais, exchangeRates: action.retornoApi }], // ... state, não apagar coisas anteriores que estão no próprio currencies
    };
  case MOEDAS:
    return {
      ...state,
      currencies: action.todasMoedas,
    };
  case DELETA:
    return {
      ...state,
      expenses: [...state.expenses.filter(
        (despesa) => despesa.id !== action.excluiDespesa,
      )],
    };
  default:
    return state;
  }
};

export default wallet;

// Req 5 - parte 3 - importo MOEDAS, e caso o reducer receba MOEDAS, ele deve colocar dentro do estado inicial array currencies, o meu todasMoedas, que guarda minhas moedas retornada da API. Em caso de impossibilidade de tratar a action, o estado inicial é retornado para evitar o "estouro" de erro na tela do usuário. Esta action, após tratada, é enviado a minha store/estado global para ficar disponível para os componentes. Haverá no meu estado global, um objeto, com a chave currencies que possui as moedas para serem colocadas em um select por exemplo, ou qualquer otura tag que faça sentido.

// REQ 4 parte 3 - Minha action é enviada ao reducer, que trata os dados recebidos, ou seja, recebe na chave  expenses (que é um array) do initial_state, meus estados locais do componente <enviadas ao apertar button enviar despesa> (despesas cadastradas no momento, mais as anterioes, por isso o ...action) e o retorno da API na chave exchangeRates. Tudo isso, guardado em um objeto, pq a chave exchangeRates da API é um objeto. Depois da action tratada, os dados são enviados para a store (combine reducer, recebe no reducer wallet, depois vai pro no store/estado global, todas essas informações)

//  REQ 8, parte 2: minha action referente a deletar a despesa, é enviada pra cá (DELETA), trato os dados, ou seja, pego o estado anterior do estado global e estado anterior do próprio expenses, passo um filter, isto é, quero filtrar somente a despesa.id, que seja diferente da minha action.excluiDespesa, ou seja, a despesa que eu acabei de clicar pra exluir (action.excluiDespesa), é excluída e o reducer envia ao estado global, os dados atualizados, sem esta despesa que foi excluída, logo, na renderização, os componentes locais recebem essa atualização (header e table), e retira da tela informações referente a esta despesa, do table retira todos os tópicos que estava sendo visto como descrição, o que foi escrito pra tag, o que foi escrito em valor etc, e do header, retira do total da soma, o valor referente a despesa excluída (subtrai ou zera)
