const express = require('express')
const app = express()
app.use(express.json())
const rotas = require('./src/router/rotas')
const cors = require('cors')
app.use(cors())
const path = require('path')//ajuda a mostrar para o express, onde colocaremos as views
const { knex } = require('knex')
app.use(rotas)//vamos colocar as rotas aqui, para não bagunçar

app.use(express.static(path.join(__dirname,'build')))//aqui ficarão os arquivos estaticos
/* CASO VENHA USAR EJS NOVAMENTE DEFINIMOS ONDE ELE PEGA AS VIEWS*/
app.set('views', path.join(__dirname, 'src/views'))//vamos setar o caminho das views, passando pra ele o path.join para juntar as rotas, primeiro parametro é o diretorio atual, do app.js no caso: __dirname, em seguida a pasta

/*TRATAMENTO DE ERROS*/
app.use((error,requisicao,resposta,next)=>{
  resposta.status(error.status || 500)
  resposta.json({error: error.message})
})
/*TRATAMENTO DE ERROS*/
const porta = 8080
try {
  app.listen(porta, async ()=>{
    console.log(`Servidor na porta ${porta}`)
  })
} catch (error) {
  console.log(error)
}finally{
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}