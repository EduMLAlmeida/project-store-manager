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

const getDetailedSales = async () => {
  const column1 = 'sp.sale_id';
  const column2 = 'sa.date';
  const column3 = 'sp.product_id';
  const column4 = 'sp.quantity';
  const sp = 'StoreManager.sales_products';
  const sa = 'StoreManager.sales';
  const selected = `${column1}, ${column2}, ${column3},  ${column4}`;
  const query = `SELECT ${selected} FROM ${sp} AS sp INNER JOIN ${sa} AS sa ON sp.sale_id = sa.id`;
  const [result] = await connection.execute(query);
  return result;
};

const getSaleById = async (id) => {
  const column1 = 'sp.sale_id';
  const column2 = 'sa.date';
  const column3 = 'sp.product_id';
  const column4 = 'sp.quantity';
  const sp = 'StoreManager.sales_products';
  const sa = 'StoreManager.sales';
  const col = `${column1}, ${column2}, ${column3},  ${column4}`;
  const si = 'sp.sale_id';
  const query = `SELECT ${col} FROM ${sp} AS sp INNER JOIN ${sa} AS sa ON ${si} = sa.id WHERE id=?`;
  const [result] = await connection.execute(query, [id]);
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
  getSaleById,
  getDetailedSales,
  createSale,
};
