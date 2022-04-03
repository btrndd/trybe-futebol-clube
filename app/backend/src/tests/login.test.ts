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

});
