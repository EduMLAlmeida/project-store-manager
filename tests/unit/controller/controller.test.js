const { expect } = require('chai');
const controller = require('../../../controllers/controller');
const service = require('../../../services/service');
const sinon = require('sinon');

describe('Camada controller.', function () {
  describe('Função createSale.', function () {
    it('Valida requisição correta.', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = {
        productId: 1,
        quantity: 1
      };

      sinon.stub(service, 'validateSale').resolves(true);

      sinon.stub(service, 'createSale').resolves({
        code: 201, message: { id: 1, itemsSold: req.body }
      });

      await controller.createSale(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
      service.validateSale.restore();
      service.createSale.restore();
    });
  });

  describe('Função createProduct.', function () {
    it('Valida requisição correta.', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = {
        name: 'ProdutoX'
      };

      sinon.stub(service, 'createProduct').resolves({
        code: 201,
        result: req.body,
      });

      await controller.createProduct(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });  
});