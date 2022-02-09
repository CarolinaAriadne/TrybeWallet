import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { emailUser } = this.props;
    return (
      <header>
        <p data-testid="email-field">
          Email:
          { emailUser }
        </p>
        <section>
          <h4>Despesa total: R$</h4>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  emailUser: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
});

export default connect(mapStateToProps)(Header);
