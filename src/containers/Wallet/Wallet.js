import React, { Component } from "react";

class Wallet extends Component {
  render() {
    const userEmail = localStorage.getItem("email");
    return (
      <div>
        <h1>Wallet Container</h1>
        <h3>{userEmail}</h3>
      </div>
    );
  }
}

export default Wallet;
