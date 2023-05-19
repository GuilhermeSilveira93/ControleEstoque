import React, { Component } from 'react'
import ReactECharts from 'echarts-for-react'
import api from '../../../../api/Api'

class ImpactosPie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      impactosPie: []
    }
  }

  componentDidMount() {
    api.post('/consultar/totalimpactos.json',{
      params: {
        idUsuario: JSON.parse(sessionStorage.getItem('Usuario'))
      }
    })
      .then((resposta) => { 
        this.setState({ impactosPie: resposta.data }); 
      })
      .catch(error => console.log(error))
  }

  render() {
    const options = {
      tooltip: {
        trigger: 'item'
      },
      title: {
        text: 'Impactos',
        link: '',
        textStyle:{
          color: "#ffffff"
        }
      },
      legend:{
        left: '0px',
        bottom:'0px',
        textStyle:{
          color: "#CAF0FE"
        }
      },
      series: [
        {
          top: '0px',
          type: 'pie',
          radius: ['10%','90%'],
          color:['#9bba59','#ffff00','#bf504d'],
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
            show: false
          },
          data: this.state.impactosPie
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

export default ImpactosPie
