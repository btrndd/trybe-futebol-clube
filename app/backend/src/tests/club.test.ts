import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/User';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /clubs', () => {
  describe('Get /login/validate para autenticação de usuário', () => {
    let chaiHttpResponse: Response;
    
    before(async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ5MDIyNzA0LCJleHAiOjE2NDkxMDkxMDR9.582V8iL7oTTP7KQg1FC_TgNjKLSJ73dz1T1H3q2jw1M';

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
