import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendEmailuser } from '../actions';

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
      <form onSubmit={ this.submitLogin }>
        <h1>LOGIN</h1>
        <label htmlFor="input-email">
          <input
            type="email"
            id="input-email"
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
            value={ password }
            placeholder="Senha"
            data-testid="password-input"
            onChange={ this.inputEmaileSenha }
          />
        </label>
        <button
          type="submit"
          disabled={ isDisable }
        >
          Entrar
        </button>
      </form>
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

// REQ 1 - componente Login, iniciando o referido, com estado inicial antes de haver interação do usuário, ou seja,
// email e senha vazio, e botão de salvar desabilitado (disable: true), pois só habilita após preenchimento de informações.
// Form, realizado para aparecer campos de input e botão. Function  inputEmaileSenha , genérica, para  atualiza o estado do meu input (target, elemento que sofre o evento da digitação), para passar a ter o estado de ter algo digitado (value). Target type, pois pego o tyoe password e senha que está no html
// No segundo parâmetro do setState, chamo minha function que valida meu email e senha, isto é: guarda em variáveis o que quero que meu email tenha e uma condição para senha tbm (senha mínimo 6 caracteres, email precisa ter incluído um @ e um .com), caso as duas condições sejam satisfeitas, meu botão de salvar passa pra false (habilitado), caso uma das duas nãos seja satisfeita, meu botão de salvar permanece disable como começa no hmtl (true, desabilitado). Passo meu estado atualizado (já com senha e email preenchidos, e botão habilitado se for o caso), pro render, e no return aparece na tela o estado atualizado (inputs preenchidos (value) e button tbm já com estado atual habilitado). Meu estado local email preenchido, precisa ser enviado ao estado global, desta forma, no mapDispatch, passo o email como parâmetro da minha função que está na action sendEmailUser, esta função é chamada e minha action (que é a função), manda este email pro reducer, que trata o dado, retorna a action.email (digitado), que após, envia pra store/estado global.Minha prop geraLogin, recebe o estado atualizado. O connect serve para conectar meu componente e a function MapDispatch, ao estado global, fazer essa ligação pro envio da action. Já a function submitLogin, é a que serve para enviar meu estado local, para meu estado global, passo o this.state email (que  vai ter o meu estado local atualizado input email preenchido),  passo minha prop geraLogin  e history (history prop do route, temos que usar pra poder enviar pra uma rota específica as informações, outra page), chamo minha geraLogin, passando meu estado local, input email preenchido, e essa informação do email preenchido, será enviada para a rota /carteira.
