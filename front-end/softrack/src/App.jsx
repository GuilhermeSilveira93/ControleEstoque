import Main from './components/Main';
import React, { Component } from 'react';
import Login from './components/Login';
import api from './api/Api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarioSessao: [],
      direitosUsuario: []
    };
    this.logout = this.logout.bind(this)
    this.logado = this.logado.bind(this)
  }
  async componentDidMount() {
    if (sessionStorage.getItem('Usuario') && sessionStorage.getItem('Usuario').indexOf('s_nome') > 0) {
      this.setState({
        usuarioSessao: JSON.parse(sessionStorage.getItem('Usuario')),
      });
    }
  }
  async componentDidUpdate() {
    const { usuarioSessao,direitosUsuario } = this.state
    if (usuarioSessao && usuarioSessao['s_nome'] && direitosUsuario && direitosUsuario.length === 0) {
      await api.get('/permicoes.json', {
        params: {
          idGrupo: usuarioSessao['id_grupo'],
        }
      }).then((resposta) => {
        this.setState({ direitosUsuario: resposta.data })
        console.log(direitosUsuario)
      }).catch((err) => {
        console.log(err)
      });
    }
  }
  logado(userJson) {
    this.setState({ usuarioSessao: userJson })
  }
  logout() {
    sessionStorage.removeItem('Usuario');
    this.setState({
      usuarioSessao: '',
      direitosUsuario:[],
    });
  }

  render() {
    const { mensagem, usuarioSessao,direitosUsuario } = this.state
    return usuarioSessao && usuarioSessao['s_nome'] ? (
      <Main UserName={usuarioSessao?.['s_nome']} logout={this.logout} direitos={direitosUsuario} />
    ) : (
      <Login mensagem={mensagem} logado={this.logado} />
    );
  }
}
