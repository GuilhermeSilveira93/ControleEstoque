import React, { Component } from 'react';
import { MdAddCircle } from "react-icons/md";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsBookFill,BsFillBoxFill } from "react-icons/bs";
import { FaPeopleCarry,FaProductHunt } from "react-icons/fa";
class Aside extends Component {
  render() {
    const IconSize = 15
    const { showEntrada, showSaida, showEstoque,showFornecedor, showProduto,showTipo } = this.props;
    return (
      <aside>
        <div>
          <h3>Olá, Produção !</h3><br />
        </div>
        <nav>
          <ul>
            <h2>Estoque</h2>
            <li onClick={() => showEstoque()} style={{ cursor: 'pointer' }}><h1><BsBookFill color={"white"} size={IconSize} /> Estoque</h1></li>
            <li onClick={() => showEntrada()} style={{ cursor: 'pointer' }}><h3><MdAddCircle color={"white"} size={IconSize}/> Entrada</h3></li>
            <li onClick={() => showSaida()} style={{ cursor: 'pointer' }}><h3><AiFillMinusCircle color={'white'} size={IconSize}/> Saida</h3></li>
            <hr />
            <h2>Cadastro</h2>
            <li onClick={() => showFornecedor()} style={{ cursor: 'pointer' }}><h1><FaPeopleCarry color={"white"} size={IconSize} /> Fornecedor</h1></li>
            <li onClick={() => showProduto()} style={{ cursor: 'pointer' }}><h1><FaProductHunt color={"white"} size={IconSize} /> Produto</h1></li>
            <li onClick={() => showTipo()} style={{ cursor: 'pointer' }}><h1><BsFillBoxFill color={"white"} size={IconSize} /> Tipo</h1></li>
          </ul>
        </nav>
      </aside>
    );
  }
}

export default Aside;
