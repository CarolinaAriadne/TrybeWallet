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
