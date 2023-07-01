import React, { Component } from 'react';
import Aside from "./Telas/aside/Aside";
import Conteudo from './Conteudo';
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entrada: false,
      saida: false,
      estoque: false,
      fornecedor: false,
      produto: false,
      dashboard: false
    }
    this.showEntrada = this.showEntrada.bind(this)
    this.showSaida = this.showSaida.bind(this)
    this.showEstoque = this.showEstoque.bind(this)
    this.showFornecedor = this.showFornecedor.bind(this)
    this.showProduto = this.showProduto.bind(this)
    this.showTipo = this.showTipo.bind(this)
    this.showDash = this.showDash.bind(this)
  }
  showDash() {
    this.setState({
      dashboard: true,
      entrada: false,
      saida: false,
      estoque: false,
      fornecedor: false,
      produto: false,
      tipo: false
    })
  }
  showEntrada() {
    this.setState({
      dashboard: false,
      entrada: true,
      saida: false,
      estoque: false,
      fornecedor: false,
      produto: false,
      tipo: false
    })
  }
  showSaida() {
    this.setState({
      dashboard: false,
      entrada: false,
      saida: true,
      estoque: false,
      fornecedor: false,
      produto: false,
      tipo: false
    })
  }
  showEstoque() {
    this.setState({
      dashboard: false,
      entrada: false,
      saida: false,
      estoque: true,
      fornecedor: false,
      produto: false,
      tipo: false
    })
  }
  showFornecedor() {
    this.setState({
      dashboard: false,
      entrada: false,
      saida: false,
      estoque: false,
      fornecedor: true,
      produto: false,
      tipo: false
    })
  }
  showProduto() {
    this.setState({
      dashboard: false,
      entrada: false,
      saida: false,
      estoque: false,
      fornecedor: false,
      produto: true,
      tipo: false
    })
  }
  showTipo() {
    this.setState({
      dashboard: false,
      entrada: false,
      saida: false,
      estoque: false,
      fornecedor: false,
      produto: false,
      tipo: true
    })
  }
  render() {
    const { entrada, saida, estoque, fornecedor, produto, tipo, dashboard } = this.state
    const { direitos } = this.props
    return (
      <>
        <main>
          <Aside direitos={direitos} showDash={this.showDash} showEstoque={this.showEstoque} showSaida={this.showSaida} showEntrada={this.showEntrada} logout={this.props.logout}
            showFornecedor={this.showFornecedor} showProduto={this.showProduto} showTipo={this.showTipo} UserName={this.props.UserName} />
          <Conteudo dashboard={dashboard} entrada={entrada} saida={saida} estoque={estoque} fornecedor={fornecedor} produto={produto} tipo={tipo} />
        </main>
      </>
    );
  }
}
