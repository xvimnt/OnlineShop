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


controller.getUsers = async (req,res) => {
  sql = 'select * from "user"';
  let result = await bd.Open(sql,[],false);
  res.json(result.rows);
};

controller.getUser = async (req,res) => {

  const { password, email } = req.body;
  sql = 'select * from "user" where user_email = :email and user_key = :password';

  let result = await bd.Open(sql,[email,password],true);

  
  res.json(result.rows);
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
  const { firstname, lastname, password, email, tel, genre, birthdate, type } = req.body;

  // Ingresar al usuario en la base de datos   
  sql = 'insert into "user"( USER_NAME, USER_LASTNAME, USER_KEY,'+
    'USER_EMAIL, USER_TEL, USER_GENRE, USER_CLASS'+
    ') values (:firstname, :lastname, :password, :email, :tel, :genre, :type)';
  
    await bd.Open(sql, [firstname, lastname, password, email, tel, genre, type], true);

    res.status(200).json({
        "msg": "Usuario agregado con exito",
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