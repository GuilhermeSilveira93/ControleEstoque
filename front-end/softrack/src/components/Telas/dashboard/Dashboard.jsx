import React, { Component } from 'react';
import Header from '../Cadastros/Header';
import SaidaBar from './echarts/SaidaBar';
import SaidaPie from './echarts/SaidaPie';
import EntradaBar from './echarts/EntradaBar';
import EntradaPie from './echarts/EntradaPie';

export default class DashBoard extends Component {
  constructor(props){
  super(props)
  this.state ={

  }
}
  render() {
    return (
      <>
      <Header titulo={'DashBoard'} />
      <div id="graficos">
        <div className='filhos' id="grafico1"><SaidaBar /></div>
        <div className='filhos' id="grafico2"><SaidaPie /></div>
        <div className='filhos' id="grafico3"><EntradaPie/></div>
        <div className='filhos' id="grafico4"><EntradaBar/></div>
      </div>
      </>
    )
  }
}
