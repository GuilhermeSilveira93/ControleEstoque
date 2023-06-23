import Main from './components/Main';
import React, { Component } from 'react';
import Login from './components/Login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioSessao: [],
    };
    this.logout = this.logout.bind(this)
    this.logado = this.logado.bind(this)
  }
  componentDidMount() {
    if (sessionStorage.getItem('Usuario') && sessionStorage.getItem('Usuario').indexOf('s_nome') > 0) {
      this.setState({
        usuarioSessao: JSON.parse(sessionStorage.getItem('Usuario')),
      });
    }
  }
  logado(userJson){
    this.setState({usuarioSessao:userJson})
  }
  logout() {
    sessionStorage.removeItem('Usuario');
    this.setState({
      usuarioSessao: '',
    });
  }

  render() {
    const { mensagem, usuarioSessao } = this.state
    console.log(usuarioSessao?.['s_nome'])
    return usuarioSessao && usuarioSessao['s_nome'] ? (
      <Main UserName={usuarioSessao?.['s_nome']} logout={this.logout} />
    ) : (
      <Login mensagem={mensagem} logado={this.logado}/>
    );
  }
}
