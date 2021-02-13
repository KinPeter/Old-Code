const supertest = require('supertest');
const chai = require('chai');

const { user, user2, handleError } = require('../test-utils');

const expect = chai.expect;
const request = supertest('http://localhost:3300/users');

describe('Users controller POST /signup', () => {
  it('should sign a user up and return an ID', (done) => {
    request
      .post('/signup')
      .send(user)
      .expect(201)
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('id');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id.length).to.be.greaterThan(0);
      })
      .end((err) => handleError(err, done));
  });

  it('should sign a new user up and return an ID', (done) => {
    request
      .post('/signup')
      .send(user2)
      .expect(201)
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('id');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id.length).to.be.greaterThan(0);
      })
      .end((err) => handleError(err, done));
  });

  it('should fail with the same email address', (done) => {
    request
      .post('/signup')
      .send(user)
      .expect(409)
      .end((err) => handleError(err, done));
  });

  it('should fail with invalid email address', (done) => {
    request
      .post('/signup')
      .send({
        email: 'not-an-email',
        password: 'TestPass123',
        displayName: 'Test',
      })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail with too weak password', (done) => {
    request
      .post('/signup')
      .send({
        email: 'api-test2@test.com',
        password: 'psw',
        displayName: 'Test',
      })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail without display name', (done) => {
    request
      .post('/signup')
      .send({
        email: 'api-test2@test.com',
        password: 'TestPass123',
      })
      .expect(400)
      .end((err) => handleError(err, done));
  });
});

describe('Users controller POST /login', () => {
  it('should return user information and token', (done) => {
    request
      .post('/login')
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('token');
        expect(res.body.token).to.be.a('string');
        expect(res.body.token.length).to.be.greaterThan(0);
        expect(res.body).to.haveOwnProperty('id');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id.length).to.be.greaterThan(0);
        expect(res.body).to.haveOwnProperty('expiresAt');
        expect(res.body.expiresAt).to.be.a('number');
        expect(res.body).to.haveOwnProperty('displayName');
        expect(res.body.displayName).to.be.a('string');
        expect(res.body.displayName).to.be.equal(user.displayName);
        expect(res.body).to.haveOwnProperty('memberSince');
        expect(res.body).to.haveOwnProperty('numberOfTrips');
        expect(res.body).to.haveOwnProperty('preferredDateFormat');

        process.env.TP_TEST_TOKEN = res.body.token;
        process.env.TP_TEST_USERID = res.body.id;
      })
      .end((err) => handleError(err, done));
  });

  it('should log in a second user', (done) => {
    request
      .post('/login')
      .send(user2)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('token');
        expect(res.body.token).to.be.a('string');

        process.env.TP_TEST_TOKEN2 = res.body.token;
        process.env.TP_TEST_USERID2 = res.body.id;
      })
      .end((err) => handleError(err, done));
  });
});

describe('Users controller POST /token-refresh/{userId}', () => {
  it('should return a new token', (done) => {
    setTimeout(() => {
      // need to wait at least one second to get a different token
      request
        .post(`/token-refresh/${process.env.TP_TEST_USERID}`)
        .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.haveOwnProperty('token');
          expect(res.body.token).to.be.a('string');
          expect(res.body.token.length).to.be.greaterThan(0);
          expect(res.body.token).to.not.equal(process.env.TP_TEST_TOKEN);
          expect(res.body).to.haveOwnProperty('expiresAt');
          expect(res.body.expiresAt).to.be.a('number');

          process.env.TP_TEST_TOKEN = res.body.token;
        })
        .end((err) => handleError(err, done));
    }, 1100);
  });

  it('should fail with wrong user ID', (done) => {
    request
      .post(`/token-refresh/${process.env.TP_TEST_USERID}1`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(403)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .post(`/token-refresh/${process.env.TP_TEST_USERID}`)
      .expect(401)
      .end((err) => handleError(err, done));
  });
});

describe('Users controller GET /{userId}', () => {
  it('should return user information', (done) => {
    request
      .get(`/${process.env.TP_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('id');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id.length).to.be.greaterThan(0);
        expect(res.body).to.haveOwnProperty('displayName');
        expect(res.body.displayName).to.be.a('string');
        expect(res.body.displayName).to.be.equal(user.displayName);
        expect(res.body).to.haveOwnProperty('memberSince');
        expect(res.body).to.haveOwnProperty('numberOfTrips');
        expect(res.body).to.haveOwnProperty('preferredDateFormat');
      })
      .end((err) => handleError(err, done));
  });

  it('should fail with wrong user ID', (done) => {
    request
      .get(`/${process.env.TP_TEST_USERID}1`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(403)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .get(`/${process.env.TP_TEST_USERID}`)
      .expect(401)
      .end((err) => handleError(err, done));
  });
});

describe('Users controller PUT /{userId}', () => {
  it('should update the user info', (done) => {
    request
      .put(`/${process.env.TP_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({
        displayName: 'Changed Name',
        preferredDateFormat: 'yyyy.MM.dd.',
        photoUrl: 'http://www.photos.com/photo.jpg',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('displayName');
        expect(res.body.displayName).to.be.a('string');
        expect(res.body.displayName).to.be.equal('Changed Name');
        expect(res.body).to.haveOwnProperty('preferredDateFormat');
        expect(res.body.preferredDateFormat).to.be.a('string');
        expect(res.body.preferredDateFormat).to.be.equal('yyyy.MM.dd.');
        expect(res.body).to.haveOwnProperty('photoUrl');
        expect(res.body.photoUrl).to.be.a('string');
        expect(res.body.photoUrl).to.be.equal('http://www.photos.com/photo.jpg');

        process.env.TP_TEST_TOKEN = res.body.token;
      })
      .end((err) => handleError(err, done));
  });

  it('should log in again to check updated data', (done) => {
    request
      .post('/login')
      .send(user)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('displayName');
        expect(res.body.displayName).to.be.a('string');
        expect(res.body.displayName).to.be.equal('Changed Name');
        expect(res.body).to.haveOwnProperty('preferredDateFormat');
        expect(res.body.preferredDateFormat).to.be.a('string');
        expect(res.body.preferredDateFormat).to.be.equal('yyyy.MM.dd.');
        expect(res.body).to.haveOwnProperty('photoUrl');
        expect(res.body.photoUrl).to.be.a('string');
        expect(res.body.photoUrl).to.be.equal('http://www.photos.com/photo.jpg');

        process.env.TP_TEST_TOKEN = res.body.token;
      })
      .end((err) => handleError(err, done));
  });

  it('should fail with wrong user ID', (done) => {
    request
      .put(`/${process.env.TP_TEST_USERID}1`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({
        displayName: 'Changed Name',
        preferredDateFormat: 'yyyy.MM.dd.',
        photoUrl: 'http://www.photos.com/photo.jpg',
      })
      .expect(403)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .put(`/${process.env.TP_TEST_USERID}`)
      .send({
        displayName: 'Changed Name',
        preferredDateFormat: 'yyyy.MM.dd.',
        photoUrl: 'http://www.photos.com/photo.jpg',
      })
      .expect(401)
      .end((err) => handleError(err, done));
  });

  it('should fail with invalid date format', (done) => {
    request
      .put(`/${process.env.TP_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({
        displayName: 'Changed Name',
        preferredDateFormat: 'something',
        photoUrl: 'http://www.photos.com/photo.jpg',
      })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail with invalid photo URL', (done) => {
    request
      .put(`/${process.env.TP_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({
        displayName: 'Changed Name',
        preferredDateFormat: 'yyyy.MM.dd.',
        photoUrl: 'not-a-url',
      })
      .expect(400)
      .end((err) => handleError(err, done));
  });
});

describe('Users controller POST /change-password/{userId}', () => {
  it('should change the password of the user', (done) => {
    request
      .post(`/change-password/${process.env.TP_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({
        newPassword: 'NewTest123',
      })
      .expect(200)
      .end((err) => handleError(err, done));
  });

  it('should log in again to check updated password', (done) => {
    request
      .post('/login')
      .send({ ...user, password: 'NewTest123' })
      .expect((res) => {
        process.env.TP_TEST_TOKEN = res.body.token;
      })
      .expect(200)
      .end((err) => handleError(err, done));
  });

  it('should fail to log in with the old password', (done) => {
    request
      .post('/login')
      .send(user)
      .expect(401)
      .end((err) => handleError(err, done));
  });

  it('should fail with a wrong user ID', (done) => {
    request
      .post(`/change-password/${process.env.TP_TEST_USERID}1`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({
        newPassword: 'NewTest123',
      })
      .expect(403)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .post(`/change-password/${process.env.TP_TEST_USERID}`)
      .send({
        newPassword: 'NewTest123',
      })
      .expect(401)
      .end((err) => handleError(err, done));
  });

  it('should fail with a weak password', (done) => {
    request
      .post(`/change-password/${process.env.TP_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({
        newPassword: 't12',
      })
      .expect(400)
      .end((err) => handleError(err, done));
  });
});
