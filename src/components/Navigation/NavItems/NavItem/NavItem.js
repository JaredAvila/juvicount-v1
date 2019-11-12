import React from "react";
import { NavLink } from "react-router-dom";
import * as styles from "./NavItem.module.css";

const NavItem = props => {
  return (
    <li className={styles.NavItem}>
      <NavLink to={props.link} exact activeClassName={styles.active}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
