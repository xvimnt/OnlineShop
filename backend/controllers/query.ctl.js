const bd = require('../config/oracle');

const controller = {};


controller.secondReport = async (req,res) => 
{
  // Obtener los datos del registro
  const { bdate } = req.body;
  // Ingresar al usuario en la base de datos 
  sql = 'select * from "user" ' +
        'where USER_CLASS = \'H\' ' +
        "and USER_BIRTH_DATE > TO_DATE(:bdate, \'DD/MM/YY\') " +
        'and USER_DISP != 0';
    // Haciendo la consulta
  let result = await bd.Open(sql, [bdate], true);
    // Devolviendo un json
  let users = [];
  result.rows.forEach(element => {
    let item = {
      "name": element[0] + " " + element[1],
      "email": element[3],
      "birthdate": element[7],
    }
    users.push(item);
  });
  res.json(users);
}

controller.thirdReport = async (req,res) => 
{
  // Obtener los datos del registro
  const { bdate } = req.body;
  // Ingresar al usuario en la base de datos 
  sql = 'select * from "user" ' +
        'where USER_CLASS = \'A\' ' +
        "and USER_BIRTH_DATE < TO_DATE(:bdate, \'DD/MM/YY\') " +
        'and USER_GENRE = \'F\'';
        'and USER_DISP != 0';
    // Haciendo la consulta
  let result = await bd.Open(sql, [bdate], true);
    // Devolviendo un json
  let users = [];
  result.rows.forEach(element => {
    let item = {
      "name": element[0] + " " + element[1],
      "email": element[3],
      "genre": "Femenino",
      "birthdate": element[7],
    }
    users.push(item);
  });
  res.json(users);
}

controller.eigthReport = async (req,res) => 
{
  // Obtener los datos del registro
  const { num } = req.body;
  // Ingresar al usuario en la base de datos 
  sql = 'select * from "CATEGORY", PRODUCT ' +
        'where PROD_CANT >= :num ' +
        'and PROD_DISP != 0';
    // Haciendo la consulta
  let result = await bd.Open(sql, [num], true);
    // Devolviendo un json
    let products = [];
    result.rows.forEach(element => {
      let item = {
        "id": element[0],
        "url": element[1],
        "description": element[2],
        "price": element[3],
        "cant": element[4],
        "idate": element[5],
        "colors": element[6],
        "email": element[7]
        }
        products.push(item);
    });
    res.json(products);
}

controller.tenthReport = async (req,res) => 
{
  // Obtener los datos del registro
  const { num } = req.body;
  // Ingresar al usuario en la base de datos 
  sql = 'select * from PRODUCT ' +
        'where PROD_CANT >= :num ' +
        'and PROD_DISP != 0';
    // Haciendo la consulta
  let result = await bd.Open(sql, [num], true);
    // Devolviendo un json
    let products = [];
    result.rows.forEach(element => {
      let item = {
        "id": element[0],
        "url": element[1],
        "description": element[2],
        "price": element[3],
        "cant": element[4],
        "idate": element[5],
        "colors": element[6],
        "email": element[7]
        }
        products.push(item);
    });
    res.json(products);
}

module.exports = controller;