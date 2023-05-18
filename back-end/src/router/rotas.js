const express = require('express')
const fs = require('fs');
const path = require('path');
const consultasMaquinas = require('../controllers/consultasMaquinas');
const consultasOperadores = require('../controllers/consultasOperadores');
const consultasUsuarios = require('../controllers/consultasUsuarios');
const consultasImpactos = require('../controllers/consultasImpactos');
const consultasDash = require('../controllers/consultasDash');
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
  .post("/consultar/consultaveiculoatualiza.json", async (req, res) => {
    try {
      const { id_veiculo } = req.body.params
      const maquinaSelecionada = await consultasMaquinas.consultaVeiculoAtualiza(id_veiculo)
      return res.status(200).json(maquinaSelecionada)
    }
    catch (error) {
      res.status(404).json({ message: error.message })
    }
  })
  .post("/consultar/tabelamotoristas.json", async (req, res) => {
    try {
      const { IDUSUARIO } = req.body.params.idUsuario[0]
      const tabelamotoristas = await consultasOperadores.TabelaMotoristas(IDUSUARIO)
      return res.status(200).json(tabelamotoristas)
    }
    catch (error) {
      res.status(404).json({ message: error.message })
    }
  })
  .post("/consultar/tabelausuarios.json", async (req, res) => {
    try {
      const { IDUSUARIO } = req.body.params.idUsuario[0]
      const tabelaUsuarios = await consultasUsuarios.TabelaUsuarios(IDUSUARIO)
      return res.status(200).json(tabelaUsuarios)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  })
  .post("/consultar/usuarios.json", async (req, res) => {
    try {
      const { login, senha } = req.body.params
      const usuarios = await consultasUsuarios.UsuarioLogin(login, senha)
      return res.status(200).json(usuarios)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }

  })
  .post("/consultar/impactos.json", async (req, res) => {
    try {
      const { IDUSUARIO } = req.body.params.idUsuario[0]
      const consultaImpactos = await consultasImpactos.trazerImpactos(IDUSUARIO)
      return res.status(200).json(consultaImpactos)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  })
  .post("/consultar/totalimpactos.json", async (req, res) => {
    try {
      const { IDUSUARIO } = req.body.params.idUsuario[0]
      const totalimpactos = await consultasImpactos.trazerImpactosGrafico(IDUSUARIO)
      return res.status(200).json(totalimpactos)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  })
  .post("/consultar/DashGrafico.json", async (req, res) => {
    try {
      const configuracoes = await consultasDash.configGrafico()
      return res.status(200).json(configuracoes)
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