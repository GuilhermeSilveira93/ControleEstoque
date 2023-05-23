import React, { Component } from 'react';
import Estoque from './Telas/Cadastros/Estoque/Estoque';
import Entrada from './Telas/Cadastros/Estoque/Entrada';
import Saida from './Telas/Cadastros/Estoque/Saida';

export default class Conteudo extends Component {
  render() {
    const {entrada,estoque,saida} = this.props
    return (
      <div className="conteudo">
        {entrada === true ? <Entrada /> :
        estoque === true?<Estoque /> :
        saida === true?<Saida /> : <Estoque />}
        
      </div>
    )
  }
}
