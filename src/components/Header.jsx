import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import conversaoESomaDespesas from '../helpers/functions';

class Header extends React.Component {
conversaoESomaDespesas = () => {
  const { recebendoDespesa } = this.props;
  console.log(recebendoDespesa);

  if (recebendoDespesa.length > 0) {
    // const { currency } = recebendoDespesa[0];
    // console.log(currency);
    // console.log(exchangeRates);

    let resultadoTotal = 0;

    recebendoDespesa.forEach((despesa) => {
      resultadoTotal += Number(despesa.value)
         * Number(despesa.exchangeRates[despesa.currency].ask);
    });
    return resultadoTotal.toFixed(2);
  }
  return 0;
}

render() {
  const { emailUser } = this.props;

  return (
    <header>
      <p data-testid="email-field">
        Email:
        { emailUser }
      </p>
      <section>
        <h4>Despesa total: R$</h4>
        <p data-testid="total-field">
          { this.conversaoESomaDespesas() }
        </p>
        <span data-testid="header-currency-field">BRL</span>
      </section>
    </header>
  );
}
}

Header.propTypes = {
  emailUser: PropTypes.string,
  recebendoDespesa: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  recebendoDespesa: state.wallet.expenses,
  total: conversaoESomaDespesas(state.wallet.expenses),
});

export default connect(mapStateToProps, null)(Header);

// REQ 3: meu Header precisa renderizar meu  e- mail que foi preenchido no input login, logo, eu preciso receber o estado global neste componente, que está guardado na store, que é meu email
// que foi preenchido no input e guardado na mesma.
// Desta forma, uso o mapState, que recebe como parâmetro o state (estado global,ele traz meu combine reducer, todos meu reducer), para definir qual estado quero, chamo state.user, pq quero o estado do reduce user, que é onde ocorre o tratamento de dados do login email, após passo minha  chave do objeto user, email onde de fato estará guardado o email que veio do input, sendo assim, emailUser, recebe o meu email do estado global,o email digitado pelo usuário enviado pra store.  Passo o connect, pra conectar meu componente com o repositório redux e o que ele guarda. No return, renderizo, mostro na tela, o emailUser como prop, que leva como valor meu email.

//  acesso a chave ASK para req 4 : meu Array recebendoDespesa, possui um objeto pai, que possui uma chave currency (estado inicial criado em FormDespesa, possui essa chave que inicia o estado com USD), cujo valor inicial quando carrega a página  é USD. Além dessa chave currency, o objeto pai possui também uma chave exchangeRates, cujo valor, é ums segundo objeto (objeto filho)Dentro deste segundo objeto, obj filho, temos as chaves moedas, sendo que cada chave é um objeto neto. Minha chave currency de valor USD por ex, é o equivalente a alguma chave do objeto exchangeRates, alguma chave de exchangeRates tem o mesmo valor dá minha currency (USD). Dentro desta chave moeda , por ex USD, onde existe um objeto neto, existe a cchavinha ask que possui o valor da minha cotação. Sendo assim, para ter acesso a chave ask e seu valor de cotação, após desustruruar as chaves currency e exchangeRates, passo em uma variável, a chave exchangeRates indicando que quero a moeda equivalente ao currency, por isso o exchangeRates[currency], ou seja, da exchangeRates eu quero a chave que tem o mesmo valor da minha chave currency (  USD exemplo), e dessa chave USD, eu quero o valor da cotação, por isso acesso a chave ask.
