const bodyParser = require('body-parser');
const app = require('../app');
const service = require('../services/service');

app.use(bodyParser.json());

const controller = {
  async getProduct(req, res) {
    const id = Number(req.params.id);
    const result = await service.getProduct(id);
    return res.status(result.code).json(result.product);
  },

  async getAllProducts(_req, res) {
    const result = await service.getAllProducts();
    return res.status(result.code).json(result.products);
  },

  async createProduct(req, res) {
    const product = req.body;
    const isValid = service.validateName(product);
    if (!isValid.validation) {
      const { code, message } = isValid.result;
      return res.status(code).json(message);
    }
    const result = await service.createProduct(product);
    return res.status(result.code).json(result.result);
  },

  async upDateProduct(req, res) {
    const id = Number(req.params.id);
    const product = req.body;  
    const isValid = service.validateName(product);
    if (!isValid.validation) {
      const { code, message } = isValid.result;
      return res.status(code).json(message);
    }
    const result = await service.upDateProduct(product, id);
    return res.status(result.code).json(result.result);
  },

  async deleteProduct(req, res) {
    const id = Number(req.params.id);
    const result = await service.deleteProduct(id);
    return res.status(result.code).json(result.result);
  },

  async createSale(req, res) {
    const sale = req.body;
    const saleValidation = await service.validateSale(sale);
    if (saleValidation !== true) {
      const { code, message } = saleValidation;
      return res.status(code).json(message);
    }
    const result = await service.createSale(sale);
    return res.status(result.code).json(result.message);
  },

  async getSale(req, res) {
    const id = Number(req.params.id);
    const result = await service.getSale(id);
    return res.status(result.code).json(result.result);
  },

  async getAllSales(_req, res) {
    const result = await service.getAllSales();
    return res.status(result.code).json(result.result);
  },
};

module.exports = controller;
