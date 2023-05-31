const express = require('express')
const produtos = require('../controllers/produtos')
const rotas = express.Router()

/*API*/

rotas
  .get("/inclusao.json", async (req, res) => {
    try {
      //const {serial, produto, dimensoes, fornecedor, detalhes, valor, quantidade} = req.query.itens
      req.query.itens.forEach((item, index) => {
        const {produto, dimensoes, fornecedor, detalhes, valor, quantidade} = req.query.itens[index]
        console.log(produto, dimensoes, fornecedor, detalhes, valor, quantidade)
        insert = produtos.insertProdutos(produto,dimensoes,fornecedor,detalhes,valor,quantidade)          
      })
      return res.status(200).json(insert)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/consultaTipo.json", async (req, res) => {
    try {
      const tipos = await produtos.consultaTipo()
      return res.status(200).json(tipos)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  })
  .get("/consultaFornecedor.json", async (req, res) => {
    try {
      const fornecedor = await produtos.consultaFornecedor()
      return res.status(200).json(fornecedor)
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