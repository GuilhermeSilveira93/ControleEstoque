import React, { Component } from 'react';

class Aside extends Component {
  render() {
    const { id, classe, setUsuarios, setMaquinas, setOperadores } = this.props;
    return (
      <aside id={id} className={classe}>
        <div style={{ textAlign: 'center' }}>
          <h3>Olá, Produção !</h3><br />
        </div>
        <nav>
          <h2 onClick={() => this.props.setAllFalse()} style={{ cursor: 'pointer', textAlign: 'center' }}>DashBoard</h2>
          <ul>
              <li><h1>Cadastros</h1></li>
              <li onClick={()=>setUsuarios()} style={{cursor:'pointer'}}><h3>Usuários</h3></li>
              <li onClick={()=>setMaquinas()} style={{ cursor: 'pointer' }}><h3>Maquinas</h3></li>
              <li onClick={()=>setOperadores()} style={{cursor:'pointer'}}><h3>Operadores</h3></li>
          </ul>
        </nav>
      </aside>
    );
  }
}

export default Aside;
