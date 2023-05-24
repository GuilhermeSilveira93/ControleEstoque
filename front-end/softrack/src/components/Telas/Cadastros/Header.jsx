import React, { Component } from "react"
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {titulo} = this.props
    return (
      <header id="tituloConteudo">
      <h1>{titulo}</h1>
      </header>
    );
  }
}