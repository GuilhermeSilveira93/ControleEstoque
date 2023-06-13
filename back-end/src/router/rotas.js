const express = require('express')
const entradaEstoque = require('../controllers/entradaEstoque')
const saidaEstoque = require('../controllers/saidaEstoque')
const rotas = express.Router()

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
      const produto = await entradaEstoque.consultaProduto()
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