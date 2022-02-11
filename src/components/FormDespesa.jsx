import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiTotal } from '../actions';

class FormDespesa extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  buttonEnviaDespesa = () => {
    const { id,
      value,
      description,
      currency,
      method,
      tag } = this.state;
    const { enviarDespesa } = this.props;
    enviarDespesa({ id,
      value,
      description,
      currency,
      method,
      tag });
    this.setState({
      value: '',
      description: '',
      id: id + 1,
    });
  }

  render() {
    const { moedas } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="input-valor">
          Valor
          <input
            type="text"
            id="input-valor"
            data-testid="value-input"
            value={ value }
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-descricao">
          Descrição
          <input
            type="text"
            id="input-descricao"
            data-testid="description-input"
            value={ description }
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="chave-moedas">
          Moeda
          <select
            data-testid="currency-input"
            id="chave-moedas"
            value={ currency }
            name="currency"
            onChange={ this.handleChange }
          >
            { moedas.map((cadaMoeda) => (
              <option key={ cadaMoeda } data-testid={ cadaMoeda }>
                { cadaMoeda }
              </option>
            ))}
            ;
          </select>
        </label>
        <label htmlFor="metodo-pgmto">
          Método de pagamento
          <select
            data-testid="method-input"
            id="metodo-pgmto"
            value={ method }
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria-despesa">
          Tag
          <select
            data-testid="tag-input"
            id="categoria-despesa"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.buttonEnviaDespesa }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

FormDespesa.propTypes = {
  enviarDespesa: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  enviarDespesa: (expense) => dispatch(fetchApiTotal(expense)),
});

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDespesa);
