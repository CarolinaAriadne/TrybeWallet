import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormDespesa from '../components/FormDespesa';
import Header from '../components/Header';
import { fetchApiMoedas } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { pegaMoedas } = this.props;
    pegaMoedas();
  }

  render() {
    return (
      <>
        <Header />
        <FormDespesa />
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  pegaMoedas: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  pegaMoedas: () => dispatch(fetchApiMoedas()),

});
export default connect(null, mapDispatchToProps)(Wallet);

// Page Wallet, aqui chamo meus componentes que compõe a page wallet.

// REQ 5- parte 1 - Assim que entrarmos na rota /carteira, após a renderização dos componente Header e FormDespesa, a função pegaMoedas é chamada. Dispara-se uma ação, que é a function fetchApi Moedas
