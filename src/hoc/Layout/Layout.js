import React, { Component, Fragment } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import * as styles from "./Layout.module.css";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false,
    isAuth: false
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
        <Toolbar
          toggleDrawer={this.toggleDrawerHandler}
          isAuth={this.props.isAuthenticated}
        />
        <SideDrawer
          closed={this.drawerClosedHandler}
          open={this.state.showSideDrawer}
          isAuth={this.props.isAuthenticated}
        />
        <main className={styles.Layout}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
