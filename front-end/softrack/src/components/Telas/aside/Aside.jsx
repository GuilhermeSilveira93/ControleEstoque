import React, { Component } from 'react';
import { MdAddCircle, MdDashboard } from "react-icons/md";
import {HiDocumentReport,HiOutlineDocumentReport} from 'react-icons/hi'
import { AiFillMinusCircle } from "react-icons/ai";
import { BsBookFill,BsFillBoxFill } from "react-icons/bs";
import { FaPeopleCarry,FaProductHunt } from "react-icons/fa";
import logoProd from '../../../images/logo_prod_branco.png'
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
    direitos.forEach(direito => {
      if (direito['pagina'] === nomePagina) {
        temDireito = direito[operacao] === 'X'
      }
    });
    return temDireito
  }
  render() {
    const IconSize = 15
    const { showEntrada, showSaida, showEstoque,showFornecedor, showProduto,showTipo,showDash,showRelatorioEntrada,showRelatorioSaida} = this.props;
    return (
      <aside>
        <div>
        <h1><img src={logoProd} alt="Logo Softrack" title='Softrack' style={{width:'100%'}}/></h1>
          <h2><u>Olá, {this.props.UserName} !</u></h2><br />
        </div>
        <nav>
          <ul>
            <h2>Estoque</h2>
            {this.temDireito('dashboard','Listar') ? <li onClick={() => showDash()} style={{ cursor: 'pointer' }}><h1><MdDashboard color={"white"} size={IconSize} /> DashBoard</h1></li> : ''}
            {this.temDireito('estoque','Listar') ? <li onClick={() => showEstoque()} style={{ cursor: 'pointer' }}><h1><BsBookFill color={"white"} size={IconSize} /> Estoque</h1></li> : ''}
            {this.temDireito('entrada','Listar') ? <li onClick={() => showEntrada()} style={{ cursor: 'pointer' }}><h3><MdAddCircle color={"white"} size={IconSize}/> Entrada</h3></li>:''}
            {this.temDireito('saida','Listar') ? <li onClick={() => showSaida()} style={{ cursor: 'pointer' }}><h3><AiFillMinusCircle color={'white'} size={IconSize}/> Saida</h3></li> :''}
            <hr />
            <h2>Relatórios</h2>
            {this.temDireito('dashboard','Listar') ? <li onClick={() => showRelatorioEntrada()} style={{ cursor: 'pointer' }}><h1><HiDocumentReport color={"white"} size={IconSize} /> Entrada</h1></li> : ''}
            {this.temDireito('estoque','Listar') ? <li onClick={() => showRelatorioSaida()} style={{ cursor: 'pointer' }}><h1><HiOutlineDocumentReport color={"white"} size={IconSize} /> Saida</h1></li> : ''}
            <hr />
            {this.temDireito('fornecedor','Listar') || this.temDireito('produto','Listar') || this.temDireito('tipo','Listar') ? <h2>Cadastro</h2> :''}
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
