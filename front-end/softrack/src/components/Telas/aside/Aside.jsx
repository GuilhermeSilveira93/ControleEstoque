import React, { Component } from 'react';

class Aside extends Component {
  render() {
    const {showEntrada,showSaida,showEstoque} = this.props;
    return (
      <aside>
        <div>
          <h3>Olá, Produção !</h3><br />
        </div>
        <nav>
          <ul>
              <li onClick={() => showEstoque( )} style={{cursor:'pointer'}}><h1>Estoque</h1></li>
              <li onClick={() => showEntrada()} style={{cursor:'pointer'}}><h3>Entrada</h3></li>
              <li onClick={() => showSaida()} style={{cursor:'pointer'}}><h3>Saida</h3></li>
          </ul>
        </nav>
      </aside>
    );
  }
}

export default Aside;
