import React, { Component } from 'react';
import DashBoard from './Telas/DashBoard/DashBoard';
import TabelaMaquinas from './Telas/Cadastros/Maquinas/TabelaMaquinas';
import TabelaUsuarios from './Telas/Cadastros/Usuarios/TabelaUsuarios';
import TabelaOperadores from './Telas/Cadastros/Operadores/TabelaOperadores';

export default class Conteudo extends Component {
  render() {
    const { setMaquinas, setUsuarios, setOperadores, logout } = this.props
    return (
      <div className="conteudo">
        {setMaquinas === false && setOperadores === false && setUsuarios === false ? <DashBoard /> : setMaquinas === true ? <TabelaMaquinas /> : setUsuarios === true ? <TabelaUsuarios /> : setOperadores === true ? <TabelaOperadores /> : 'NÃO FOI POSSIVEL GERAR O CONTEUDO'}
        <button value="logout" id="logout" onClick={() => logout()}>Sair</button>
      </div>
    )
  }
}
