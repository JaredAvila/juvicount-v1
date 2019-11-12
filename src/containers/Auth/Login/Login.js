import React, { Component } from "react";
import axios from "axios";

import { NavLink } from "react-router-dom";
import Input from "../../../UI/Input/Input";
import { checkValidation } from "../../../helpers/validation";

import * as styles from "./Login.module.css";

class Login extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email",
          autoComplete: "username"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
          autoComplete: "current-password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };

  onChangedHandler = (e, type) => {
    const updatedControls = {
      ...this.state.controls,
      [type]: {
        ...this.state.controls[type],
        value: e.target.value,
        valid: checkValidation(
          e.target.value,
          this.state.controls[type].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const data = {
      email: this.state.controls["email"].value,
      password: this.state.controls["password"].value,
      returnSecureToken: true
    };
    axios
      .post("http://localhost:8000/api/v1/juvicount/login", data)
      .then(res => {
        localStorage.setItem("idToken", res.data.idToken);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("userId", res.data.id);
      })
      .catch(err => console.log(err));
    this.props.history.push("/wallet");
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map(formElement => {
      return (
        <Input
          key={formElement.id}
          inputType={formElement.config.elementType}
          config={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={e => this.onChangedHandler(e, formElement.id)}
        />
      );
    });
    return (
      <div className={styles.Login}>
        <h4>Sign In</h4>
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <input className={styles.Btn} type="submit" value="Log In" />
        </form>
        <p className={styles.Accnt}>Don't have an account?</p>
        <NavLink className={styles.Link} to={"/register"}>
          Create one now
        </NavLink>
      </div>
    );
  }
}

export default Login;
