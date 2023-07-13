import React, { Component } from 'react';
import Estoque from './Telas/Estoque/Estoque';
import Entrada from './Telas/Estoque/Entrada';
import Saida from './Telas/Estoque/Saida';
import Produto from './Telas/Cadastros/Produto';
import Fornecedor from './Telas/Cadastros/Fornecedor';
import Tipo from './Telas/Cadastros/Tipo';
import DashBoard from './Telas/Estoque/dashboard/Dashboard';
import RelatorioEntrada from './Telas/Relatorios/RelatorioEntrada';
import RelatorioSaida from './Telas/Relatorios/RelatorioSaida';

export default class Conteudo extends Component {
  render() {
    const data = new Date()
    const dia = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear()
    const dataString = `${dia}/${mes < 10 ? `0${mes}` : mes}/${ano}`
    const {entrada,estoque,saida,fornecedor,produto,tipo,dashboard,relEntrada,relSaida} = this.props
    return (
      <div className="conteudo">
        {
        entrada === true ? <Entrada data={dataString}/> :
        estoque === true?<Estoque /> :
        saida === true?<Saida data={dataString}/> :
        produto === true?<Produto data={dataString}/> :
        fornecedor === true?<Fornecedor data={dataString}/>:
        tipo === true?<Tipo data={dataString}/> :
        dashboard === true?<DashBoard data={dataString}/> :
        relEntrada === true?<RelatorioEntrada/> :
        relSaida === true?<RelatorioSaida/>
        : <Estoque />
        }
      </div>
    )
  }
}
