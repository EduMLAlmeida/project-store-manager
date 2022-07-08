const bodyParser = require('body-parser');
const app = require('../app');
const connection = require('./connection');

app.use(bodyParser.json());

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id=?';
  const [[result]] = await connection.execute(query, [id]);
  return result;
};

const create = async ({ name }) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return { id: insertId, name };
};

module.exports = {
  getAll,
  getById,
  create,
};
