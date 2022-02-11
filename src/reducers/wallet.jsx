// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { DESPESAS } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const reducerWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DESPESAS:
    return {
      ...state, // pra não apagar resto das coisas do estado global, currencies
      expenses: [...state, { ...action.estadosLocais, exchangeRates: action.retornoApi }], // ... state, não apagar coisas anteriores que estão no próprio currencies
    };
  default:
    return state;
  }
};

export default reducerWallet;
