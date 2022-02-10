import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),

);

export default store;

// minha createStore, que recebe como parâmetro, meu rootReducer (que guarda meus reducers, ou seja, na store estão os (alguns pelo menos) estados locais que foram enviados pra cá, pra passarem a ser globais e acessíveis a qualquer componente), além disso, recebe a função compose pra poder usar a extensão no navegador, e a função thunk, pra podermos utilizar thunk em actions assíncronas.
