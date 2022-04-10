import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/Match';
import { Response } from 'superagent';
import matchs from './Mocks/matchs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /matchs', () => {
  describe('Get /matchs', () => {
    let chaiHttpResponse: Response;
    
    before(async () => {
      sinon.stub(Match, 'findAll')
            .resolves(matchs as Match[]); 

      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs');
    })

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })

    it('Recebe status 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('A requisição GET para a rota traz uma lista inicial contendo 5 registros de matchs', async () => {
      expect(chaiHttpResponse.body).to.have.length(5);
    });
  });

  describe('Post para criação de partida', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "create")
        .resolves({
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: true,
        } as Match);

      chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ5NjA1OTMwLCJleHAiOjE2NDk2OTIzMzB9.OO2Y74cBoiMVFho3VWJP02vzYQ90g61WPkgk8w2qPEE')
      .send({ 
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
      });
    });

    after(()=>{
      (Match.create as sinon.SinonStub).restore();
    })

    it('Recebe dados da partida na response', async () => {
      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify(matchs[0]));
    });

    it('Recebe status 201 com envio de body válido', async () => {
      expect(chaiHttpResponse).to.have.status(201);
    });

    it('Recebe status 401 se não tiver um token válido', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .send({ 
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
      });

      expect(chaiHttpResponse).to.have.status(401);
    });

    it('Recebe status 401 se os times forem iguais', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ5NjA1OTMwLCJleHAiOjE2NDk2OTIzMzB9.OO2Y74cBoiMVFho3VWJP02vzYQ90g61WPkgk8w2qPEE')
      .send({ 
        homeTeam: 8,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
      });

      expect(chaiHttpResponse).to.have.status(401);
    });

    it('Recebe a mensagem "It is not possible to create a match with two equal teams" se os times forem iguais', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ5NjA1OTMwLCJleHAiOjE2NDk2OTIzMzB9.OO2Y74cBoiMVFho3VWJP02vzYQ90g61WPkgk8w2qPEE')
      .send({ 
        homeTeam: 8,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
      });

      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify({ message: 'It is not possible to create a match with two equal teams'}));
    });

    it('Recebe status 401 se os times não existirem', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ5NjA1OTMwLCJleHAiOjE2NDk2OTIzMzB9.OO2Y74cBoiMVFho3VWJP02vzYQ90g61WPkgk8w2qPEE')
      .send({ 
        homeTeam: 100,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
      });

      expect(chaiHttpResponse).to.have.status(401);
    });

    it('Recebe a mensagem "There is no team with such id!" se os times forem iguais', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQ5NjA1OTMwLCJleHAiOjE2NDk2OTIzMzB9.OO2Y74cBoiMVFho3VWJP02vzYQ90g61WPkgk8w2qPEE')
      .send({ 
        homeTeam: 8,
        homeTeamGoals: 1,
        awayTeam: 100,
        awayTeamGoals: 1,
      });

      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify({ message: 'There is no team with such id!'}));
    });
  });

  describe('Patch para finalizar partidas', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "update")
        .resolves();

      chaiHttpResponse = await chai
      .request(app)
      .patch(`/matchs/${1}/finish`)
      .set('content-type', 'application/json')
    });

    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })

    it('Recebe a mensagem "Match ended successfully!"', async () => {
      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify({ message: 'Match ended successfully!' }));
    });

    it('Recebe status 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  });

  describe('Patch para finalizar partidas', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "update")
        .resolves();

      chaiHttpResponse = await chai
      .request(app)
      .patch(`/matchs/${1}`)
      .set('content-type', 'application/json')
      .send({
        homeTeamGoals: 10,
        awayTeamGoals: 8
      })
    });

    after(()=>{
      (Match.update as sinon.SinonStub).restore();
    })

    it('Recebe a mensagem "Match score updated successfully!"', async () => {
      expect(chaiHttpResponse.text).to.be.equal(JSON.stringify({ message: 'Match score updated successfully!' }));
    });

    it('Recebe status 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  });
});

