import React, { Component } from "react"
import api from '../../../../api/Api';
import EditaMaquinas from './EditaMaquinas'
import Export from "../../../relatorios/ExportTelasCadastro";

export default class TabelaMaquinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelaVeiculo: [],
      janelaEditaMaquinas: false,
      idVeiculo: 0,
      Hrs_Trabalho: '',
      horimetro: '',
      numeroFrota: '',
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
    let tabelaMaquinaValores = {}
    tabelaMaquinaValores = this.state.tabelaVeiculo.length > 0 ? Object.keys(this.state.tabelaVeiculo[0]) : ['Listando Máquinas...']
    return (
      <section id="Tabela" className="filhos">
        <h2>Cadastro de Máquinas</h2>
        <Export name={`Relatório de Máquinas`} dados={this.state.tabelaVeiculo} />
        <div className="teste" style={{ overflowy: 'auto' }}>
          {tabelaMaquinaValores.length > 0 ?
            <table>
              <thead>
                <tr>
                  {tabelaMaquinaValores.length > 0 ?
                    tabelaMaquinaValores.map(coluna =>
                      coluna !== 'ID_VEICULO' ? (coluna === 'Ativo' ? <th key={coluna.replaceAll("[' ]", "")}>Ativo?</th>
                        : <th key={coluna.replaceAll("[' ]", "")}>{coluna.replaceAll("'", "")}</th>) : <th key={coluna.replaceAll("[' ]", "")} style={{ display: 'none' }}></th>
                    )
                    : <th key={'vazioHeader'}></th>}
                </tr>
              </thead>
              <tbody>
                {this.state.tabelaVeiculo.length > 0 ? (
                  this.state.tabelaVeiculo.map((veiculo) => {
                    return (
                      <tr key={veiculo.ID_VEICULO} id={veiculo.ID_VEICULO} onClick={() => {
                        this.setState({
                          idVeiculo: veiculo.ID_VEICULO,
                          horimetro: veiculo['Horímetro'],
                          numeroFrota: veiculo['Número da Frota'],
                          Hrs_Trabalho: veiculo['Horas de Trabalho'],
                          janelaEditaMaquinas: true
                        })
                      }}>
                        {
                          tabelaMaquinaValores.length > 0 ? tabelaMaquinaValores.map(coluna =>
                            (coluna !== 'ID_VEICULO') ?
                              <th key={veiculo['ID_VEICULO'] + coluna}>{veiculo[coluna] === 'S' ? 'Sim' : veiculo[coluna] === 'N' ? 'Não' : veiculo[coluna] === 'null' ? '' : veiculo[coluna]}</th>
                              :
                              <th key={veiculo['ID_VEICULO'] + coluna} style={{ display: 'none' }}></th>
                          ) :
                            <th key={'VazioBody'}></th>}
                      </tr>
                    );
                  })
                ) : (
                  <tr key={'ListandoMaquinas'}><td>Listando Máquinas...</td></tr>
                )}
              </tbody>
            </table>
            : ''}
        </div>
        {this.state.janelaEditaMaquinas === true ?
          <EditaMaquinas Maquina={this.state.numeroFrota} id_Veiculo={this.state.idVeiculo} btnFechar={() => { this.setState({ janelaEditaMaquinas: false }) }} /> : ''}
      </section>
    );
  }
}