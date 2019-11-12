import React from "react";
import NavItem from "./NavItem/NavItem";

import * as styles from "./NavItems.module.css";

const NavItems = props => {
  return (
    <ul className={styles.NavItems} onClick={props.clicked}>
      <NavItem link="/">Login</NavItem>
      <NavItem link="/register">Register</NavItem>
      <NavItem link="/wallet">Wallet</NavItem>
    </ul>
  );
};

export default NavItems;
