import React, { Component } from "react"
import api from '../../../../api/Api';
import Header from "../Header";

export default class Produto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novoProduto: '',
      serial:'',
      produtos: [],
      tipos:[],
      idTipo:0,
      itens: []
    };
    this.montarTabela = this.montarTabela.bind(this)
    this.excluirItem = this.excluirItem.bind(this)
    this.cancelar = this.cancelar.bind(this)
    this.realizarEntrada = this.realizarEntrada.bind(this)
  }
  componentDidMount() {
    api
      .get('/consultaProduto.json').then((resposta) => {
        this.setState({ produtos: resposta.data })
      }).catch((erro) => { console.log(erro) })
      api
      .get('/consultaTipo.json').then((resposta) => {
        this.setState({ tipos: resposta.data })
      }).catch((erro) => { console.log(erro) })
  }
  excluirItem(index) {
    const { itens } = this.state
    this.setState({ itens: itens.filter(item => (item !== itens[index])) })
  }
  cancelar(e) {
    e.preventDefault();
    const escolha = window.confirm(`Deseja mesmo CANCELAR ?\nIsso irá Desfazer tudo!`)
    if (escolha) {
      this.setState({ itens: [] })
    }
  }
  montarTabela(e) {
    e.preventDefault();
    const { novoProduto, produtos,idTipo, itens,serial } = this.state
    let existente = false

    if (novoProduto !== '') {
      if (idTipo !== 0) {
      itens.forEach(valores => {
        if (valores.novoProduto === novoProduto) {
          existente = true
        }
      })
      produtos.forEach(valores => {
        if (valores.S_NOME === novoProduto) {
          existente = true
        }
      })
      if (!existente) {
        const dados = {
          novoProduto,
          serial,
          idTipo,
        }
        this.setState((prevState) => ({
          itens: [...prevState.itens, dados],
        }));
        this.setState({
          novoProduto: '',
          idTipo:0,
          serial:''
        });
      } else {
        window.alert('Produto já inserido ou cadastrado no sistema!')
      }
    }else{
      alert('Selecione o tipo do Produto')
    }
    } else {
      window.alert('Digite o nome de um Produto !')
    }


  }
  realizarEntrada(e) {
    e.preventDefault();
    const confirmacao = window.confirm(`Confirma a inclusão dos itens?`)
    if (confirmacao) {
      api
        .get('inclusaoProduto.json', {
          params: {
            itens: this.state.itens
          },
        })
        .then(() => {
          alert('Enviado')
          this.setState({itens:[]})
        })
        .catch((error) => alert(error));
    }
  };
  render() {
    const { itens, novoProduto, tipos,serial,idTipo } = this.state
    const { data } = this.props
    return (
      <>
        <Header titulo={'Cadastro de Produto'} />
        <fieldset id="entradaMercadoria">
          <legend>Cadastro de Produto</legend>
          <form id="entradaEstoque">
            <label htmlFor="Produto">Produto: </label>
            <input type="text" name="Produto" id="Produto" min={0} value={novoProduto} onChange={(e) => { this.setState({ novoProduto: e.target.value }) }} />
            <br />
            <label htmlFor="Serial">Serial: </label>
            <input type="text" name="Serial" id="Serial" min={0} value={serial} onChange={(e) => { this.setState({ serial: e.target.value }) }} />
            <br />
            <label htmlFor="Tipo">Tipo: </label>
            <select name="Tipo" id="Tipo" value={idTipo} onChange={(e) => { this.setState({ idTipo: e.target.value }) }}>
              <option value="">Selecione o Tipo do Produto</option>
              {tipos ?
                tipos.map(tipo => {
                  return (
                    <option key={tipo.ID_TIPO} value={tipo.ID_TIPO}>{tipo.S_NOME}</option>
                  )
                })
                : ''}
            </select><br />
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
                  <th>Serial</th>
                  <th>Apagar</th>
                </tr>
              </thead>
              : ''}
            <tbody>
              {itens.map((valores, index) => {
                return (
                  <tr key={index}>
                    <td>{valores.novoProduto}</td>
                    <td>{valores.serial}</td>
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