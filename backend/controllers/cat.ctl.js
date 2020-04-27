const bd = require('../config/oracle');

const controller = {};

controller.addCategory = async (req,res) => 
{
  // Obtener los datos del registro
  const { name,desc } = req.body;
  // Ingresar al usuario en la base de datos   
  sql = 'insert into "category"( cat_name, cat_desc '+ 
    ') values ( :name, :desc )';

    await bd.Open(sql, [name, desc], true);

    res.status(200).json({
        "msg": "Categoria agregada con exito",
        "status": 1
    });
}

module.exports = controller;