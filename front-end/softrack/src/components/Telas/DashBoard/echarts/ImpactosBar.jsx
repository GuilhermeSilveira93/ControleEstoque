import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';
import api from '../../../../api/Api';

export default class ImpactosBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      impactos: []
    };
  }

  componentDidMount() {
    api
      .post('/consultar/impactos.json', {
        params: {
          idUsuario: JSON.parse(sessionStorage.getItem('Usuario'))
        }
      })
      .then(resposta => {
        this.setState({ impactos: resposta.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { impactos } = this.state;
    const impactoPorMaquina = [[], [], [], []];
    impactos.forEach(impacto => {
      impactoPorMaquina[0].push(impacto.LEVES);
      impactoPorMaquina[1].push(impacto.MEDIOS);
      impactoPorMaquina[2].push(impacto.FORTES);
      impactoPorMaquina[3].push(impacto.FROTA);
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
        text: 'Grafico de Impactos',
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
        data: impactoPorMaquina[3]
      },
      yAxis: {},
      series: [
        {
          name: 'Impactos Leves',
          color: '#9bba59',
          stack: 'Intencidade',
          emphasis: {
            focus: 'series'
          },
          type: 'bar',
          backgroundStyle: {
            color: '#ffffff'
          },
          data: impactoPorMaquina[0]
        },
        {
          name: 'Impactos Medios',
          color: '#ffff00',
          stack: 'Intencidade',
          emphasis: {
            focus: 'series'
          },
          type: 'bar',
          backgroundStyle: {
            color: '#ffffff'
          },
          data: impactoPorMaquina[1]
        },
        {
          name: 'Impactos Fortes',
          color: '#bf504d',
          stack: 'Intencidade',
          emphasis: {
            focus: 'series'
          },
          type: 'bar',
          backgroundStyle: {
            color: '#ffffff'
          },
          data: impactoPorMaquina[2]
        }
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