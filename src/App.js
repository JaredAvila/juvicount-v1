import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Wallet from "./containers/Wallet/Wallet";
import Login from "./containers/Auth/Login/Login";
import Logout from "./containers/Auth/Logout/Logout";
import Register from "./containers/Auth/Register/Register";
import Layout from "./hoc/Layout/Layout";
import * as actions from "./store/actions/";

class App extends Component {
  componentDidMount = () => {
    this.props.checkAuth();
  };

  render() {
    return (
      <Layout>
        <Route path="/" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/register" exact component={Register} />
        <Route path="/wallet" component={Wallet} />
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(actions.authCheckState())
  };
};

export default connect(null, mapDispatchToProps)(App);
