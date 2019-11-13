import React from "react";
import NavItems from "../NavItems/NavItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import * as styles from "./Toolbar.module.css";

const Toolbar = props => {
  return (
    <header className={styles.Toolbar}>
      <DrawerToggle clicked={props.toggleDrawer} />
      <h1>Juvicount</h1>
      <nav className={styles.DesktopOnly}>
        <NavItems isAuth={props.isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;
