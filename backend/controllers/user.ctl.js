// dependencies
const bd = require('../config/oracle');
const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');


const controller = {};

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}


//DELETE
controller.deleteUser = async (req, res) => {
  
  const { email } = req.params;
  // Consulta 
  sql = 'update "user" set user_disp = 0 where user_email = :email';
  // Ejecutar consulta
  await bd.Open(sql, [email], true);
  // Mensaje para el usuario
  res.json({ "msg": "Usuario Eliminado" })
}

controller.getUsers = async (req,res) => {
  sql = 'select * from "user" where user_disp != 0 ';
  let result = await bd.Open(sql,[],false);
  let users = [];
  result.rows.forEach(element => {
    let item = {
      "firstname": element[0],
      "lastname": element[1],
      "password": element[2],
      "email": element[3],
      "tel": element[4],
      "genre": element[6],
      "birthdate": element[7],
      "regday": element[8],
      "dir": element[9],
      "credit": element[10],
      "earns": element[11],
      "class": element[12],
      "disp": element[13]
    }
    users.push(item);
  });
  res.json(users);
};

controller.getUser = async (req,res) => {

  const { password, email } = req.body;
  sql = 'select * from "user" where user_email = :email and user_key = :password';

  let result = await bd.Open(sql,[email,password],true);

  let item = {};

  if(result.rows.length) {
    item = {
      "firstname": result.rows[0][0],
      "lastname": result.rows[0][1],
      "password": result.rows[0][2],
      "email": result.rows[0][3],
      "tel": result.rows[0][4],
      "genre": result.rows[0][6],
      "birthdate": result.rows[0][7],
      "regday": result.rows[0][8],
      "dir": result.rows[0][9],
      "credit": result.rows[0][10],
      "earns": result.rows[0][11],
      "class": result.rows[0][12],
      "disp": result.rows[0][13]
   }
  }
  
  res.json(item);
}

function sendConfirmationEmail(email,name,token)
{
   // setup trasporter
   var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'jvmonteros98@gmail.com',
        pass: 'lgbello4312'
    }
  });

  // setup e-mail data
  var mailOptions = {
    from: '"Bienvenido a Alie-Sell" <jvmonteros98@gmail.com>', // sender address (who sends)
    to: email, // list of receivers (who receives)
    subject: 'Correo de confirmacion de usuario', // Subject line
    text: name + ' le damos la bienvenida a nuestra plataforma de compras, casi esta todo listo.' +
     'Utilice el siguiente texto como clave temporal en el login para acceder y validar la cuenta: ' + token
    // plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }
  });
}

controller.addUser = async (req,res) => 
{
  // Obtener los datos del registro
  const { firstname, lastname, password, email, tel, genre, birthdate, type, disp} = req.body;

  // Ingresar al usuario en la base de datos   
  sql = 'insert into "user"( USER_NAME, USER_LASTNAME, USER_KEY,'+
    'USER_EMAIL, USER_TEL, USER_GENRE, USER_BIRTH_DATE, USER_CLASS, USER_DISP'+
    ') values (:firstname, :lastname, :password, :email, :tel, :genre, TO_DATE(:birthdate, \'DD/MM/YY\'), :type, :disp)';
   console.log("usuario: ", [firstname, lastname, password, email, tel, genre, birthdate, type, disp]);
    await bd.Open(sql, [firstname, lastname, password, email, tel, genre, birthdate, type, disp], true);

    res.status(200).json({
        "msg": "Usuario agregado con exito",
        "status": 1
    });
}

controller.updateUser = async (req,res) => 
{
  // Obtener los datos del registro
  const { firstname, lastname, email, tel, genre, type, selected} = req.body;
  // Ingresar al usuario en la base de datos   
  sql = 'update "user" set  USER_NAME = :firstname, USER_LASTNAME = :lastname, '+
    'USER_EMAIL = :email, USER_TEL = :tel, USER_GENRE = :genre, USER_CLASS= :type ' +
    'where USER_EMAIL = :selected';
  // Ejecutar consulta
    await bd.Open(sql, [firstname, lastname, email, tel, genre, type, selected], true);
  // Consulta exitosa
    res.status(200).json({
        "msg": "Usuario actualizado con exito",
        "status": 1
    });
}

controller.sendConfirm = async (req,res) => {
  // Obtener los datos del registro
  const { firstname, lastname, email } = req.body;
  // Crear la temp Key 
  jwt.sign({email}, 'secretkey', (err, token) => {
    // Enviar la temp key
    sendConfirmationEmail(email,firstname + ' ' + lastname, token);
  });
  
  res.status(200).json({
    "msg": "email enviado con exito",
    "status": 1
  });
}

module.exports = controller;