import React from "react";
import classes from "../Contact/contact.module.css";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";
import clas from "./sign.module.css";
import axios from "axios";
import passwordHash from "password-hash";

export default class Sign extends React.Component {
  state = {
    name: null,
    email: null,
    number: null,
    password: null,
    message: "",
    Signed: null,
  };

  //     componentDidMount(){
  //     axios.get("http://0.0.0.0:5000/sign")
  //     .then(resp => this.setState({Signed:resp.data}) )
  // }

  formHandler = (event) => {
    event.preventDefault();
    const { name, email, number, password } = this.state;
    let hashPass = passwordHash.generate(password);
    const data = {
      name: name,
      email: email,
      number: number,
      password: hashPass,
    };
    console.log(data);
    axios
      .post("http://0.0.0.0:5000/sign", data)
      .then((resp) => {
        // console.log(resp.data)
        if (resp.data.data === "error") {
          this.setState({ message: resp.data.message });
        } else if (resp.data.data === "done") {
          this.setState({ message: resp.data.message });
        }
      })
      .catch((error) => console.log(error));
  };

  statusHandler = () => {
    const { error, posted } = this.state;
    if (error) {
      this.setState({ posted: false, error: true });
    } else if (posted) {
      this.setState({ posted: true, error: false });
    }
  };
  render() {
    const { message } = this.state;

    return (
      <React.Fragment>
        {/* {submit ? <Popup clicked={()=>this.setState({submit:false})}>Thank you for connecting with us. <br/>We'll connect you soon... </Popup>: null } */}

        <div className={classes.div}>
          <h2 className={classes.h2}>Sign up</h2>
          <form onSubmit={this.formHandler}>
            <label htmlFor="name" className={classes.label}>
              Name{" "}
            </label>
            <input
              id="name"
              name="name"
              autoComplete="off"
              required
              placeholder="Full name"
              className={classes.input}
              onChange={(event) => this.setState({ name: event.target.value })}
            />
            <br />
            <br />
            <label htmlFor="email" className={classes.label}>
              Email{" "}
            </label>
            <input
              id="email"
              name="email"
              className={classes.input}
              autoComplete="off"
              required
              placeholder="Email"
              onChange={(event) => this.setState({ email: event.target.value })}
            />
            <br />
            <br />
            <label htmlFor="number" className={classes.label}>
              Mobile{" "}
            </label>
            <input
              id="number"
              name="number"
              className={classes.input}
              autoComplete="off"
              required
              placeholder="Mobile"
              onChange={(event) =>
                this.setState({ number: event.target.value })
              }
            />
            <br />
            <br />
            <label htmlFor="password" className={classes.label}>
              Password
            </label>
            <br />
            <input
              type="password"
              className={classes.input}
              id="password"
              autoComplete="off"
              required
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
              placeholder="Password"
              name="password"
            />
            <br />
            <br />
            <br />

            {message ? (
              <small>
                {this.state.message}
                <br />
              </small>
            ) : null}
            <span
              style={{ padding: "5px 0px" }}
              onClick={() => this.statusHandler}
            >
              <Button type={"submit"} name={classes.button}>
                Sign up
              </Button>
            </span>
            <br />
            <br />
            <small>
              <NavLink to="/login" className={clas.sign}>
                {" "}
                Already have an account{" "}
              </NavLink>
            </small>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
