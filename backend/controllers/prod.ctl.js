const bd = require('../config/oracle');

const controller = {};

controller.addProduct = async (req,res) => 
{
  // Obtener los datos del registro
  const { id, url, desc,price , cant, colors } = req.body;
  var i_date = 
  // Ingresar al usuario en la base de datos   
  sql = 'insert into PRODUCT(  prod_id, prod_img_url, prod_desc, prod_price' +     
    'prod_initial_date, category_cant, prod_colors' + 
    ') values (:id, :url, :desc, :price, :i_date, :cant, :colors)';

  
    await bd.Open(sql, [id, url, desc, price, cant, colors], true);

    res.status(200).json({
        "msg": "Producto agregado con exito",
        "status": 1
    });
}

module.exports = controller;