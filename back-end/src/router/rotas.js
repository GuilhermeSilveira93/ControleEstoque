const express = require('express')
const entradaEstoque = require('../controllers/entradaEstoque')
const entradaFornecedor = require('../controllers/entradaFornecedor')
const saidaEstoque = require('../controllers/saidaEstoque')
const entradaProduto = require('../controllers/entradaProduto')
const entradaTipo = require('../controllers/entradaTipo')
const st_usuario = require('../controllers/st_usuario')
const graficos = require('../controllers/graficos')
const rotas = express.Router()
var fs = require('fs');

function pegarData(pagina){
let date = new Date()
    let dia = date.getDate()
    let mes = date.getMonth() + 1
    let ano = date.getFullYear()
    dia = (dia<10 ? '0' : '') + dia
    mes = (mes<10 ? '0' : '') + mes
    let hora = date.getHours()
    let minuto = date.getMinutes()
    let segundo = date.getSeconds()
    segundo = (segundo<10?'0':'') + segundo
    
    return `Log - ${pagina} - Data: ${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo}`
}

/*API*/

rotas.get("/inclusao.json", async (req, res) => {
  try {
    let id_lote = await entradaEstoque.insertLote(req.query.fornecedor)
    for (const item of req.query.itens) { //for each não aceita await.
      const { produto, dimensoes, detalhes, valor, quantidade } = item;
      insert = await entradaEstoque.insertProdutos(id_lote[0].ID_LOTE,produto,dimensoes,detalhes,valor,quantidade);
    }
    return res.status(200).json(insert);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
})
.get("/inclusaoFornecedor.json", async (req, res) => {
  try {
    for (const item of req.query.itens) { //for each não aceita await.
      const { novoFornecedor } = item;
      insert = await entradaFornecedor.inserirFornecedor(novoFornecedor);
    }
    return res.status(200).json(insert);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
})
.get("/inclusaoTipo.json", async (req, res) => {
  try {
    for (const item of req.query.itens) { //for each não aceita await.
      const { novoTipo } = item;
      insert = await entradaTipo.entradaTipo(novoTipo);
    }
    return res.status(200).json(insert);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
})
.get("/inclusaoProduto.json", async (req, res) => {
  try {
    for (const item of req.query.itens) { //for each não aceita await.
      const { novoProduto,idTipo,serial } = item;
      insert = await entradaProduto.inserirProduto(novoProduto,idTipo,serial);
    }
    return res.status(200).json(insert);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
})
  .get("/consultaTipo.json", async (req, res) => {
    try {
      const tipos = await entradaEstoque.consultaTipo()
      return res.status(200).json(tipos)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/consultaFornecedor.json", async (req, res) => {
    try {
      const fornecedor = await entradaEstoque.consultaFornecedor()
      return res.status(200).json(fornecedor)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/consultaProduto.json", async (req, res) => {
    try {
      console.log(pegarData('Pagina Estoque'))
      const produto = await entradaEstoque.consultaProduto(req.query.id_produto)
      return res.status(200).json(produto)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/consultaEmpresa.json", async (req, res) => {
    try {
      const empresa = await saidaEstoque.consultaEmpresa()
      return res.status(200).json(empresa)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/consultaClientes.json", async (req, res) => {
    const id_empresa = req.query.id_empresa
    try {
      const clientes = await saidaEstoque.consultaClientes(id_empresa)
      return res.status(200).json(clientes)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/saida.json", async (req, res) => {
    try {
      let id_lote = await saidaEstoque.insertLote(req.query.cliente)
      for (const item of req.query.itens) { //for each não aceita await.
        const { produto, dimensoes, detalhes, valor, quantidade } = item;
        insert = await saidaEstoque.saidaProdutos(id_lote[0].ID_LOTE,produto,dimensoes,detalhes,valor,quantidade);
      }
      return res.status(200).json(insert);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  })
  .get("/chave.json", async (req, res) => {
    const email = req.query.email
    try {
      const chave = await st_usuario.chave(email)
      return res.status(200).json(chave)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/login.json", async (req, res) => {
    const {email,senha} = req.query
    try {
      const validacao = await st_usuario.validacao(email,senha)
      return res.status(200).json(validacao)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/permicoes.json", async (req, res) => {
    const {idGrupo} = req.query
    try {
      const permicoes = await st_usuario.permicoes(idGrupo)
      return res.status(200).json(permicoes)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/saidaBar.json", async (req, res) => {
    try {
      const saidaBar = await graficos.SaidaBar()
      return res.status(200).json(saidaBar)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/entradaBar.json", async (req, res) => {
    try {
      const entradaBar = await graficos.EntradaBar()
      return res.status(200).json(entradaBar)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/saidaPie.json", async (req, res) => {
    try {
      const saidaPie = await graficos.SaidaPie()
      console.log(saidaPie)
      return res.status(200).json(saidaPie)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/entradaPie.json", async (req, res) => {
    try {
      const entradaPie = await graficos.EntradaPie()
      console.log(entradaPie)
      return res.status(200).json(entradaPie)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  
/*API*/

/* PÁGINAS */
/*
.get("/", (requisicao, res) => {
  const filePath = path.join(__dirname, '..', '..', 'public', 'home', 'home.html');
  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.write('Pagina não encontrado');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
    }
    res.end();
  });
})*/
/* PÁGINAS */
module.exports = rotas