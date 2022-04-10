import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import Club from '../database/models/Club';
import { Response } from 'superagent';
import clubs from './Mocks/clubs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /clubs', () => {
  describe('Get /clubs', () => {
    let chaiHttpResponse: Response;
    
    before(async () => {
      sinon.stub(Club, 'findAll')
            .resolves(clubs as Club[]); 

      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs');
    })

    after(()=>{
      (Club.findAll as sinon.SinonStub).restore();
    })

    it('Recebe status 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A requisição GET para a rota traz uma lista inicial contendo 16 registros de clubs', async () => {
      expect(chaiHttpResponse.body).to.have.length(16);
    });
  });

  describe('Get /clubs/:id', () => {
    let chaiHttpResponse: Response;
    const index = 1;
    
    before(async () => {
      sinon.stub(Club, 'findByPk')
            .resolves(clubs[index - 1] as Club); 

      chaiHttpResponse = await chai
        .request(app)
        .get(`/clubs/${index}`);
    })

    after(()=>{
      (Club.findByPk as sinon.SinonStub).restore();
    })

    it('Recebe status 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A requisição GET para a rota traz apenas 1 registro de clubs', async () => {
      expect([chaiHttpResponse.body]).to.have.length(1);
    });

    it('A requisição GET para a rota 1 registro de clubs com o mesmo id da rota', async () => {
      expect(chaiHttpResponse.body.id).to.be.equal(index);
    });
  });
});
