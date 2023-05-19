import { Component } from 'react';
import api from '../../../../api/Api';
import Export from "../../../relatorios/ExportTelasCadastro";

export default class TabelaUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabelaUsuario: [],
    };
  }
  componentDidMount() {
    api
      .post('consultar/tabelausuarios.json', {
        params: {
          idUsuario: JSON.parse(sessionStorage.getItem('Usuario')),
        },
      })
      .then((resposta) => {
        this.setState({ tabelaUsuario: resposta.data });
      })
      .catch((error) => console.log(error));
  };
  render() {
    const { tabelaUsuario } = this.state;
    return (
      <section id="Tabela" className="filhos">
        <h2>Cadastro de Usuários</h2>
        {/*BOTÃO EXPORT PDF*/
          tabelaUsuario.length > 0 ?
            <Export
            name={`Relatório de Usuários`} dados={tabelaUsuario} />
            : ''
        }
        <div className="teste" style={{ overflowy: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-Mail</th>
                <th>Cargo</th>
                <th>Grupo</th>
                <th>Tela Inicial</th>
                <th>Ativo?</th>
              </tr>
            </thead>
            <tbody>
              {tabelaUsuario.length > 0 ? (
                tabelaUsuario.map((usuario) => {
                  return (
                    <tr key={usuario.ID_USUARIO} id={usuario.ID_USUARIO}>
                      <th>{usuario.NOME}</th>
                      <th>{usuario["E-Mail"]}</th>
                      <th>{usuario.CARGO}</th>
                      <th>{usuario.GRUPO}</th>
                      <th>{usuario["Tela Inicial"]}</th>
                      <th>{usuario.Ativo === 'S' ? 'Sim' : 'Não'}</th>
                    </tr>
                  );
                })
              ) : (
                <th></th>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}