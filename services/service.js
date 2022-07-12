const model = require('../models/model');

const service = {
  async getProduct(id) {
    const product = await model.getProductById(id);
    if (!product) return { code: 404, product: { message: 'Product not found' } };
    return { code: 200, product };
  },

  async getAllProducts() {
    const products = await model.getAllProducts();
    return { code: 200, products };
  },

  async createProduct(product) {
    const result = await model.createProduct(product);
    return { code: 201, result };
  },

  async upDateProduct(newProduct, id) {
    const oldProduct = await model.getProductById(id);
    if (!oldProduct) return { code: 404, result: { message: 'Product not found' } };
    await model.upDateProduct(newProduct, id);
    const { name } = newProduct;
    return { code: 200, result: { id, name } };
  },

  async deleteProduct(id) {
    const product = await model.getProductById(id);
    if (!product) return { code: 404, result: { message: 'Product not found' } };
    await model.deleteProduct(id);
    return { code: 204 };
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

  validateProductField(sale) {
    const validationArray = sale.map((element) => !!element.productId);
    const isValid = validationArray.every((element) => !!element);
    return isValid;
  },

  validateQuantityField(sale) {
    const validationArray = sale.map((element) => element.quantity !== undefined);
    const isValid = validationArray.every((element) => !!element);
    return isValid;
  },

  validateQuantity(sale) {
    const validationArray = sale.map((element) => element.quantity > 0);
    const isValid = validationArray.every((element) => !!element);
    return isValid;
  },

  async validateProduct(sale) {
    const products = await model.getAllProducts();
    const productIds = products.map((element) => element.id);
    const validationArray = sale.map((element) => productIds.includes(element.productId));
    const isValid = validationArray.every((element) => !!element);
    return isValid;
  },

  async validateSale(sale) {
    const message1 = '"productId" is required';
    const message2 = '"quantity" is required';
    const message3 = '"quantity" must be greater than or equal to 1';
    const message4 = 'Product not found';
    const productFieldValidation = this.validateProductField(sale);
    if (!productFieldValidation) return { code: 400, message: { message: message1 } };
    const quantityFieldValidation = this.validateQuantityField(sale);
    if (!quantityFieldValidation) return { code: 400, message: { message: message2 } };
    const quantityValidation = this.validateQuantity(sale);
    if (!quantityValidation) {
      return { code: 422, message: { message: message3 } };
    }
    const productValidation = await this.validateProduct(sale);
    if (!productValidation) return { code: 404, message: { message: message4 } };
    return true;
  },

  // funcao para extrair maior numero do array(linha 86) retirada de https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/max
  async createSale(newSale) {
    const sales = await model.getAllSales();
    const salesIds = sales.map((element) => element.id);
    const id = salesIds.reduce((a, b) => Math.max(a, b), -Infinity) + 1;
    await model.createSale(newSale, id);
    return { code: 201, message: { id, itemsSold: newSale } };
  },

  async getSale(id) {
    const sale = await model.getSaleById(id);
    if (sale.length === 0) return { code: 404, result: { message: 'Sale not found' } };
    const result = sale.map((element) => {
      const { date, quantity } = element;
      const productId = element.product_id;
      const object = {
        date,
        productId,
        quantity,
      };
      return object;
    });
    return { code: 200, result };
  },

  async getAllSales() {
    const sales = await model.getDetailedSales();
    const result = sales.map((element) => {
      const { date, quantity } = element;
      const saleId = element.sale_id;
      const productId = element.product_id;
      const object = {
        saleId,
        date,
        productId,
        quantity,
      };
      return object;
    });
    return { code: 200, result };
  },
};

module.exports = service;
