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
      moeda: [],
    };
  }

  componentDidMount() {
    this.requisitaApi();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  requisitaApi = async () => {
    const requisicao = await fetch('https://economia.awesomeapi.com.br/json/all');
    const retornoApi = await requisicao.json();
    const chavesMoeda = Object.keys(retornoApi);
    this.setState({
      moeda: chavesMoeda.filter((moeda) => moeda !== 'USDT'),
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
    const { value, description, currency, method, tag, moeda } = this.state;
    return (
      <form>
        <label htmlFor="input-valor">
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
          <select data-testid="currency-input" id="chave-moedas" value={ currency } name="currency">
            { moeda.map((cadaMoeda) => (
              <option key={ cadaMoeda } data-testid={ cadaMoeda }>
                { cadaMoeda }
              </option>
            ))}
            ;
          </select>
        </label>
        <label htmlFor="metodo-pgmto">
          <select data-testid="method-input" id="metodo-pgmto" value={ method } name="method">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria-despesa">
          <select data-testid="tag-input" id="categoria-despesa" value={ tag } name="tag">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
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

export default connect(null, mapDispatchToProps)(FormDespesa);
