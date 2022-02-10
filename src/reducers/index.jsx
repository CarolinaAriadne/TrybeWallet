import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

// alterando

const rootReducer = combineReducers({
  user,
  wallet,
});

export default rootReducer;

// reducers definidos, estes estados são enviados para o corpo da função mapState, ou os dois ou um outro, já com a informação (estado) atualizado vindo do global.
