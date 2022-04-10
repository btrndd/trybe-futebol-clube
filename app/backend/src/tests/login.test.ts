import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/User';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  describe('Post para autenticação de usuário', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves({
          id: 1,
          username: 'Admin',
          email: 'admin@admin.com',
          role: 'admin',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        } as User);

      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Recebe um token de autenticação na response', async () => {
      expect(chaiHttpResponse.body).to.have.property('token');
    });

    it('Recebe dados do usuário na response', async () => {
      expect(chaiHttpResponse.body).to.have.property('user');
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
      expect(chaiHttpResponse.body).to.have.property('message');
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
      expect(chaiHttpResponse.body).to.have.property('message');
    });

    it('A response.message possui o texto "Incorrect email or password"', async () => {
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('Get /login/validate para autenticação de usuário', () => {
    let chaiHttpResponse: Response;
    
    before(async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ5NjEyNjEzLCJleHAiOjE2NDk2OTkwMTN9.18uC-xwPggalXefiBD6p7kK_UB-qybkTdQ_A6h0ar9Y';

        chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set({ "Authorization": `${token}` });
    })

    it('Recebe status 200 com token válido', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A response possui uma string informando o role do usuário', async () => {
      expect(chaiHttpResponse.body).to.be.equal('admin');
    });
  });
});
