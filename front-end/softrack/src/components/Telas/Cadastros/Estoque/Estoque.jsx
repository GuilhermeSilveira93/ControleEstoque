import React, { Component } from "react"
import { Grid } from 'gridjs-react';
import api from '../../../../api/Api';
import Header from "../Header";

export default class Estoque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: [[], []],
    };
  }
  componentDidMount() {
    api.get('/consultaProduto.json')
      .then(resposta => {
        this.setState({ produtos: resposta.data })
      })
      .catch(error => console.log(error))
  };
  render() {
    const { produtos } = this.state
    const dados = []
    produtos.forEach(valores => {
      dados.push([valores.S_NOME, valores.QTD])
    });
    console.log(dados)
    return (
      <>
        <Header titulo={'Estoque Atual'} />
        <Grid
          data={dados}
          columns={['Produto', 'Quantidade']}
          search={true}
          pagination={{
            limit: 10,
          }}
          language={{
            search: {
              placeholder: '🔍 Busca...'
            },
            pagination: {
              previous: '⬅️',
              next: '➡️',
              showing: 'Mostrando',
              results: () => 'Itens'
            },
          }
          }
          style={{
            td: {
              color: 'black',
              backgroundColor: '#ccc',
              border: '1px solid black'
            },
            table: {
              'font-size': '15px'
            }
          }
          }
        />
      </>
    );
  }
}