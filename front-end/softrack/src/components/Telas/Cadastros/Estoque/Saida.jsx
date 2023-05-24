import React, { Component } from "react"
import api from '../../../../api/Api';
import Header from "../Header";

export default class Saida extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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
  render() {
    return (
      <Header titulo={'Saida de Estoque'}/>
    );
  }
}