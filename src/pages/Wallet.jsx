import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormDespesa from '../components/FormDespesa';
import Header from '../components/Header';
import { fetchApiMoedas } from '../actions';

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
