const bd = require('../config/oracle');

const controller = {};

controller.addCategoryTo = async (req, res) => {
  const { product, category } = req.body;
  sql = 'insert into det_prod_cat( product_prod_id, category_cat_name ) values (:product, :category)';
  await bd.Open(sql, [product, category], true);
  res.status(200).json({
    "msg": "Relacion agregada con exito",
    "status": 1
  });
}

controller.addProduct = async (req,res) => 
{
  // Obtener los datos del registro
  const { id, url, description, price , idate, cant, colors, email} = req.body;
  // Ingresar al usuario en la base de datos 
  sql = 'insert into PRODUCT(  PROD_ID, PROD_IMG_URL, PROD_DESC, PROD_PRICE, ' +     
    'PROD_CANT, PROD_INITIAL_DATE, PROD_COLORS, USER_USER_EMAIL,PROD_DISP' + 
    ') values (:id, :url, :description, :price, :cant, TO_DATE(:idate, \'DD/MM/YY\'), :colors, :email, 1)';
    // Haciendo la consulta
    console.log("data: ",[id, url, description, price,cant, idate, colors, email,1]);
    await bd.Open(sql, [id, url, description, price, cant, idate, colors, email], true);
    res.status(200).json({
      "msg": "Producto agregado con exito",
      "status": 1
    });
}

controller.getProducts = async (req,res) => {
  sql = 'select * from PRODUCT where PROD_DISP = 1';
  let result = await bd.Open(sql,[],false);
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