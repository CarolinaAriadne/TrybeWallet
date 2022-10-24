import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletExpense } from '../actions';
import '../styles/Table.css';

class Table extends React.Component {
  render() {
    const { recebendoDespesa, deletaDespesa } = this.props;
    // console.log(recebendoDespesa);
    return (
      <section className="container-table">
        <table>
          <thead className="header-table">
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {recebendoDespesa.map((despesa) => (
              <tr key={ despesa.id }>
                {console.log(despesa.exchangeRates[despesa.currency].name)}
                <td>{despesa.description}</td>
                <td>{despesa.tag}</td>
                <td>{despesa.method}</td>
                <td>{Number(despesa.value).toFixed(2)}</td>
                <td>{despesa.exchangeRates[despesa.currency].name}</td>
                <td>{Number(despesa.exchangeRates[despesa.currency].ask).toFixed(2)}</td>
                <td>
                  {Number(
                    despesa.value * despesa.exchangeRates[despesa.currency].ask,
                  ).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    className="btn-exclui-despesa"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deletaDespesa(despesa.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  recebendoDespesa: PropTypes.arrayOf,
  deletaDespesa: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  recebendoDespesa: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deletaDespesa: (excluiDespesa) => dispatch(deletExpense(excluiDespesa)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

// FONTE DAS DEFINIÇÕES DAS TAGS ABAIXO: https://www.w3schools.com/
// Tags tabela:
// thead: usada para agrupar o conteúdo do cabeçalho em uma tabela HTML.
// tr: define uma linha em uma tabela HTML.
// th: define uma célula de cabeçalho em uma tabela HTML (fica em negrito)
// td: define uma célula de dados padrão em uma tabela HTML (sem negrito)
//  <tbody>:  usada para agrupar o conteúdo do corpo em uma tabela HTML

// REQ 7: recebo o estado global no meu componente Table, todo o combine com os reducer e defino que quero as despesas cadastradas, as despesas são "colocadas" dentro da minha prop recebendoDespesa (array de objetos). Desconstruo minha prop pra ter acesso aos objetos e suas propriedades/valor. Um map é necessáio, para que seja renderizado na tela, as informações que o requisito pede. A cada iteração, renderizo as informações referente a despesa, como descrição, a tag, método de pagamento etc. Foi necessário utilizar o toFixed(2) algumas vezes, pq o teste pede que  o valor digitado pelo usuário (value) a cotação ask, e a despesa total (onde temos a multiplicação), tenham duas casas decimais.
// OBS: acesso:  <td>{despesa.exchangeRates[despesa.currency].name}</td>
// <td>{Number(despesa.exchangeRates[despesa.currency].ask).toFixed(2)}</td>   : acesso a chave exchangeRates do objeto pai,  exchangeRates é um objeto filho que possui  propridades com a sigla de cada moeda como por ex, USD. Pra eu acessar a moeda que quero, primeiro, preciso acessar a chave currency do objeto pai, que possui o valor da moeda escolhida, com isso , tendo meu acesso em exchangeRates a chave USD, que é um objeto neto, e por fim a propriedade da USD name, que possui o nome da moeda por extenso.
// Multiplicação, mesma lógica da 4.

// REQ 8: assim que o usuário clica no button de excluir, function deletaDespesa (que passei como props), é chamada, a action deletExpense é disparada com seu parâmetro (definido na action). Continuação, no reducer.
