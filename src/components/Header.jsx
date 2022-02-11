import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
conversaoESomaDespesas = () => {
  const { recebendoDespesa } = this.props;
  console.log(recebendoDespesa);
  console.log(recebendoDespesa[0]);

  const cotacao = recebendoDespesa[0].exchangeRates[recebendoDespesa[0].currency].ask;
  console.log(cotacao);
  // recebendoDespesa.forEach((valorDespesa) =>

  // )
}

// Após adicionar a despesa, atualize a soma total das despesas (utilize a chave ask para realizar essa soma). Essa informação deve ficar no header dentro do elemento com data-testid="total-field"

// Após adicionar a despesa, limpe o valor do campo valor da despesa

render() {
  const { emailUser, recebendoDespesa } = this.props;

  return (
    <header>
      <p data-testid="email-field">
        Email:
        { emailUser }
      </p>
      <section>
        <h4>Despesa total: R$</h4>
        <span data-testid="total-field">{ this.conversaoESomaDespesas()}</span>
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
});

export default connect(mapStateToProps, null)(Header);

// REQ 3: meu Header precisa renderizar meu  e- mail que foi preenchido no input login, logo, eu preciso receber o estado global neste componente, que está guardado na store, que é meu email
// que foi preenchido no input e guardado na mesma.
// Desta forma, uso o mapState, que recebe como parâmetro o state (estado global,ele traz meu combine reducer, todos meu reducer), para definir qual estado quero, chamo state.user, pq quero o estado do reduce user, que é onde ocorre o tratamento de dados do login email, após passo minha  chave do objeto user, email onde de fato estará guardado o email que veio do input, sendo assim, emailUser, recebe o meu email do estado global,o email digitado pelo usuário enviado pra store.  Passo o connect, pra conectar meu componente com o repositório redux e o que ele guarda. No return, renderizo, mostro na tela, o emailUser como prop, que leva como valor meu email.
