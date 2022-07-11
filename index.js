const app = require('./app');
require('dotenv').config();
const controller = require('./controllers/controller');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto.

app.get('/products/:id', controller.getProduct);

app.get('/products', controller.getAllProducts);

app.post('/products', controller.createProduct);

app.post('/sales', controller.createSale);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
