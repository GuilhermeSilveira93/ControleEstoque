import React, { Component } from 'react';
import api from '../api/Api';
import bcrypt from 'bcryptjs'
import logoProd from '../images/logo_prod.png'


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      senha: '',
      mensagem: this.props.mensagem,
    }
    this.validacao = this.validacao.bind(this)
  }
  async validacao() {
    const { email, senha } = this.state
    const chave = await bcrypt.genSalt(10)
    const password = await bcrypt.hash('123456',chave)
    console.log(`senha : ${password} chave: ${chave}`)
    try {
      const chave = await api.get('/chave.json', {
        params: {
          email: email
        }
      });
      if (chave?.data[0]?.S_CHAVE) {
        const senhaCripto = await bcrypt.hash(senha, chave?.data[0]?.S_CHAVE)
        try {
          await api.get('/login.json', {
            params: {
              email: email,
              senha: senhaCripto
            }
          }).then((resposta) => {
            if (resposta.data[0]) {
              sessionStorage.setItem('Usuario', JSON.stringify(resposta.data[0]));
              this.props.logado(resposta.data[0])
            }
          }).catch((err) => {
            console.log(err)
          });
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const { mensagem } = this.props
    return (
      <div className="loginflex">
        <div className="imgsidelogin"></div>
        <div id='FormularioLogin'>
          <form>
            <h1><img src={logoProd} alt="Logo Softrack" title='Softrack' style={{width:'100%'}}/></h1>
            <label htmlFor="email">E-mail: </label>
            <input type="text" onChange={(e) => this.setState({ email: e.target.value })} />
            <br />
            <label htmlFor="senha">Senha: </label>
            <input type="password" onChange={(e) => this.setState({ senha: e.target.value })} />
            <br />
            <p>{mensagem}</p>
            <button type="submit" onClick={(e) => { e.preventDefault(); this.validacao(); }}>Enviar</button>
          </form>
        </div>
      </div>
    )
  }
}