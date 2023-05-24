import React, { Component } from "react"
//import api from '../../../../api/Api';
import Header from "../Header";

export default class Entrada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      produto: '',
      dimensoes: '',
      fornecedor: '',
      detalhes: '',
      valor: '',
      quantidade: '',
      itens: []
    };
    this.montarTabela = this.montarTabela.bind(this)
    this.excluirItem = this.excluirItem.bind(this)
    this.cancelar = this.cancelar.bind(this)
  }
  componentDidMount() {
    /*api
      .post('consultar/tabelaveiculos.json', {
        params: {
          idUsuario: JSON.parse(sessionStorage.getItem('Usuario')),
        },
      })
      .then((resposta) => {
        this.setState({ tabelaVeiculo: resposta.data });
      })
      .catch((error) => console.log(error));*/
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.itens !== prevState.itens) {
      this.setState({ itens: this.state.itens });
    }
  }
  excluirItem(index) {
    const { itens } = this.state
    this.setState({ itens: itens.filter(item => (item !== itens[index])) })
  }
  cancelar(e) {
    e.preventDefault();
    if (this.state.itens > 0) {
      
    }
    const escolha = window.confirm(`Deseja mesmo CANCELAR ?\nIsso irá Desfazer tudo!`)
    if (escolha) {
      this.setState({itens:[]})
    }
  }
  montarTabela(e) {
    e.preventDefault();
    const { codigo, produto, dimensoes, fornecedor, detalhes, valor, quantidade } = this.state
    const dados = {
      codigo,
      produto,
      dimensoes,
      fornecedor,
      detalhes,
      valor,
      quantidade,
    }
    this.setState((prevState) => ({
      itens: [...prevState.itens, dados],
    }));
    this.setState({
      codigo: "",
      produto: "",
      dimensoes: "",
      fornecedor: "",
      detalhes: "",
      valor: "",
      quantidade: "",
    });
  }
  render() {
    const { codigo, produto, dimensoes, fornecedor, detalhes, valor, quantidade, itens } = this.state
    const { data } = this.props
    return (
      <>
        <Header titulo={'Entrada de Estoque'} />
        <fieldset id="entradaMercadoria">
          <legend>Entrada de Mercadoria</legend>
          <form id="entradaEstoque">
            <label htmlFor="Codigo">Codigo: </label>
            <input type="text" name="Codigo" id="Codigo" min={0} value={codigo} onChange={(e) => { this.setState({ codigo: e.target.value }) }} />
            <label htmlFor="Produto">Produto: </label>
            <input type="text" name="Produto" id="Produto" min={0} value={produto} onChange={(e) => { this.setState({ produto: e.target.value }) }} />
            <label htmlFor="Dimensoes">Dimensões: </label>
            <input type="text" name="Dimensoes" id="Dimensoes" min={0} value={dimensoes} onChange={(e) => { this.setState({ dimensoes: e.target.value }) }} />
            <label htmlFor="Fornecedor">Fornecedor: </label>
            <input type="text" name="Fornecedor" id="Fornecedor" min={0} value={fornecedor} onChange={(e) => { this.setState({ fornecedor: e.target.value }) }} />
            <label htmlFor="Detalhes">Detalhes: </label>
            <input type="text" name="Detalhes" id="Detalhes" min={0} value={detalhes} onChange={(e) => { this.setState({ detalhes: e.target.value }) }} />
            <label htmlFor="Valor">Valor: </label>
            <input type="text" name="Valor" id="Valor" min={0} value={valor} onChange={(e) => { this.setState({ valor: e.target.value }) }} />
            <label htmlFor="Quantidade">Quantidade: </label>
            <input type="text" name="Quantidade" id="Quantidade" min={0} value={quantidade} onChange={(e) => { this.setState({ quantidade: e.target.value }) }} />
            <label htmlFor="Data">Data: </label>
            <p>{data}</p>
            <button type="submit" id="Enviar" onClick={
              this.montarTabela
            }>Enviar</button>
            <button onClick={this.cancelar}>cancelar</button>
          </form>
        </fieldset>
        <section>
        </section>
        <div id="tabela">
          <table border={1} id="tabelaEntrada">
            {itens.length > 0 ?
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Produto</th>
                  <th>Dimensoes</th>
                  <th>Fornecedor</th>
                  <th>Detalhes</th>
                  <th>Valor</th>
                  <th>Quantidade</th>
                  <th>Apagar</th>
                </tr>
              </thead>
              : ''}
            <tbody>
              {itens.map((valores, index) => {
                return (
                  <tr key={index}>
                    <td>{valores.codigo}</td>
                    <td>{valores.produto}</td>
                    <td>{valores.dimensoes}</td>
                    <td>{valores.fornecedor}</td>
                    <td>{valores.detalhes}</td>
                    <td>{valores.valor}</td>
                    <td>{valores.quantidade}</td>
                    <td style={{ cursor: 'pointer' }} onClick={() => this.excluirItem(index)}>Excluir</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}