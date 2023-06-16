import React, { Component } from "react"
import api from '../../../../api/Api';
import Header from "../Header";

export default class Fornecedor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novoFornecedor: '',
      fornecedores: [],
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
    const { novoFornecedor, fornecedores, itens } = this.state
    let existente = false

    if (novoFornecedor !== '') {
      itens.forEach(valores => {
        if (valores.novoFornecedor === novoFornecedor) {
          existente = true
        }
      })
      fornecedores.forEach(valores => {
        if (valores.S_NOME === novoFornecedor) {
          existente = true
        }
      })
      if (!existente) {
        const dados = {
          novoFornecedor,
        }
        this.setState((prevState) => ({
          itens: [...prevState.itens, dados],
        }));
        this.setState({
          novoFornecedor: '',
        });
      } else {
        window.alert('Fornecedor já inserido ou cadastrado no sistema!')
      }
    } else {
      window.alert('Digite o nome de um Fornecedor !')
    }


  }
  realizarEntrada(e) {
    e.preventDefault();
    const confirmacao = window.confirm(`Confirma a inclusão dos itens?`)
    if (confirmacao) {
      api
        .get('inclusaoFornecedor.json', {
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
    const { itens, novoFornecedor } = this.state
    const { data } = this.props
    return (
      <>
        <Header titulo={'Cadastro de Fornecedor'} />
        <fieldset id="entradaMercadoria">
          <legend>Cadastro de Fornecedor</legend>
          <form id="entradaEstoque">
            <label htmlFor="Fornecedor">Fornecedor: </label>
            <input type="text" name="Fornecedor" id="Fornecedor" min={0} value={novoFornecedor} onChange={(e) => { this.setState({ novoFornecedor: e.target.value }) }} />
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
                  <th>Fornecedor</th>
                </tr>
              </thead>
              : ''}
            <tbody>
              {itens.map((valores, index) => {
                return (
                  <tr key={index}>
                    <td>{valores.novoFornecedor}</td>
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