import React, { Component } from "react"
import api from '../../../../api/Api';
import Header from "../../Header";

export default class Entrada extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    api
      .post('consultar/tabelaveiculos.json', {
        params: {
          idUsuario: JSON.parse(sessionStorage.getItem('Usuario')),
        },
      })
      .then((resposta) => {
        this.setState({ tabelaVeiculo: resposta.data });
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <>
      <Header titulo={'Entrada de Estoque'}/>
      <form id="entradaEstoque">
        <label htmlFor="">Quantidade</label>
        <input type="number" name="quantidade" id="quantidade" min={0} />
        <label htmlFor="">tipo</label>
        <input type="number" name="tipo" id="tipo" min={0} />
      </form>
      </>
    );
  }
}