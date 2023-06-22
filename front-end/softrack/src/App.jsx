import Main from './components/Main';
import React, { Component } from 'react';
import Login from './components/Login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    login:false,
    usuario:'',
    };
    this.logado = this.logado.bind(this)
  }
logado(){
  this.setState({usuario:sessionStorage.getItem('Usuario'),login:true})
  console.log(sessionStorage.getItem('Usuario'))
}
  
  render() {
    const {login} = this.state
    return (
      <>
      {login ? <Main /> :
      <Login logado={this.logado} />}
      </>
      )
  }
}
