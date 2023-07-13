import React, { Component } from 'react'
import ReactECharts from 'echarts-for-react'
import api from '../../../../../api/Api'

export default class SaidaPie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dados: []
    }
  }

  componentDidMount() {
    api.get('/saidaPie.json')
      .then((resposta) => { 
        this.setState({ dados: resposta.data }); 
      })
      .catch(error => console.log(error))
  }

  render() {
    const options = {
      tooltip: {
        trigger: 'item'
      },
      title: {
        text: 'Saida Material',
        link: '',
        textStyle:{
          color: "#ffffff"
        }
      },
     /* legend:{
        left: '0px',
        bottom:'0px',
        textStyle:{
          color: "#CAF0FE"
        }
      },*/
      series: [
        {
          top: '0px',
          type: 'pie',
          radius: ['10%','90%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 15,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          labelLine: {
            show: true
          },
          data: this.state.dados
        }
      ]
    }

    return (
      <>
        <ReactECharts option={options} style={{width:'100%',height:'100%'}}/>
      </>
    )
  }
}
