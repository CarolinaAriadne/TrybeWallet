// Esse reducer será responsável por tratar as informações da pessoa usuária

import { LOGIN } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const reducerUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default reducerUser;

// definindo estado inicial do email do usuário. Action enviada pelo dispatch, chega ao reducer, que identifica o tipo e retorna, no caso de LOGIN (minha action), o email digitado pelo usuário no input, após, envia isso à store.  Não é necessário passar state inicial no retorno, pois a única coisa que será e precisa ser retornada, é o email do usuário. Default, caso ocorra algum erro no retorno da action, não será de fato um erro que aparecerá na tela, mas sim, o estado anterior.
