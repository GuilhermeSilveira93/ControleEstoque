import React, { Component } from "react"
import api from '../../../../api/Api';
import Header from "../Header";

export default class Entrada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      produto: 1,
      dimensoes: '',
      fornecedores: [],
      fornecedor: 1,
      detalhes: '',
      valor: 0,
      quantidade: 0,
      itens: []
    };
    this.montarTabela = this.montarTabela.bind(this)
    this.excluirItem = this.excluirItem.bind(this)
    this.cancelar = this.cancelar.bind(this)
    this.realizarEntrada = this.realizarEntrada.bind(this)
  }
  componentDidMount() {
    api
      .get('/consultaTipo.json').then((resposta) => {
        this.setState({ produtos: resposta.data })
      }).catch((erro) => { console.log(erro) })
    api
      .get('/consultaFornecedor.json').then((resposta) => {
        this.setState({ fornecedores: resposta.data })
      }).catch((erro) => { console.log(erro) })
  }
  realizarEntrada(e) {
    e.preventDefault();
    const confirmacao = window.confirm(`Confirma a inclusão dos itens?`)
    if (confirmacao) {
      api
        .get('inclusao.json', {
          params: {
            itens: this.state.itens
          },
        })
        .then((resposta) => {
          alert('Enviado')
        })
        .catch((error) => alert(error));
    }
  };
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
      this.setState({ itens: [] })
    }
  }
  montarTabela(e) {
    e.preventDefault();
    const { produto, dimensoes, fornecedor, detalhes, valor, quantidade } = this.state
    const dados = {
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
      produto: "",
      dimensoes: 0,
      fornecedor: "",
      detalhes: "",
      valor: 0,
      quantidade: 0,
    });
  }
  render() {
    const { produtos, dimensoes, fornecedores, detalhes, valor, quantidade, itens } = this.state
    const { data } = this.props
    return (
      <>
        <Header titulo={'Saida de Estoque'} />
        <fieldset id="saidaMercadoria">
          <legend>Saida de Mercadoria</legend>
          <form id="saidaEstoqueForm">
            <label htmlFor="Produto">Produto: </label>
            <select name="Produto" id="Produto">
              {produtos ?
                produtos.map(produtos => {
                  return (
                    <option key={produtos.ID_TIPO} value={produtos.ID_TIPO} onClick={(e) => { this.setState({ produto: e.target.value }) }}>{produtos.S_NOME}</option>
                  )
                })
                : ''}
            </select><br />
            <label htmlFor="Dimensoes">Dimensões: </label>
            <input type="text" name="Dimensoes" id="Dimensoes" min={0} value={dimensoes} onChange={(e) => { this.setState({ dimensoes: e.target.value }) }} />
            <label htmlFor="Fornecedor">Fornecedor: </label>
            <select name="Fornecedor" id="Fornecedor">
              {fornecedores ?
                fornecedores.map(fornecedor => {
                  return (
                    <option key={fornecedor.ID_FORNECEDOR} value={fornecedor.ID_FORNECEDOR} onClick={(e) => { this.setState({ fornecedor: e.target.value }) }}>{fornecedor.S_NOME}</option>
                  )
                })
                : ''}
            </select><br />
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
        {
          this.state.itens[0] ?
            <button type="submit" onClick={this.realizarEntrada}>Realizar entrada</button>
            : ''}

      </>
    );
  }
}