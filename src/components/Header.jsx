import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Header.css';

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
    <section className="container-header">
      <div className="title-header">
        <h3>TrybeWallet</h3>
      </div>
      <section className="email-and-total">
        <header>
          <p className="email" data-testid="email-field">
            Email:
            { emailUser }
          </p>
          <section className="expenses-header">
            <h4>Despesa total: R$</h4>
            <p data-testid="total-field">
              { this.conversaoESomaDespesas() }
            </p>
            <span data-testid="header-currency-field">BRL</span>
          </section>
        </header>
      </section>
    </section>

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

});

export default connect(mapStateToProps, null)(Header);

// REQ 3: meu Header precisa renderizar meu  e- mail que foi preenchido no input login, logo, eu preciso receber o estado global neste componente, que está guardado na store, que é meu email
// que foi preenchido no input e guardado na mesma.
// Desta forma, uso o mapState, que recebe como parâmetro o state (estado global,ele traz meu combine reducer, todos meu reducer), para definir qual estado quero, chamo state.user, pq quero o estado do reduce user, que é onde ocorre o tratamento de dados do login email, após passo minha  chave do objeto user, email onde de fato estará guardado o email que veio do input, sendo assim, emailUser, recebe o meu email do estado global,o email digitado pelo usuário enviado pra store.  Passo o connect, pra conectar meu componente com o repositório redux e o que ele guarda. No return, renderizo, mostro na tela, o emailUser como prop, que leva como valor meu email.

//  acesso a chave ASK para req 4 : meu Array recebendoDespesa, possui um objeto pai, que possui uma chave currency (estado inicial criado em FormDespesa, possui essa chave que inicia o estado com USD), cujo valor inicial quando carrega a página  é USD. Além dessa chave currency, o objeto pai possui também uma chave exchangeRates, cujo valor, é ums segundo objeto (objeto filho)Dentro deste segundo objeto, obj filho, temos as chaves moedas, sendo que cada chave é um objeto neto. Minha chave currency de valor USD por ex, é o equivalente a alguma chave do objeto exchangeRates, alguma chave de exchangeRates tem o mesmo valor dá minha currency (USD). Dentro desta chave moeda , por ex USD, onde existe um objeto neto, existe a cchavinha ask que possui o valor da minha cotação. Sendo assim, para ter acesso a chave ask e seu valor de cotação, após desustruruar as chaves currency e exchangeRates, passo em uma variável, a chave exchangeRates indicando que quero a moeda equivalente ao currency, por isso o exchangeRates[currency], ou seja, da exchangeRates eu quero a chave que tem o mesmo valor da minha chave currency (  USD exemplo), e dessa chave USD, eu quero o valor da cotação, por isso acesso a chave ask.

// REQ 4 - parte 4 - recebo no meu Header o estado global referente a wallet, dentro da minha prop recebendoDespesa, tudo que está no array expenses, ou seja, recebo as despesas cadastradas e o retorno da Api.No momento que a despesa total é renderizada, vai aparecer a soma das minhas despesas, já em real: a função é chamada, recebo meu recebendoDespesa como prop pra utilizar, definindo uma variável resultadoTotal que terá a soma das despesas, a cada iteração em cada despesa cadastrada (cada despesa é um objeto), minha variável resultadoTotal recebe o valor total anterior (se houver), (resultado = resultado +) que recebe o value (que é chave do meu estado inicial que foi enviada ao estado global e recebida aqui no componente) que possui o valor digitado pelo usuário (valor da despesa) e multiplica isso pela cotação que está guardada na chave ask, deste modo, temos a conversão em dólares da despesa, para reais (com a multiplicação) e a soma das despesas. No resultadoTotal, teremos a soma de todas as despesas cadastradas, já convertidas para real e isso será mostrado na tela aqui  <p data-testid="total-field">  { this.conversaoESomaDespesas() }.
// OBS if (recebendoDespesa.length > 0) {, porque quando a tela é carregada, não existe nenhuma despesa cadastrada, logo, pra não dar um erro, fazemos essa verificação primeiro, se recebendoDespesa que é um array, for maior que zero (ou seja, existe despesa cadastrada), então o bloco do código é executada, senão, o retorno será 0, isto é, na tag Despesa total irá aparecer zero pq não há despesa cadastrada, logo, não há soma.
// OBS: Utilizamos o Number, porque não existe soma de strings, os valores estão como string, tanto o value digitado pelo usuário quanto a cotação da chave ask, logo, transformamos em número de fato para que seja possível o cálculo.
