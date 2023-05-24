import React, { Component } from 'react';
import Estoque from './Telas/Cadastros/Estoque/Estoque';
import Entrada from './Telas/Cadastros/Estoque/Entrada';
import Saida from './Telas/Cadastros/Estoque/Saida';

export default class Conteudo extends Component {
  render() {
    const data = new Date()
    const dia = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear()
    const dataString = `${dia}/${mes < 10 ? `0${mes}` : mes}/${ano}`
    const {entrada,estoque,saida} = this.props
    return (
      <div className="conteudo">
        {entrada === true ? <Entrada data={dataString}/> :
        estoque === true?<Estoque /> :
        saida === true?<Saida /> : <Estoque />}

      </div>
    )
  }
}
