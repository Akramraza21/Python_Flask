import React, {Component, Fragment} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state={"name":"akatsuki"}
  }
  componentDidMount(){
    axios.get('http://127.0.0.1:5000/')
    .then(resp=>this.setState({name:resp.data.name}))
  }
  render(){
    return( <Fragment>
    <div className="App">
      Hello
      {this.state.name}
     </div>
     </Fragment>
    )
  }
}


export default App;
