const express = require('express')
const  teste  = require('../controllers/teste')
const rotas = express.Router()

/*API*/

rotas
  .get("/teste.json", async (req, res) => {
    try {
      /*const { IDUSUARIO } = req.body.params.idUsuario[0]*/
      const teste2 = await teste.teste()
      return res.status(200).json(teste2)
    } catch (error) {
      res.status(404).json({ message: error.message })
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