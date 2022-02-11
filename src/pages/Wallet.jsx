import React from 'react';
import FormDespesa from '../components/FormDespesa';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FormDespesa />
      </>
    );
  }
}

export default Wallet;

// Page Wallet, aqui chamo meus componentes que compõe a page wallet.
