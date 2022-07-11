const service = require('../services/service');

const controller = {
  async getProduct(req, res) {
    const id = Number(req.params.id);
    const result = await service.get(id);
    return res.status(result.code).json(result.product);
  },
  async getAllProducts(_req, res) {
    const result = await service.getAll();
    return res.status(result.code).json(result.products);
  },
  async createProduct(req, res) {
    const product = req.body;
    const isValid = service.validateName(product);
    if (!isValid.validation) {
      console.log('isValid.result', isValid.result);
      const { code, message } = isValid.result;
      console.log('code', code);
      console.log('message', message);
      return res.status(code).json(message);
    }
    const result = await service.create(product);
    return res.status(result.code).json(result.result);
  },
};

module.exports = controller;
