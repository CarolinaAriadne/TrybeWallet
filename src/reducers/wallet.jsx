// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { DESPESAS, MOEDAS } from '../actions';

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
  default:
    return state;
  }
};

export default wallet;
