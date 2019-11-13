import React from "react";
import NavItem from "./NavItem/NavItem";

import * as styles from "./NavItems.module.css";

const NavItems = props => {
  let routes = (
    <ul className={styles.NavItems} onClick={props.clicked}>
      <NavItem link="/">Login</NavItem>
      <NavItem link="/register">Register</NavItem>
    </ul>
  );

  if (props.isAuth) {
    routes = (
      <ul className={styles.NavItems} onClick={props.clicked}>
        <NavItem link="/wallet">Wallet</NavItem>
        <NavItem link="/logout">Logout</NavItem>
      </ul>
    );
  }
  return routes;
};

export default NavItems;
