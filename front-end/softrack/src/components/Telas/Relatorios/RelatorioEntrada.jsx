import React, { Component } from "react";
import Header from "../../Header";
import RelatorioEntradaSaida from "./ExportTelasCadastro";
import api from "../../../api/Api";

export default class RelatorioSaida extends Component {
  constructor(props) {
    super(props)
    this.date = new Date()
    this.dia = this.date.getDate()
    this.mes = this.date.getMonth() + 1
    this.ano = this.date.getFullYear()
    this.state = {
      inicio: `${this.ano}-${this.mes - 1 < 10 ? `0${this.mes - 1}` : this.mes - 1}-${this.dia < 10 ? `0${this.dia}` : this.dia}`,
      fim: `${this.ano}-${this.mes < 10 ? `0${this.mes}` : this.mes}-${this.dia < 10 ? `0${this.dia}` : this.dia}`,
      dados: [],
      fornecedores:[],
      fornecedor:0,
      produtos: [],
      produto: 0,
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    const { inicio, fim, produto, fornecedor } = this.state;
    if (produto !== prevState.produto) {
      try {
        const responseProduto = await api.get('/consultaProduto.json', {
          params: {
            id_produto: produto,
          },
        });
        this.setState({ quantidadeEstoque: responseProduto.data[0]?.QTD });
      } catch (error) {
        console.log(error);
      }
    }
    if (produto !== prevState.produto || inicio !== prevState.inicio || fim !== prevState.fim || fornecedor !== prevState.fornecedor) {
      try {
        await api.get('/relatorioEntrada.json', {
          params: {
            inicio: inicio,
            fim: fim,
            fornecedor: fornecedor,
            produto: produto
          }
        }).then(resposta => {
          this.setState({ dados: resposta.data })
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
  async componentDidMount() {
    const { inicio, fim, fornecedor ,produto } = this.state
    try {
      const dadosRelatorio = await api.get('/relatorioEntrada.json', {
        params: {
          inicio: inicio,
          fim: fim,
          fornecedor: fornecedor,
          produto: produto
        }
      })
      const responseFornecedor = await api.get('/consultaFornecedor.json');
      const responseProdutos = await api.get('/consultaProduto.json');
      this.setState({ fornecedores: responseFornecedor.data, produtos: responseProdutos.data, dados: dadosRelatorio.data });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { dados, fornecedores, fornecedor, produto, produtos } = this.state
    return (
      <>
        <Header titulo='Relatório de Entrada' />
        <fieldset id="entradaMercadoria">
          <legend>Filtros Relatório de Entrada</legend>
          <form id="entradaEstoque">
            <label htmlFor="Período">Período:</label>
            <input value={this.state.inicio} onChange={e => this.setState({ inicio: e.target.value })} type="date" name="Periodo" id="Inicio" /> a <input value={this.state.fim} onChange={e => this.setState({ fim: e.target.value })} type="date" name="Periodo" id="Fim" />
            <label htmlFor="fornecedor">Fornecedor: </label>
            <select name="fornecedor" value={fornecedor} id="fornecedor" onChange={(e) => { this.setState({ fornecedor: e.target.value }) }}>
              <option value="0">Selecione um Fornecedor</option>
              {fornecedores ?
                fornecedores.map(fornecedor => {
                  return (
                    <option key={fornecedor.ID_FORNECEDOR} value={fornecedor.ID_FORNECEDOR}>{fornecedor.S_NOME}</option>
                  )
                })
                : ''}
            </select><br />
            
            <label htmlFor="Produto">Produto: </label>
            <select name="Produto" id="Produto" value={produto} onChange={(e) => { this.setState({ produto: e.target.value, produtoNome: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text }) }}>
              <option value="0">Selecione um Produto</option>
              {produtos ?
                produtos.map(produtos => {
                  return (
                    <option key={produtos.ID_PRODUTO} value={produtos.ID_PRODUTO}>{produtos.S_NOME}</option>
                  )
                })
                : ''}
            </select><br />
            <RelatorioEntradaSaida dados={dados} name={'Relatório de Saida'} />
          </form>
        </fieldset>
      </>
    )
  }
}