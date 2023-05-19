const express = require('express')
const consultasMaquinas = require('../controllers/consultasMaquinas');
const rotas = express.Router()

/*API*/

rotas
  .post("/consultar/tabelaveiculos.json", async (req, res) => {
    try {
      const { IDUSUARIO } = req.body.params.idUsuario[0]
      const tabelaveiculos = await consultasMaquinas.TabelaVeiculos(IDUSUARIO)
      return res.status(200).json(tabelaveiculos)
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