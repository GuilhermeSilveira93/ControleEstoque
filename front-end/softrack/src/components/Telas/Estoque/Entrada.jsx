import React, { Component } from "react"
import api from '../../../api/Api';
import Header from "../../Header";
import { NumericFormat } from 'react-number-format';

export default class Entrada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: [],
      produto: 0,
      produtoNome: '',
      dimensoes: '',
      fornecedores: [],
      fornecedor: 0,
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
      .get('/consultaFornecedor.json').then((resposta) => {
        this.setState({ fornecedores: resposta.data })
      }).catch((erro) => { console.log(erro) })
    api
      .get('/consultaProduto.json').then((resposta) => {
        this.setState({ produtos: resposta.data })
      }).catch((erro) => { console.log(erro) })
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
      this.setState({ itens: [] })
    }
  }
  montarTabela(e) {
    e.preventDefault();
    const { produtoNome, produto, dimensoes, detalhes, valor, quantidade, itens } = this.state
    console.log(valor)
    if (produto !== 0) {
    let existente = false
    itens.forEach(valores => {
      if (valores.produtoNome === produtoNome) {
        existente = true
      }
    })
    if (!existente) {
      if (quantidade === 0) {
        window.alert('Quantidade deve ser maior que 0')
      } else {
        const dados = {
          produtoNome,
          produto,
          dimensoes,
          detalhes,
          valor,
          quantidade,
        }
        this.setState((prevState) => ({
          itens: [...prevState.itens, dados],
        }));
        this.setState({
          produtoNome: '',
          produto: 0,
          dimensoes: 0,
          detalhes: "",
          valor: 0,
          quantidade: 0,
        });
      }
    } else {
      window.alert('Produto já inserido !')
    }
  }else{
    window.alert('Selecione um Produto !')
  }
  }
  realizarEntrada(e) {
    e.preventDefault();
    if (this.state.fornecedor !== 0) {
    const confirmacao = window.confirm(`Confirma a inclusão dos itens?`)
    if (confirmacao) {
      api
        .get('inclusao.json', {
          params: {
            fornecedor: this.state.fornecedor,
            itens: this.state.itens
          },
        })
        .then(() => {
          alert('Enviado')
          this.setState({itens:[]})
        })
        .catch((error) => alert(error));
    }
  }else{
    window.alert('Selecione um Fornecedor')
  }
  };
  render() {
    const { produtos, dimensoes, fornecedores, detalhes, valor, quantidade, itens,produto,fornecedor } = this.state
    const { data } = this.props
    return (
      <>
        <Header titulo={'Entrada de Estoque'} />
        <fieldset id="entradaMercadoria">
          <legend>Entrada de Mercadoria</legend>
          <form id="entradaEstoque">
          <label htmlFor="Fornecedor">Fornecedor: </label>
            <select name="Fornecedor" value={fornecedor} id="Fornecedor" onChange={(e) => { this.setState({ fornecedor: e.target.value }) }}>
              <option value="">Selecione um Fornecedor</option>
              {fornecedores ?
                fornecedores.map(fornecedor => {
                  return (
                    <option key={fornecedor.ID_FORNECEDOR} value={fornecedor.ID_FORNECEDOR}>{fornecedor.S_NOME}</option>
                  )
                })
                : ''}
            </select><br />
            <label htmlFor="Produto">Produto: </label>
            <select name="Produto" id="Produto" value={produto} onChange={(e) => {this.setState({ produto: e.target.value, produtoNome: e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text}) }}>
              <option value="">Selecione um Produto</option>
              {produtos ?
                produtos.map(produtos => {
                  return (
                    <option key={produtos.ID_PRODUTO} value={produtos.ID_PRODUTO}  >{produtos.S_NOME}</option>
                  )
                })
                : ''}
            </select><br />
            <label htmlFor="Dimensoes">Dimensões: </label>
            <input type="text" name="Dimensoes" id="Dimensoes" min={0} value={dimensoes} onChange={(e) => { this.setState({ dimensoes: e.target.value }) }} />
            <label htmlFor="Detalhes">Detalhes: </label>
            <input type="text" name="Detalhes" id="Detalhes" min={0} value={detalhes} onChange={(e) => { this.setState({ detalhes: e.target.value }) }} />
            <label htmlFor="Valor">Valor: </label>
            <NumericFormat value={valor} onChange={(e) => this.setState({ valor: e.target.value })}
              thousandSeparator={true} prefix={'R$'} decimalScale={2} fixedDecimalScale={true}
            />
            <br />
            <label htmlFor="Quantidade">Quantidade: </label>
            <input type="text" name="Quantidade" id="Quantidade" min={0} value={quantidade} onChange={(e) => { this.setState({ quantidade: e.target.value }) }} onKeyDown={(e) => {
              if (!/[0-9]/.test(e.key) && 'Backspace' !== e.key && 'ArrowLeft' !== e.key && 'ArrowRight' !== e.key) {
                e.preventDefault();
              }
            }} />
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
                    <td>{valores.produtoNome}</td>
                    <td>{valores.dimensoes}</td>
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