// dependencies
const bd = require('../config/oracle');

const controller = {};

controller.getUsers = async (req,res) => {
  sql = 'select * from "user"';
  let result = await bd.Open(sql,[],false);
  res.json(result.rows);
};

controller.addUser = async (req,res) => 
{
  const { firstname, lastname, password, email, tel, genre, birthdate } = req.body;
  sql = 'insert into "user"( USER_NAME, USER_LASTNAME, USER_KEY,'+
    'USER_EMAIL, USER_TEL, USER_GENRE, USER_BIRTH_DATE'+
    ') values (:firstname, :lastname, :password, :email, :tel, :genre, :birthdate)';
  
    
    await bd.Open(sql, [firstname, lastname, password, email, tel, genre, birthdate], true);

    res.status(200).json({
        "msg": "Usuario agregado con exito"
    });
}

module.exports = controller;