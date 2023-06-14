import React, { Component } from "react"
import api from '../../../../api/Api';
import Header from "../Header";

export default class Saida extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empresas:[],
      empresa:0,
      clientes:[],
      cliente:0,
      produtos: [],
      produto: 0,
      produtoNome: '',
      dimensoes: '',
      detalhes: '',
      valor: 0,
      quantidade: 0,
      quantidadeEstoque:0,
      itens: []
    };
    this.montarTabela = this.montarTabela.bind(this)
    this.excluirItem = this.excluirItem.bind(this)
    this.cancelar = this.cancelar.bind(this)
    this.realizarSaida = this.realizarSaida.bind(this)
  }
  componentDidUpdate(prevProps,prevState){
    const {empresa,produto} = this.state
    if (empresa !== prevState.empresa) {
      api
      .get('/consultaClientes.json',{
        params: {
          id_empresa: empresa,
        },
      }).then((resposta) => {
        this.setState({ clientes: resposta.data })
      }).catch((erro) => { console.log(erro) })
    }
    if (produto !== prevState.produto) {
      api
      .get('/consultaProduto.json',{
        params: {
          id_produto: produto,
        },
      }).then((resposta) => {
        this.setState({ quantidadeEstoque: resposta.data[0].QTD })
      }).catch((erro) => { console.log(erro) })
    }
  }
  componentDidMount() {
    api
      .get('/consultaEmpresa.json').then((resposta) => {
        this.setState({ empresas: resposta.data })
      }).catch((erro) => { console.log(erro) })
    api
      .get('/consultaProduto.json').then((resposta) => {
        this.setState({ produtos: resposta.data })
      }).catch((erro) => { console.log(erro) })
  }
  realizarSaida(e) {
    e.preventDefault();
    if (this.state.cliente !== 0) {
    const confirmacao = window.confirm(`Confirma a SAIDA dos itens?`)
    if (confirmacao) {
      api
        .get('saida.json', {
          params: {
            cliente: this.state.cliente,
            itens: this.state.itens
          },
        })
        .then(() => {
          alert('Enviado')
        })
        .catch((error) => alert(error));
    }
  }else{
    window.alert('Selecione um Cliente')
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
    const { produtoNome, produto, dimensoes, detalhes, valor, quantidade, itens,quantidadeEstoque } = this.state
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
      }else if (quantidade > quantidadeEstoque ) {
        window.alert(`Não tem estoque suficiente para realizar esta Saida\nQuantidade em estoque:${quantidadeEstoque}`)
      }else {
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
  render() {
    const {clientes, produtos, dimensoes, empresas, detalhes, valor, quantidade, itens } = this.state
    const { data } = this.props
    return (
      <>
        <Header titulo={'Saida de Estoque'} />
        <fieldset id="saidaMercadoria">
          <legend>Saida de Mercadoria</legend>
          <form id="saidaEstoqueForm">
          <label htmlFor="empresa">Empresa: </label>
            <select name="empresa" id="empresa">
              <option value="">Selecione uma Empresa</option>
              {empresas ?
                empresas.map(empresa => {
                  return (
                    <option key={empresa.ID_EMPRESA} value={empresa.ID_EMPRESA} onClick={(e) => { this.setState({ empresa: e.target.value }) }}>{empresa.S_NOME}</option>
                  )
                })
                : ''}
            </select><br />
            <label htmlFor="cliente">Cliente: </label>
            <select name="cliente" id="cliente">
              <option value="">Selecione um Cliente</option>
              {clientes ?
                clientes.map(cliente => {
                  return (
                    <option key={cliente.ID_CLIENTE} value={cliente.ID_CLIENTE} onClick={(e) => { this.setState({ cliente: e.target.value }) }}>{cliente.S_NOME}</option>
                  )
                })
                : ''}
            </select><br />
            <label htmlFor="Produto">Produto: </label>
            <select name="Produto" id="Produto">
              <option value="">Selecione um Produto</option>
              {produtos ?
                produtos.map(produtos => {
                  return (
                    <option key={produtos.ID_PRODUTO} value={produtos.ID_PRODUTO} onClick={(e) => { this.setState({ produto: e.target.value, produtoNome: produtos.S_NOME }) }}>{produtos.S_NOME}</option>
                  )
                })
                : ''}
            </select><br />
            <label htmlFor="Dimensoes">Dimensões: </label>
            <input type="text" name="Dimensoes" id="Dimensoes" min={0} value={dimensoes} onChange={(e) => { this.setState({ dimensoes: e.target.value }) }} />
            <label htmlFor="Detalhes">Detalhes: </label>
            <input type="text" name="Detalhes" id="Detalhes" min={0} value={detalhes} onChange={(e) => { this.setState({ detalhes: e.target.value }) }} />
            <label htmlFor="Valor">Valor: </label>
            <input type="text" name="Valor" id="Valor" min={0} value={valor} onChange={(e) => { this.setState({ valor: e.target.value }) }} onKeyDown={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }} />
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
            <button type="submit" onClick={this.realizarSaida}>Realizar saida</button>
            : ''}

      </>
    );
  }
}