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
      empresas: [],
      empresa: 0,
      clientes: [],
      cliente: 0,
      produtos: [],
      produto: 0,
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    const { inicio, fim, empresa, produto, cliente } = this.state;
    if (empresa !== prevState.empresa) {
      try {
        const responseClientes = await api.get('/consultaClientes.json', {
          params: {
            id_empresa: empresa,
          },
        });
        this.setState({ clientes: responseClientes.data });
      } catch (error) {
        console.log(error);
      }
    }
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
    if (produto !== prevState.produto || empresa !== prevState.empresa || cliente !== prevState.cliente || inicio !== prevState.inicio || fim !== prevState.fim) {
      try {
        await api.get('/relatorioSaida.json', {
          params: {
            inicio: inicio,
            fim: fim,
            empresa: empresa,
            cliente: cliente,
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
    const { inicio, fim, empresa, cliente, produto } = this.state
    try {
      const dadosRelatorio = await api.get('/relatorioSaida.json', {
        params: {
          inicio: inicio,
          fim: fim,
          empresa: empresa,
          cliente: cliente,
          produto: produto
        }
      })
      const responseEmpresas = await api.get('/consultaEmpresa.json');
      const responseProdutos = await api.get('/consultaProduto.json');
      this.setState({ empresas: responseEmpresas.data, produtos: responseProdutos.data, dados: dadosRelatorio.data });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { dados, empresa, empresas, cliente, clientes, produto, produtos } = this.state
    return (
      <>
        <Header titulo='Relatório de Saida' />
        <fieldset id="entradaMercadoria">
          <legend>Filtros Relatório de Saida</legend>
          <form id="entradaEstoque">
            <label htmlFor="Período">Período:</label>
            <input value={this.state.inicio} onChange={e => this.setState({ inicio: e.target.value })} type="date" name="Periodo" id="Inicio" /> a <input value={this.state.fim} onChange={e => this.setState({ fim: e.target.value })} type="date" name="Periodo" id="Fim" />
            <label htmlFor="empresa">Empresa: </label>
            <select name="empresa" value={empresa} id="empresa" onChange={(e) => { this.setState({ empresa: e.target.value }) }}>
              <option value="0">Selecione uma Empresa</option>
              {empresas ?
                empresas.map(empresa => {
                  return (
                    <option key={empresa.ID_EMPRESA} value={empresa.ID_EMPRESA}>{empresa.S_NOME}</option>
                  )
                })
                : ''}
            </select><br />
            <label htmlFor="cliente">Cliente: </label>
            <select name="cliente" id="cliente" value={cliente} onChange={(e) => { this.setState({ cliente: e.target.value }) }}>
              <option value="0">Selecione um Cliente</option>
              {clientes ?
                clientes.map(cliente => {
                  return (
                    <option key={cliente.ID_CLIENTE} value={cliente.ID_CLIENTE}>{cliente.S_NOME}</option>
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