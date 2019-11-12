import React, { Component } from "react";
import NavItem from "./NavItem/NavItem";

import * as styles from "./NavItems.module.css";

class NavItems extends Component {
  state = {
    isAuth: false
  };

  componentDidMount() {
    if (localStorage.getItem("userId")) {
      this.setState({ isAuth: true });
    } else {
      this.setState({ isAuth: false });
    }
  }

  render() {
    let routes = (
      <ul className={styles.NavItems} onClick={this.props.clicked}>
        <NavItem link="/">Login</NavItem>
        <NavItem link="/register">Register</NavItem>
      </ul>
    );

    if (this.state.isAuth) {
      routes = (
        <ul className={styles.NavItems} onClick={this.props.clicked}>
          <NavItem link="/wallet">Wallet</NavItem>
          <NavItem link="/logout">Logout</NavItem>
        </ul>
      );
    }

    return routes;
  }
}

export default NavItems;
