import React, { Component } from "react"
import api from '../../../../api/Api';

export default class EditaMaquinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeMaquina: '',
      id_veiculo: 0,
      Hrs_Trabalho: '',
      horimetro: '',
      numeroFrota: '',
    }
  }
  componentDidMount() {
    api
      .post('/consultar/consultaveiculoatualiza.json', {
        params: {
          id_veiculo: this.props.id_Veiculo,
        },
      })
      .then(async (resposta) => {
        const dadosMaquina = await resposta.data[0]
        this.setState({
          nomeMaquina: dadosMaquina.S_NUMERO_FROTA,
          Hrs_Trabalho: dadosMaquina.N_HORAS_TRABALHO,
          horimetro: dadosMaquina.N_HORIMETRO,
          numeroFrota: dadosMaquina.S_NUMERO_FROTA,
          id_veiculo: this.props.id_Veiculo,
        })
      })
      .catch((error) => console.log(error));
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.id_veiculo !== prevProps.id_veiculo && this.props.id_Veiculo !== 0) {
      this.setState({ id_veiculo: this.props.id_Veiculo });
    }
  }
  render() {
    return (
        <div id="edita_Maquinas">
          <header>
            <h1>Maquina: {this.state.nomeMaquina}</h1>
          </header>
          <form>
            <label htmlFor="Hrs_Trabalho">Horas de Trabalho</label>
            <input
              type="number"
              max={24}
              min={0}
              id="Hrs_Trabalho"
              value={this.state.Hrs_Trabalho}
              onChange={() => {
                this.setState({ Hrs_Trabalho: this.value })
                console.log(this.Hrs_Trabalho)
              }} />

            <label htmlFor="horimetro">Horimetro</label>
            <input
              type="number"
              id="horimetro"
              value={this.state.horimetro}
              onChange={() => this.setState({ horimetro: this.value })} />

            <label htmlFor="numeroFrota">Nome da Frota</label>
            <input
              type="text"
              id="numeroFrota"
              value={this.state.numeroFrota}
              onChange={() => this.setState({ numeroFrota: this.value })} />
            <button onClick={this.props.btnFechar}>Fechar</button>
            {clearInterval()}
          </form>
        </div>
    );
  }

}