import React, { Component } from 'react';
import Aside from "./Telas/aside/Aside";
import Conteudo from './Conteudo';
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entrada:false,
      saida:false,
      estoque:false,
    }
    this.showEntrada = this.showEntrada.bind(this)
    this.showSaida = this.showSaida.bind(this)
    this.showEstoque = this.showEstoque.bind(this)
  }
  showEntrada(){
    this.setState({
      entrada:true,
      saida:false,
      estoque:false
    })
  }
  showSaida(){
    this.setState({
      entrada:false,
      saida:true,
      estoque:false
    })
  }
  showEstoque(){
    this.setState({
      entrada:false,
      saida:false,
      estoque:true
    })
  }
  render() {
    const {entrada,saida,estoque} = this.state
    return (
      <>
        <main>
          <Aside showEstoque={this.showEstoque} showSaida={this.showSaida} showEntrada={this.showEntrada}/>
          <Conteudo entrada={entrada} saida={saida} estoque={estoque}/>
        </main>
      </>
    );
  }
}
