const app = require('./app');
require('dotenv').config();
const controller = require('./controllers/controller');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto.

app.get('/products/:id', controller.getProduct);

app.get('/products', controller.getAllProducts);

app.post('/products', controller.createProduct);

app.put('/products/:id', controller.upDateProduct);

app.delete('/products/:id', controller.deleteProduct);

app.get('/sales/:id', controller.getSale);

app.get('/sales', controller.getAllSales);

app.post('/sales', controller.createSale);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
