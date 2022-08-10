const supertest = require('supertest');
const chai = require('chai');

const { user, handleError } = require('../test.utils');

const expect = chai.expect;
const request = supertest('http://localhost:3300/auth');

describe('Auth controller POST /register', () => {
  it('should register a user and return the ID', (done) => {
    request
      .post('/register')
      .send(user)
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('id');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id.length).to.be.greaterThan(0);
      })
      .expect(201)
      .end((err) => handleError(err, done));
  });

  it('should fail with the same email username', (done) => {
    request
      .post('/register')
      .send(user)
      .expect(409)
      .end((err) => handleError(err, done));
  });

  it('should fail with too weak password', (done) => {
    request
      .post('/register')
      .send({
        username: 'api-test2',
        password: '123',
      })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail without username', (done) => {
    request
      .post('/register')
      .send({
        password: 'TestPass123',
      })
      .expect(400)
      .end((err) => handleError(err, done));
  });
});

describe('Auth Controller POST /login', () => {
  it('should log the user in and return user info and token', (done) => {
    request
      .post('/login')
      .send(user)
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('token');
        expect(res.body.token).to.be.a('string');
        expect(res.body.token.length).to.be.greaterThan(0);
        expect(res.body).to.haveOwnProperty('id');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id.length).to.be.greaterThan(0);
        expect(res.body).to.haveOwnProperty('expiresAt');
        expect(res.body.expiresAt).to.be.a('number');
        expect(res.body).to.haveOwnProperty('username');
        expect(res.body.username).to.be.a('string');
        expect(res.body.username).to.be.equal(user.username);

        process.env.SC_TEST_TOKEN = res.body.token;
        process.env.SC_TEST_USERID = res.body.id;
      })
      .expect(200)
      .end((err) => handleError(err, done));
  });

  it('should fail with wrong password', (done) => {
    request
      .post('/login')
      .send({
        username: user.username,
        password: 'wrongOne',
      })
      .expect(401)
      .end((err) => handleError(err, done));
  });

  it('should fail with non existing user', (done) => {
    request
      .post('/login')
      .send({
        username: 'justAUser',
        password: user.password,
      })
      .expect(401)
      .end((err) => handleError(err, done));
  });
});
