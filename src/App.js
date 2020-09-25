import React, { Component, Fragment } from "react";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/footer";
// import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import Blog from "./Components/Presentational/Blog/Blog";
import Home from "./Components/Presentational/Home/Home";
import Profile from "./Components/Presentational/Profile/Profile";
import Sign from "./Components/Presentational/Sign/Sign";
import Contact from "./Components/Presentational/Contact/Contact";
import Create from "./Components/Presentational/Create/Create";
import Login from "./Components/Presentational/Login/Login";
import Logged from "./Components/Presentational/Login/Logged/Logged";
import Data from "./data/colleges.json";
import Colleges from "./colleges/colleges";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { name: "", age: 0, "mobile no": 0 }, item: Data };
  }
  // componentDidMount() {
  //   axios
  //     .get("http://127.0.0.1:5000/")
  //     .then((resp) => this.setState({ data: resp.data }));
  // }

  render() {
    const { name } = this.state.data;
    console.log(Data);
    return (
      <Fragment>
        <BrowserRouter>
          <Header name={name} />
          <Route exact path="/" component={Home} />
          <Route path="/posts" component={Blog} />
          <Route path="/profile" component={Profile} />
          <Route path="/sign" component={Sign} />
          <Route path="/login" component={Login} />
          <Route path="/logged_in" component={Logged} />
          <Route
            path="/colleges"
            render={(props) => <Colleges {...props} data={this.state.item} />}
          />
          <Route path="/create" component={Create} />
          <Footer />
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
