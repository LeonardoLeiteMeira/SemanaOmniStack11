const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); //dizendo para ler o corpo da requisição como JSON
app.use(routes);
app.listen(3333);

//banco usado http://knexjs.org/

/*
Tipos de paramentro
Query Params: Parametro enviados na rota após "?" (filtros, paginação) => /users?page=2&nome=Diego&idade=25
Route Params: Parametros para identificar recursos => users/id (no back fica users/:id)
Request body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/**
 * SQL: MySQL, SQLite, ...
 * NoSQL:MongoDB, CouchDB, ...
 */

/**
 * Drive: Select * from user; => não sera usado nesse projeto
 * Query Builder: table('users').select(*).where() => sera usado o Knex
 */
