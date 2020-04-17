// dependencies
const bd = require('../config/oracle');

const controller = {};

controller.getUsers = async (req,res) => {
  sql = 'select * from "user"';
  let result = await bd.Open(sql,[],false);
  res.json(result.rows);
};

module.exports = controller;