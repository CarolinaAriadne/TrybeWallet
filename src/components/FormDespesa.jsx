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

// REQ 5- parte 4 - meu Form já com seus inputs e demais tags realizadas, recebe do estado global, recebe o combineReducer, que possui meus reducers.  Defino uma chave pra este objeto, que será passado como prop, e nela guardo meu estado global, referente ao reducer wallet, referente a chave currencies, ou seja, o que está em moedas, são minhas moedas de fato que irão aparecer no select.
// Desconstruo moedas como props. Dentro do select, passo meu map, que irá iterar sobre todas as moedas e mostrar na tela cada moeda, irá mostrar no select.

// REQ 4: parte 1 - Montado o formDespesa, componente que irá exibir na tela inputs, selects etc, para que o usário interaja.
// Nosso estado inicial começa com o id zero, pq não existe nenhuma despesa cadastrado de começo, com alguns inputs vazios, porém com outros campos já preenchidos assim que a  página carrega, como currency/method/tag. Conforme o usuário interaje com a tela, com os elementos, nosso estado é atualizado por meio da handleChange, assim que o evento ocorre (interação do usuário), essa função é chamada e "pega" o target (elemento que sofreu ação do usuário, sofreu evento), e passa para os elementos que sofreram a interação, exatamente aquilo que o usuário fez, ou seja, o value, o input terá o que foi digitado, o select passará a ter o que foi especificamente selecionado etc. Utilizado target.name, pois as tags possuem "name", logo, utilizando este atributo com .target, conseguimos fazer que essa função siva para todos os elementos.
// Após o usuário cadastrar sua despesa, e clicar no button enviar despesa, uma action é disparada, isto é, a action fetchApiTotal com o parâmetro expense (despesa.)
// OBS: depois que o botão de enviar despesa é apertado, eviarDespesa prop é recebida com os estados iniciais, sendo que o estado é atualizado no forms, no sentido do campo input value e description volta a ficar vazio "", bem como o id, vai receber id +1 a cada despesa cadastrada, despesa primeira 1, despesa segunda id 2, despesa terceira id 3, e assim por diante, em razão do incremento do id.
