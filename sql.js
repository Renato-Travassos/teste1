const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('users.db');

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

db.serialize(function () {
  db.run(`
    CREATE TABLE IF NOT EXISTS USERS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(255) NOT NULL,
      biografia VARCHAR(255),
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL
    )
  `);

  let stmt = db.prepare('INSERT INTO USERS (nome, createdAt, updatedAt) VALUES (?, ?, ?)');
  
  stmt.run('renato', data(), data());
  stmt.run('andressa', data(), data());
  stmt.run('gustav', data(), data());
  stmt.run('david', data(), data());

  stmt.finalize();
});