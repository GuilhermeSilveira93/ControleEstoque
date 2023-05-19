import ImpactosBar from "./echarts/ImpactosBar"
import ImpactosPie from "./echarts/ImpactosPie"
import React, { Component } from "react"
import DashGrafico from "./DashGrafico";

export default class DashBoard extends Component {
  render() {
    return (
      <section className="dashBoard">
        <div className="filhos" id="grafico1"><DashGrafico/></div>
        <div className="filhos" id="grafico2"><ImpactosPie /></div>
        <div className="filhos" id="grafico3"><ImpactosBar /></div>
        <div className="filhos" id="grafico4"></div>
        <div className="filhos" id="grafico5"></div>
      </section>
    );
  }
}