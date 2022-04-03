import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  const validUser = {
    "email": "admin@admin.com",
    "password": "secret_admin"
  };

  describe('Post para autenticação de usuário', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves({
          id: 1,
          username: 'Admin',
          email: 'admin@admin.com',
          role: 'admin'
        } as User);

      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(validUser);
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Recebe um token de autenticação na response', async () => {
      expect(chaiHttpResponse).to.have.property('token');
    });

    it('Recebe dados do usuário na response', async () => {
      expect(chaiHttpResponse).to.have.property('user');
    });

    it('Recebe status 200 com envio de body válido', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });  
  });

  describe('Post para autenticação de usuário com email inválido', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(null)

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          "email": "wrongadmin@admin.com",
          "password": "secret_admin"
        });
    })

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Recebe status 401 com envio de email inválido', async () => {   
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('A response possui a propriedade "message"', async () => {   
      expect(chaiHttpResponse).to.have.property('message');
    });

    it('A response.message possui o texto "Incorrect email or password"', async () => {
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('Post para autenticação de usuário com password inválido', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(null)

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          "email": "admin@admin.com",
          "password": "secret"
        });
    })

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Recebe status 401 com envio de password inválido', async () => {   
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('A response possui a propriedade "message"', async () => {   
      expect(chaiHttpResponse).to.have.property('message');
    });

    it('A response.message possui o texto "Incorrect email or password"', async () => {
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });
});
