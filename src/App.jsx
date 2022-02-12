import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;

// Aqui, passamos somente as rotas das páginas, para cada page/componente, uma rota foi definida.
// REQ 2.

// testando 4 e 5
