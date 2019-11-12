import React, { Component, Fragment } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import * as styles from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  drawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleDrawerHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Fragment>
        <Toolbar toggleDrawer={this.toggleDrawerHandler} />
        <SideDrawer
          closed={this.drawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={styles.Layout}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
