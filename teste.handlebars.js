const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('users.db');

//ta falando que quer usar ele na engine do express  template engine
app.engine('handlebars', handlebars.engine({defaultLayout: 'main',
 runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
}));


app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended:false}))
app.use(express.json())

function data() {
  let dataHoraAtual = new Date();

  dataHoraAtual.setUTCHours(dataHoraAtual.getUTCHours() - 3);
  let hora = dataHoraAtual.getHours();
  let minutos = dataHoraAtual.getMinutes();
  let segundos = dataHoraAtual.getSeconds();
  let dia = dataHoraAtual.getDate();
  let mes = dataHoraAtual.getMonth() + 1;
  let ano = dataHoraAtual.getFullYear();

  hora = hora < 10 ? '0' + hora : hora;
  minutos = minutos < 10 ? '0' + minutos : minutos;
  segundos = segundos < 10 ? '0' + segundos : segundos;
  dia = dia < 10 ? '0' + dia : dia;
  mes = mes < 10 ? '0' + mes : mes;

  let dataHoraBrasilia = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

  return String(dataHoraBrasilia);
}




//conexão com banco de dados
var db = new sqlite3.Database('users.db');


app.get('/', async function(req,res) {  
  
  const tabela=await db.all('select * FROM USERS',(erro,rows)=>{
    if(erro){
     console.log('nenhum usúario cadastrado'+erro)
    }else{
      res.render('home_sql',{rows:rows})
    }
  })

    
})

app.get('/card',function(req,res){
res.render('formulario')
});
 
app.post('/envio', async function(req,res){
 const {nome,biografia} = req.body
     
const resp = await db.run('INSERT INTO USERS (nome, biografia, createdAt, updatedAt) VALUES (?, ?, ?, ?)', nome, biografia, data(), data());
     res.redirect('/')

 });
app.delete('/rows/:id',async function(req,res){
 const id=  res.send(Number(req.params.id))
 
   const resp=await db.run(`DELETE FROM USERS  WHERE id = ${id}`)    

 })


app.listen(3001,()=>{console.log('servidor rodando na porta 3001')})  