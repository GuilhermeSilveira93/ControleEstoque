import React, { Component } from "react"
import api from '../../../../api/Api';
import Header from "../Header";

export default class Tipo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novoTipo: '',
      tipos: [],
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
    const { novoTipo, tipos, itens } = this.state
    let existente = false

    if (novoTipo !== '') {
      itens.forEach(valores => {
        if (valores.novoTipo === novoTipo) {
          existente = true
        }
      })
      tipos.forEach(valores => {
        if (valores.S_NOME === novoTipo) {
          existente = true
        }
      })
      if (!existente) {
        const dados = {
          novoTipo,
        }
        this.setState((prevState) => ({
          itens: [...prevState.itens, dados],
        }));
        this.setState({
          novoTipo: '',
        });
      } else {
        window.alert('Tipo já inserido ou cadastrado no sistema!')
      }
    } else {
      window.alert('Digite o nome do tipo de Produto!')
    }


  }
  realizarEntrada(e) {
    e.preventDefault();
    const confirmacao = window.confirm(`Confirma a inclusão dos itens?`)
    if (confirmacao) {
      api
        .get('inclusaoTipo.json', {
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
    const { itens, novoTipo } = this.state
    const { data } = this.props
    return (
      <>
        <Header titulo={'Cadastro Tipo de Produto'} />
        <fieldset id="entradaMercadoria">
          <legend>Cadastro Tipo de Produto</legend>
          <form id="entradaEstoque">
            <label htmlFor="Tipo">Tipo: </label>
            <input type="text" name="Tipo" id="Tipo" min={0} value={novoTipo} onChange={(e) => { this.setState({ novoTipo: e.target.value }) }} />
            <br />
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
                  <th>Tipo</th>
                </tr>
              </thead>
              : ''}
            <tbody>
              {itens.map((valores, index) => {
                return (
                  <tr key={index}>
                    <td>{valores.novoTipo}</td>
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