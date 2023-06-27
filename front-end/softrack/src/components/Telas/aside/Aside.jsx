import React, { Component } from 'react';
import { MdAddCircle } from "react-icons/md";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsBookFill,BsFillBoxFill } from "react-icons/bs";
import { FaPeopleCarry,FaProductHunt } from "react-icons/fa";
class Aside extends Component {
  constructor(props){
    super(props)
    this.state ={

    }
    this.temDireito = this.temDireito.bind(this)
  }
  temDireito(nomePagina,operacao){
    const {direitos} = this.props
    let temDireito = false
    console.log(direitos)
    direitos.forEach(direito => {
      if (direito['pagina'] === nomePagina) {
        temDireito = direito[operacao] === 'X'
      }
    });
    return temDireito
  }
  render() {
    const IconSize = 15
    const { showEntrada, showSaida, showEstoque,showFornecedor, showProduto,showTipo} = this.props;
    return (
      <aside>
        <div>
          <h2><u>Olá, {this.props.UserName} !</u></h2><br />
        </div>
        <nav>
          <ul>
            <h2>Estoque</h2>
            {this.temDireito('estoque','Listar') ? <li onClick={() => showEstoque()} style={{ cursor: 'pointer' }}><h1><BsBookFill color={"white"} size={IconSize} /> Estoque</h1></li> : ''}
            {this.temDireito('entrada','Listar') ? <li onClick={() => showEntrada()} style={{ cursor: 'pointer' }}><h3><MdAddCircle color={"white"} size={IconSize}/> Entrada</h3></li>:''}
            {this.temDireito('saida','Listar') ? <li onClick={() => showSaida()} style={{ cursor: 'pointer' }}><h3><AiFillMinusCircle color={'white'} size={IconSize}/> Saida</h3></li> :''}
            <hr />
            <h2>Cadastro</h2>
            {this.temDireito('fornecedor','Listar') ? <li onClick={() => showFornecedor()} style={{ cursor: 'pointer' }}><h1><FaPeopleCarry color={"white"} size={IconSize} /> Fornecedor</h1></li>:''}
            {this.temDireito('produto','Listar') ? <li onClick={() => showProduto()} style={{ cursor: 'pointer' }}><h1><FaProductHunt color={"white"} size={IconSize} /> Produto</h1></li>:''}
            {this.temDireito('tipo','Listar') ? <li onClick={() => showTipo()} style={{ cursor: 'pointer' }}><h1><BsFillBoxFill color={"white"} size={IconSize} /> Tipo</h1></li>:''}
          </ul>
        </nav>
        <button type="button" onClick={()=>this.props.logout()}>SAIR</button>
      </aside>
    );
  }
}

export default Aside;
