import React, { Component } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default class ExportUsuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeRelatorio: '',
      tableBody: [],
      tableHead: [],
      widths: [],
      pageSize: 'A4',
      data: ''
    };
    this.generatePdf = this.generatePdf.bind(this);
  }
  generatePdf(dados) {
    let data = new Date()
    let dia = data.getDate()
    let mes = data.getMonth() + 1
    dia = (dia<10 ? '0' : '') + dia
    mes = (mes<10 ? '0' : '') + mes
    const chaveDados = Object.keys(dados[0])
    const header = chaveDados.reduce((colunas, dados) => {
      if (dados !== "ID_USUARIO" && dados !== "ID_MOTORISTA" && dados !== "ID_VEICULO") {
        (dados === 'S_ATIVO') ?
          colunas.push({ text: 'Ativo ?', style: 'cabecalho' })
          :
          colunas.push({ text: dados.replaceAll("'", ""), style: 'cabecalho' })
      }
      return colunas
    }, [])
    const widths = header.map(() => {
      return 'auto'
    })
    console.log(header.length)
    if (header.length > 8) {
      this.setState({ pageSize: 'A3' })
    }
    const linhasBody = dados.map((dado) => {
      let linha = []
      header.forEach((valores) => {
        (dado[valores.text] === 'S') ?
          linha.push({ text: 'Sim', style: 'body' }) :
          (dado[valores.text] === 'N') ?
            linha.push({ text: 'Não', style: 'body' })
            :
            linha.push({ text: dado[valores.text.replaceAll("'", "")], style: 'body' })
            console.log(dado)
      })
      console.log(linha)
      return linha
    })
    this.setState(
      { tableHead: header, 
        tableBody: linhasBody,
        nomeRelatorio:`${this.props.name} - ${dia}/${mes}/${data.getFullYear()}`,
        widths },
      () => {
        const { tableBody, tableHead, nomeRelatorio, widths } = this.state;
        const docDefinition = {
          pageSize: this.state.pageSize,
          width: 'auto',
          pageMargins: [0, 0, 0, 0],
          pageOrientation: 'landscape',
          content: [
            { text: nomeRelatorio, style: 'titulo' },
            {
              style: 'tableExample',
              table: {
                widths: widths,
                headerRows: 1,
                body: [
                  tableHead
                  ,
                  ...tableBody
                ]
              },
              layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                  return rowIndex % 2 === 0 ? '#CCCCCC' : null;
                }
              }
            }
          ],
          styles: {
            titulo: {
              fontSize: 20,
              bold: true
            },
            cabecalho: {
              fontSize: 12,
              bold: true,
              alignment: 'center'
            },

            alinhadoDireita: {
              italics: true,
              alignment: 'right'
            },
            body: {
              fontSize: 10,
              alignment: 'center'
            }
          }
        };
        const pdfGenerator = pdfMake.createPdf(docDefinition);
        pdfGenerator.download(nomeRelatorio);
      }
    );
  }
  render() {
    return (
      <div>
        <button onClick={() => this.generatePdf(this.props.dados)}>Exportar PDF</button>
      </div>
    );
  }
}