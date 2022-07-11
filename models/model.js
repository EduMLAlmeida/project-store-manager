const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};

const getProductById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?';
  const [[result]] = await connection.execute(query, [id]);
  return result;
};

const createProduct = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return { id: insertId, name };
};

const getAllSales = async () => {
  const query = 'SELECT * FROM StoreManager.sales';
  const [result] = await connection.execute(query);
  return result;
};

const createSale = async (sale, id) => {
  const query = 'INSERT INTO StoreManager.sales (id) VALUES (?)';
  await connection.execute(query, [id]);
  const columns = 'product_id, sale_id, quantity';
  const query2 = `INSERT INTO StoreManager.sales_products (${columns}) VALUES (?)`;
  const salesData = sale.map((item) => [item.productId, id, item.quantity]);
  salesData.forEach(async (data) => {
    connection.query(query2, [data]);
    return null;
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  getAllSales,
  createSale,
};
