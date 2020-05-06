const bd = require('../config/oracle');

const controller = {};

controller.getCategories = async (req,res) => {
  sql = 'select * from "CATEGORY"';
  let result = await bd.Open(sql,[],false);
  let categories = [];
  result.rows.forEach(element => {
    let item = {
      "name": element[0],
      "description": element[1]
      }
      categories.push(item);
  });
  res.json(categories);
};

controller.getCategory = async(req,res) => {
  const { name } = req.body;
  sql = 'select * from "CATEGORY" where CAT_NAME like :name'
  let result = await bd.Open(sql,[name],true);
  res.json(result.rows);
}

controller.addHierarchy = async (req,res) => {
  // Obtener los datos del registro
  const { son, father } = req.body;
  // Consulta a det_cat
  sql = 'insert into det_cat ( cat_father, cat_son ) values ( '+
  ':father, :son );'
  // Enviar consulta 
  await bd.Open(sql, [father, son], true);
  // Respuesta correcta
  res.status(200).json({
      "msg": "Jerarquia agregada con exito",
      "status": 1
  });
}

controller.addCategory = async (req,res) => 
{
  // Obtener los datos del registro
  const { name } = req.body;
  // Ingresar al usuario en la base de datos   
  sql = 'insert into "CATEGORY"( CAT_NAME, CAT_DISP'+ 
    ' ) values ( :name, 1 )';
  // Enviar consulta
  await bd.Open(sql, [name], true);
  // The msg returnered by the database 
  res.status(200).json({
    'msg':'Categoria agregada con exito',
    'status': '1'
  });
}

module.exports = controller;