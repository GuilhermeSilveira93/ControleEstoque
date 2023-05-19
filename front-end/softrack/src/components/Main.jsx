import React, { Component } from 'react';
import Aside from "./Telas/aside/Aside";
import Conteudo from './Conteudo';
export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      maquinas: false,
      operadores: false,
      usuarios: false
    }/*
    this.setMaquinas = this.setMaquinas.bind(this);
    this.setOperadores = this.setOperadores.bind(this);
    this.setUsuarios = this.setUsuarios.bind(this);
    this.setAllFalse = this.setAllFalse.bind(this)*/
  }
  setMaquinas(){
    this.setState({ maquinas: true, operadores:false, usuarios:false })
  }
  setOperadores(){
    this.setState({ maquinas: false, operadores:true, usuarios:false })
  }
  setUsuarios(){
    this.setState({ maquinas: false, operadores:false, usuarios:true })
  }
  setAllFalse(){
    this.setState({ maquinas: false, operadores:false, usuarios:false })
  }
  render() {
    return (
      <>
        <main>
          <Aside UserName={this.props.UserName} id='aside' classe='filhos' setMaquinas={this.setMaquinas} setOperadores={this.setOperadores} setUsuarios={this.setUsuarios} setAllFalse={this.setAllFalse}/>
          <Conteudo setMaquinas={this.state.maquinas} setOperadores={this.state.operadores} setUsuarios={this.state.usuarios} setAllFalse={this.setAllFalse} logout={this.props.logout}/>
        </main>
      </>
    );
  }
}
