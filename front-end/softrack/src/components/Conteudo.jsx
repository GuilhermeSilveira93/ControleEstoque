import React, { Component } from 'react';
import Estoque from './Telas/Cadastros/Estoque/Estoque';
import Entrada from './Telas/Cadastros/Estoque/Entrada';
import Saida from './Telas/Cadastros/Estoque/Saida';
import Produto from './Telas/Cadastros/Estoque/Produto';
import Fornecedor from './Telas/Cadastros/Estoque/Fornecedor';
import Tipo from './Telas/Cadastros/Estoque/Tipo';

export default class Conteudo extends Component {
  render() {
    const data = new Date()
    const dia = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear()
    const dataString = `${dia}/${mes < 10 ? `0${mes}` : mes}/${ano}`
    const {entrada,estoque,saida,fornecedor,produto,tipo} = this.props
    return (
      <div className="conteudo">
        {entrada === true ? <Entrada data={dataString}/> :
        estoque === true?<Estoque /> :
        saida === true?<Saida data={dataString}/> :
        produto === true?<Produto data={dataString}/> :
        fornecedor === true?<Fornecedor data={dataString}/>:
        tipo === true?<Tipo data={dataString}/>
        : <Estoque />
        }
      </div>
    )
  }
}
