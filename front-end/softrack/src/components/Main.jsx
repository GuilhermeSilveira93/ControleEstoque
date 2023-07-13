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
      dashboard: false,
      relEntrada:false,
      relSaida:false
    }
    this.showEntrada = this.showEntrada.bind(this)
    this.showSaida = this.showSaida.bind(this)
    this.showEstoque = this.showEstoque.bind(this)
    this.showFornecedor = this.showFornecedor.bind(this)
    this.showProduto = this.showProduto.bind(this)
    this.showTipo = this.showTipo.bind(this)
    this.showDash = this.showDash.bind(this)
    this.showRelatorioEntrada = this.showRelatorioEntrada.bind(this)
    this.showRelatorioSaida = this.showRelatorioSaida.bind(this)
  }
  showDash() {
    this.setState({
      dashboard: true,
      entrada: false,
      saida: false,
      estoque: false,
      fornecedor: false,
      produto: false,
      tipo: false,
      relEntrada:false,
      relSaida:false
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
      tipo: false,
      relEntrada:false,
      relSaida:false
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
      tipo: false,
      relEntrada:false,
      relSaida:false
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
      tipo: false,
      relEntrada:false,
      relSaida:false
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
      tipo: false,
      relEntrada:false,
      relSaida:false
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
      tipo: false,
      relEntrada:false,
      relSaida:false
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
      tipo: true,
      relEntrada:false,
      relSaida:false
    })
  }
  showRelatorioEntrada(){
    this.setState({
      dashboard: false,
      entrada: false,
      saida: false,
      estoque: false,
      fornecedor: false,
      produto: false,
      tipo: false,
      relEntrada:true,
      relSaida:false
    })
  }
  showRelatorioSaida(){
    this.setState({
      dashboard: false,
      entrada: false,
      saida: false,
      estoque: false,
      fornecedor: false,
      produto: false,
      tipo: false,
      relEntrada:false,
      relSaida:true
    })
  }
  render() {
    const { entrada, saida, estoque, fornecedor, produto, tipo, dashboard,relEntrada,relSaida } = this.state
    const { direitos } = this.props
    return (
      <>
        <main>
          <Aside direitos={direitos}
                 showDash={this.showDash}
                 showEstoque={this.showEstoque}
                 showSaida={this.showSaida}
                 showEntrada={this.showEntrada}
                 logout={this.props.logout}
                 showFornecedor={this.showFornecedor}
                 showProduto={this.showProduto}
                 showTipo={this.showTipo}
                 showRelatorioEntrada={this.showRelatorioEntrada}
                 showRelatorioSaida={this.showRelatorioSaida}
                 UserName={this.props.UserName}
          />
          <Conteudo
                  dashboard={dashboard}
                  entrada={entrada}
                  saida={saida}
                  estoque={estoque}
                  fornecedor={fornecedor}
                  produto={produto}
                  tipo={tipo}
                  relEntrada={relEntrada}
                  relSaida={relSaida}
          />
        </main>
      </>
    );
  }
}
