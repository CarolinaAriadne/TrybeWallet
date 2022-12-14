import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendEmailuser } from '../actions';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isDisable: true,
    };
  }

  inputEmaileSenha = ({ target }) => {
    this.setState({
      [target.type]: target.value,
    }, () => this.validacaoEmaileSenha());
  }

  submitLogin = () => {
    const { email } = this.state;
    const { geraLogin, history } = this.props;
    geraLogin({ email });
    history.push('/carteira');
  }

  validacaoEmaileSenha = () => {
    const tamanhosenha = 6;
    const { email, password } = this.state;
    const valideEmail = email.includes('@') && email.includes('.com');

    if (valideEmail && password.length >= tamanhosenha) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  }

  render() {
    const { email, password, isDisable } = this.state;
    return (
      <section className="container-form-login">
        <form className="form-login" onSubmit={ this.submitLogin }>
          <h1>LOGIN</h1>
          <label htmlFor="input-email">
            <input
              type="email"
              id="input-email"
              className="form-dado"
              value={ email }
              data-testid="email-input"
              placeholder="Email"
              onChange={ this.inputEmaileSenha }
            />
          </label>
          <label htmlFor="input-senha">
            <input
              type="password"
              id="input-senha"
              className="form-dado"
              value={ password }
              placeholder="Senha"
              data-testid="password-input"
              onChange={ this.inputEmaileSenha }
            />
          </label>
          <button
            type="submit"
            className="button-entrar"
            disabled={ isDisable }
          >
            Entrar
          </button>
        </form>
      </section>

    );
  }
}
Login.propTypes = {
  geraLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  geraLogin: (email) => dispatch(sendEmailuser(email)),
});

export default connect(null, mapDispatchToProps)(Login);

// REQ 1 - componente Login, iniciando o referido, com estado inicial antes de haver intera????o do usu??rio, ou seja,
// email e senha vazio, e bot??o de salvar desabilitado (disable: true), pois s?? habilita ap??s preenchimento de informa????es.
// Form, realizado para aparecer campos de input e bot??o. Function  inputEmaileSenha , gen??rica, para  atualiza o estado do meu input (target, elemento que sofre o evento da digita????o), para passar a ter o estado de ter algo digitado (value). Target type, pois pego o tyoe password e senha que est?? no html
// No segundo par??metro do setState, chamo minha function que valida meu email e senha, isto ??: guarda em vari??veis o que quero que meu email tenha e uma condi????o para senha tbm (senha m??nimo 6 caracteres, email precisa ter inclu??do um @ e um .com), caso as duas condi????es sejam satisfeitas, meu bot??o de salvar passa pra false (habilitado), caso uma das duas n??os seja satisfeita, meu bot??o de salvar permanece disable como come??a no hmtl (true, desabilitado). Passo meu estado atualizado (j?? com senha e email preenchidos, e bot??o habilitado se for o caso), pro render, e no return aparece na tela o estado atualizado (inputs preenchidos (value) e button tbm j?? com estado atual habilitado). Meu estado local email preenchido, precisa ser enviado ao estado global, desta forma, no mapDispatch, passo o email como par??metro da minha fun????o que est?? na action sendEmailUser, esta fun????o ?? chamada e minha action (que ?? a fun????o), manda este email pro reducer, que trata o dado, retorna a action.email (digitado), que ap??s, envia pra store/estado global.Minha prop geraLogin, recebe o estado atualizado. O connect serve para conectar meu componente e a function MapDispatch, ao estado global, fazer essa liga????o pro envio da action. J?? a function submitLogin, ?? a que serve para enviar meu estado local, para meu estado global, passo o this.state email (que  vai ter o meu estado local atualizado input email preenchido),  passo minha prop geraLogin  e history (history prop do route, temos que usar pra poder enviar pra uma rota espec??fica as informa????es, outra page), chamo minha geraLogin, passando meu estado local, input email preenchido, e essa informa????o do email preenchido, ser?? enviada para a rota /carteira.
