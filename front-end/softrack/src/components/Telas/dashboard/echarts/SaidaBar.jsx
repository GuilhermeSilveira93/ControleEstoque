import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';
import api from '../../../../api/Api'

export default class SaidaBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dados: []
    };
  }

  componentDidMount() {
    api
      .get('/saidaBar.json')
      .then(resposta => {
        this.setState({ dados: resposta.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { dados } = this.state;
    const movimentacoes = [[], []];
    dados.forEach(produtos => {
      movimentacoes[0].push(produtos.PRODUTO);
      movimentacoes[1].push(produtos.QUANTIDADE);
    });

    const options = {
      grid: {
        width: "92%",
        left: "6.7%",
        top: "40px",
        height: "62%",
        pIntencidadeding: "0px"
      },
      title: {
        text: 'Grafico de Saida',
        link: '',
        textStyle: {
          color: "#ffffff"
        }
      },
      legend: {
        right: '0px',
        textStyle: {
          color: "#ffffff"
        }
      },
      tooltip: {},
      xAxis: {
        data: movimentacoes[0]
      },
      yAxis: {},
      series: [
        {
          name: 'Material',
          stack: 'Intencidade',
          emphasis: {
            focus: 'series'
          },
          type: 'bar',
          backgroundStyle: {
            color: '#ffffff'
          },
          data: movimentacoes[1]
        },
      ],
      dataZoom: [
        {
          id: 'dataZoomX',
          type: 'slider',
          start: 0,
          end: 70,
          maxSpan: 70,
          xAxisIndex: 0,
          filterMode: 'filter',
          height: '22px',
          top: "85%"
        }

      ]
    }
    return (
    <ReactECharts
      option={options}
      style={{ width: '100%', height: '100%' }} />
      )
  }
}