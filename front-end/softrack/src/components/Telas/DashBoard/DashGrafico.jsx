import React, { Component } from "react"
import Api from "../../../api/Api";

export default class DashGrafico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stgrafico: [],
      valores: []
    }
  }
  componentDidMount() {
    Api.post('/consultar/DashGrafico.json').then((resposta) => {
      this.setState({ stgrafico: resposta.data })
    })
      .catch(err => { console.log(err) })
  }
  render() {
    /*const { stgrafico } = this.state*/
    return (
      <>
        {/*stgrafico.map((valor) => {
          return (<p>{valor.S_VALOR}</p>)
        })*/}
      </>
    );
  }
}