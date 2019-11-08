import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/components/Header.styl';

const Header = (props) => (
  <div className="Header">
    <Link to="/">
      <img src='https://cdnbanexport.sfo2.digitaloceanspaces.com/FotosPOS/LogoCafe18.png'></img>
      <h1>Cafe 18 Facturación Pos</h1>
    </Link>
    <div className="Header-checkout">
    <Link to="/menu">
        <div className="Header-printInvoice">
        <i className="fas fa-print"></i>
        </div>
      </Link>
      <Link to="/checkout">
        <i className="fas fa-shopping-basket" />
      </Link>
      {props.cart.length > 0 &&
        <div className="Header-alert">{props.cart.length}</div>
      }
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, null)(Header);