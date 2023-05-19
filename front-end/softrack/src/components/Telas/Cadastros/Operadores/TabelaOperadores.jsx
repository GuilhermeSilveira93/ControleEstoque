import React, { Component } from "react"
import api from '../../../../api/Api';
import Export from "../../../relatorios/ExportTelasCadastro";

export default class TabelaOperadores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelaMotorista: [],
      editaOperadores: false
    }
  }
  componentDidMount() {
    api
      .post('/consultar/tabelamotoristas.json', {
        params: {
          idUsuario: JSON.parse(sessionStorage.getItem('Usuario')),
        },
      })
      .then((resposta) => {
        this.setState({ tabelaMotorista: resposta.data });
      })
      .catch((error) => console.log(error));
  };
  render() {
    const { tabelaMotorista } = this.state;
    return (
      <section id="Tabela" className="filhos">
        <h2>Cadastro de Operadores</h2>
        <Export name={`Relatório de Operadores`} dados={tabelaMotorista}/>
        <div style={{ overflowy: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Início Turno</th>
                <th>Fim Turno</th>
                <th>Nº Identificação</th>
                <th>Usa Todos Máquinas?</th>
                <th>Ativo?</th>
                <th>Gestor</th>
                <th>Unidade</th>
              </tr>
            </thead>
            <tbody >
              {tabelaMotorista ? (
                tabelaMotorista.map((motorista) => {
                  return (
                    motorista.S_NOME !== 'Sem Operador' ?
                      <tr key={motorista.ID_MOTORISTA} id={motorista.ID_MOTORISTA}>
                        <th>{motorista.NOME}</th>
                        <th>{motorista['Início Turno']}</th>
                        <th>{motorista['Fim Turno']}</th>
                        <th>{motorista['Nº Identificação']}</th>
                        <th>{motorista['Usa Todos Máquinas'] === 'S' ? ('Sim') : 'Não'}</th>
                        <th>{motorista.S_ATIVO === 'S' ? ('Sim') : 'Não'}</th>
                        <th>{motorista.GESTOR === 'S' ? ('Sim') : 'Não'}</th>
                        <th>{motorista.UNIDADE}</th>
                      </tr> : ''
                  );
                })
              ) : (
                'Erro'
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}