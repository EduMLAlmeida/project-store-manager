const { expect } = require('chai');
const service = require('../../../services/service');

const sale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

describe('Camada service.', function () {
  describe('Função validateSale.', function () {
    it('Valida requisição correta.', async function () {
      const result = await service.validateSale(sale);
      expect(result).to.be.eq(true);
    });
  });
});