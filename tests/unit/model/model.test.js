const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../models/model');
const execute = require('../../../models/connection');
const connection = require('../../../models/connection');

const dbMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  }
];

describe('Camada model.', function () {
  describe('Função getAllProducts.', function () {
    it('Retorna a lista de produtos corretamente.', async function () {
      sinon.stub(connection, 'execute').resolves([dbMock]);
      const result = await model.getAllProducts();
      expect(result).to.be.eq(dbMock);
      connection.execute.restore();
    });
  });
  
  describe('Função getAllProducts.', function () {
    it('Retorna o produto corretamente.', async function () {
      sinon.stub(connection, 'execute').resolves([dbMock[1]]);
      const result = await model.getAllProducts(2);
      const expected = dbMock[1];
      expect(result).to.be.eq(expected);
      connection.execute.restore();
    });
  });
});
