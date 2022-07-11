const model = require('../models/model');

const service = {
  async get(id) {
    const product = await model.getById(id);
    if (!product) return { code: 404, product: { message: 'Product not found' } };
    return { code: 200, product };
  },
  async getAll() {
    const products = await model.getAll();
    return { code: 200, products };
  },
  async create(product) {
    const result = await model.create(product);
    return { code: 201, result };
  },
  validateName(product) {
    const message1 = '"name" is required';
    const message2 = '"name" length must be at least 5 characters long';
    if (!product.name) {
      return {
        validation: false,
        result: { code: 400, message: { message: message1 } },
      };
    }
    if (product.name.length < 5) {
      return {
        validation: false,
        result: { code: 422, message: { message: message2 } },
      };
    }
    return { validation: true };
  },
};

module.exports = service;
