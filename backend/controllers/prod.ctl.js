const bd = require('../config/oracle');

const controller = {};


controller.addProduct = async (req,res) => 
{
  // Obtener los datos del registro
  const { id, url, desc, cat, price, cant, colors } = req.body;
  
  // Ingresar al usuario en la base de datos   
  sql = 'insert into PRODUCT(  prod_id, prod_img_url, prod_desc, prod_price' +     
    'prod_cant, prod_initial_date, prod_user_id, category_car_id, prod_colors' + 
    ') values (:id, :url, :desc, :cat, :price, :cant, :colors)';
  
    await bd.Open(sql, [id, url, desc, cat, price, cant, colors], true);

    res.status(200).json({
        "msg": "Producto agregado con exito",
        "status": 1
    });
}

module.exports = controller;