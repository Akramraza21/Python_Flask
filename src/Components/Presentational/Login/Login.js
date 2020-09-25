import React from "react";
import classes from "../Contact/contact.module.css";
import Button from "../Button/Button";
import { NavLink, Redirect } from "react-router-dom";
import classLog from "./Login.module.css";
import axios from "axios";
// import PropTypes from 'prop-types'

export default class Login extends React.Component {
  state = { email: "", password: "", error: "", message: "", toLink: false };

  submitHandler = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    axios
      .post("http://0.0.0.0:5000/login", { email: email, password: password })
      .then((resp) => {
        let resourse = resp.data;
        // console.log(resourse, resp)
        if (resourse.data === "done") {
          this.setState({
            error: false,
            message: resourse.message,
            toLink: true,
          });

          // console.log("done",resourse.message)
          return <Redirect to="/logged_in" />;
        } else if (resourse.data === "error") {
          this.setState({ error: true, message: resourse.message });
          // console.log("error",resourse.message)
        }
      });
  };

  render(props) {
    // console.log(this.props)
    if (this.state.toLink) {
      setTimeout(() => {
        this.props.history.push("/logged_in");
      }, 2000);
    }
    const { error, message } = this.state;

    return (
      <React.Fragment>
        {/* {submit ? <Popup clicked={()=>this.setState({submit:false})}>Thank you for connecting with us. <br/>We'll connect you soon... </Popup>: null } */}
        <div className={classes.div}>
          <h2 className={classes.h2}>Login</h2>
          <form onSubmit={this.submitHandler}>
            <label htmlFor="email" className={classes.label}>
              Email{" "}
            </label>
            <input
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              required
              className={classes.input}
              onChange={(event) => this.setState({ email: event.target.value })}
            />
            <br />
            <br />
            <label htmlFor="password" className={classes.label}>
              Password
            </label>
            <br />
            <input
              type="password"
              autoComplete="off"
              required
              className={classes.input}
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
              placeholder="Password"
              id="password"
              name="password"
            />
            <br />
            <br />
            <br />
            {error ? (
              <small>
                {message}
                <br />
              </small>
            ) : null}
            <Button type={"submit"} name={classes.button}>
              Login
            </Button>
            <br />
            <br />
            <small>
              {" "}
              <NavLink to="/sign" className={classLog.login}>
                Create an account{" "}
              </NavLink>{" "}
            </small>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
// const PropTypes =
