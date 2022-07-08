const app = require('./app');
require('dotenv').config();
const model = require('./models/model');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto.

app.get('/products/:id', async (req, res) => {
  const id = Number(req.params.id);
  const product = await model.getById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
});

app.get('/products', async (_req, res) => {
  const products = await model.getAll();
  return res.status(200).json(products);
});

app.post('/products', async (req, res) => {
  const product = req.body;
  const result = await model.create(product);
  return res.status(201).json(result);
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
