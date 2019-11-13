import React, { Component } from "react";

import axios from "axios";

import Input from "../../../UI/Input/Input";
import { NavLink, Redirect } from "react-router-dom";
import { checkValidation } from "../../../helpers/validation";
import { connect } from "react-redux";

import * as styles from "./Register.module.css";
import * as actions from "../../../store/actions/";

class Register extends Component {
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
        valid: false,
        touched: false,
        validation: {
          required: true,
          isEmail: true
        }
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
          autoComplete: "new-password"
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      },
      password2: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Confirm Password",
          autoComplete: "new-password"
        },
        value: "",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    },
    noMatch: false
  };

  onChangedHandler = (e, type) => {
    const updatedControls = {
      ...this.state.controls,
      [type]: {
        ...this.state.controls[type],
        value: e.target.value,
        touched: true,
        valid: checkValidation(
          e.target.value,
          this.state.controls[type].validation
        )
      }
    };
    this.setState({ controls: updatedControls, noMatch: false });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    if (
      this.state.controls["password"].value !==
      this.state.controls["password2"].value
    ) {
      this.setState({ noMatch: true });
      return;
    }

    this.props.onAuth(
      this.state.controls["email"].value,
      this.state.controls["password"].value,
      true
    );
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

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/wallet" />;
    }
    return (
      <div className={styles.Register}>
        {authRedirect}
        <div>
          <h4>Create an account</h4>
          <form onSubmit={this.onSubmitHandler}>
            {form}
            <input className={styles.Btn} type="submit" value="Sign In" />
            {this.state.noMatch ? <p>Passwords do not match</p> : null}
          </form>
          <p className={styles.Accnt}>Already have an account?</p>
          <NavLink className={styles.Link} to={"/"}>
            SIGN IN
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
