const supertest = require('supertest');
const chai = require('chai');
const { deck1, deck2, deck3, handleError } = require('../test.utils');
const newLink = 'https://www.new-link.com/deck1.tsv';

const expect = chai.expect;
const request = supertest('http://localhost:3300/decks');

describe('Decks controller POST /{userId}', () => {
  it('should create a new deck', (done) => {
    request
      .post(`/${process.env.SC_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .send({ ...deck1, userId: process.env.SC_TEST_USERID })
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('id');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id.length).to.be.greaterThan(0);
        expect(res.body).to.haveOwnProperty('userId');
        expect(res.body.userId).to.be.a('string');
        expect(res.body.userId).to.be.equal(process.env.SC_TEST_USERID);
        expect(res.body).to.haveOwnProperty('name');
        expect(res.body.name).to.be.a('string');
        expect(res.body.name).to.be.equal(deck1.name);
        expect(res.body).to.haveOwnProperty('link');
        expect(res.body.link).to.be.a('string');
        expect(res.body.link).to.be.equal(deck1.link);
        expect(res.body).to.haveOwnProperty('progress');
        expect(JSON.parse(res.body.progress)).to.haveOwnProperty('done');
        expect(JSON.parse(res.body.progress)).to.haveOwnProperty('remaining');
        expect(JSON.parse(res.body.progress)).to.haveOwnProperty('difficult');

        process.env.SC_TEST_DECK1_ID = res.body.id;
      })
      .expect(201)
      .end((err) => handleError(err, done));
  });

  it('should create a second deck', (done) => {
    request
      .post(`/${process.env.SC_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .send({ ...deck2, userId: process.env.SC_TEST_USERID })
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('id');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id.length).to.be.greaterThan(0);

        process.env.SC_TEST_DECK2_ID = res.body.id;
      })
      .expect(201)
      .end((err) => handleError(err, done));
  });

  it('should create a third deck', (done) => {
    request
      .post(`/${process.env.SC_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .send({ ...deck3, userId: process.env.SC_TEST_USERID })
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('id');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id.length).to.be.greaterThan(0);

        process.env.SC_TEST_DECK3_ID = res.body.id;
      })
      .expect(201)
      .end((err) => handleError(err, done));
  });

  it('should fail with a wrong user ID', (done) => {
    request
      .post(`/${process.env.SC_TEST_USERID}a`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .send(deck1)
      .expect(403)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .post(`/${process.env.SC_TEST_USERID}`)
      .send(deck1)
      .expect(401)
      .end((err) => handleError(err, done));
  });

  it('should fail with missing fields', (done) => {
    request
      .post(`/${process.env.SC_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .send({ name: deck1.name, link: deck1.link })
      .expect(400)
      .end((err) => handleError(err, done));
  });
});

describe('Decks controller GET /{userId}', () => {
  it('should return all decks for a user', (done) => {
    request
      .get(`/${process.env.SC_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .expect((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
        expect(res.body[0].id).to.be.equal(process.env.SC_TEST_DECK1_ID);
        expect(res.body[0].userId).to.be.equal(process.env.SC_TEST_USERID);
        expect(res.body[0].name).to.be.equal(deck1.name);
        expect(res.body[1].id).to.be.equal(process.env.SC_TEST_DECK2_ID);
        expect(res.body[1].name).to.be.equal(deck2.name);
      })
      .expect(200)
      .end((err) => handleError(err, done));
  });

  it('should fail with a wrong user ID', (done) => {
    request
      .get(`/${process.env.SC_TEST_USERID}a`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .expect(403)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .get(`/${process.env.SC_TEST_USERID}`)
      .expect(401)
      .end((err) => handleError(err, done));
  });
});

describe('Decks controller GET /{userId}/{deckId}', () => {
  it('should get a deck by its ID', (done) => {
    request
      .get(`/${process.env.SC_TEST_USERID}/${process.env.SC_TEST_DECK2_ID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .expect((res) => {
        expect(res.body.id).to.be.equal(process.env.SC_TEST_DECK2_ID);
        expect(res.body.name).to.be.equal(deck2.name);
        expect(res.body.link).to.be.equal(deck2.link);
        expect(res.body.userId).to.be.equal(process.env.SC_TEST_USERID);
        expect(JSON.parse(res.body.progress)).to.haveOwnProperty('done');
        expect(JSON.parse(res.body.progress).done).to.be.an('array');
        expect(JSON.parse(res.body.progress).done.length).to.be.equal(JSON.parse(deck2.progress).done.length);
      })
      .expect(200)
      .end((err) => handleError(err, done));
  });

  it('should fail with a wrong user ID', (done) => {
    request
      .get(`/${process.env.SC_TEST_USERID}a/${process.env.SC_TEST_DECK2_ID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .expect(403)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .get(`/${process.env.SC_TEST_USERID}/${process.env.SC_TEST_DECK2_ID}`)
      .expect(401)
      .end((err) => handleError(err, done));
  });
});

describe('Decks controller PUT /{userId}/{deckId}', () => {
  it('should update a deck', (done) => {
    request
      .put(`/${process.env.SC_TEST_USERID}/${process.env.SC_TEST_DECK1_ID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .send({
        ...deck1,
        userId: process.env.SC_TEST_USERID,
        link: newLink,
      })
      .expect(202)
      .end((err) => handleError(err, done));
  });

  it('should confirm the update was successful', (done) => {
    request
      .get(`/${process.env.SC_TEST_USERID}/${process.env.SC_TEST_DECK1_ID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .expect((res) => {
        expect(res.body.id).to.be.equal(process.env.SC_TEST_DECK1_ID);
        expect(res.body.name).to.be.equal(deck1.name);
        expect(res.body.link).to.be.equal(newLink);
        expect(res.body.userId).to.be.equal(process.env.SC_TEST_USERID);
        expect(JSON.parse(res.body.progress)).to.haveOwnProperty('difficult');
        expect(JSON.parse(res.body.progress).difficult).to.be.an('array');
        expect(JSON.parse(res.body.progress).difficult.length).to.be.equal(
          JSON.parse(deck1.progress).difficult.length,
        );
      })
      .expect(200)
      .end((err) => handleError(err, done));
  });

  it('should fail with a wrong deck ID', (done) => {
    request
      .put(`/${process.env.SC_TEST_USERID}/5ee9e1d401d599000a1d7a59`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .send({
        ...deck1,
        id: process.env.SC_TEST_DECK1_ID,
        userId: process.env.SC_TEST_USERID,
        link: 'newLink',
      })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail with a wrong user ID', (done) => {
    request
      .put(`/${process.env.SC_TEST_USERID}a/${process.env.SC_TEST_DECK2_ID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .expect(403)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .put(`/${process.env.SC_TEST_USERID}/${process.env.SC_TEST_DECK2_ID}`)
      .expect(401)
      .end((err) => handleError(err, done));
  });
});

describe('Decks controller DELETE /{userId}/{deckId}', () => {
  it('should delete a deck', (done) => {
    request
      .delete(`/${process.env.SC_TEST_USERID}/${process.env.SC_TEST_DECK2_ID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .expect(200)
      .end((err) => handleError(err, done));
  });

  it('should confirm the delete was successful', (done) => {
    request
      .get(`/${process.env.SC_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .expect((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
        expect(res.body[0].id).to.be.equal(process.env.SC_TEST_DECK1_ID);
        expect(res.body[0].name).to.be.equal(deck1.name);
        expect(res.body[1].id).to.be.equal(process.env.SC_TEST_DECK3_ID);
        expect(res.body[1].name).to.be.equal(deck3.name);
      })
      .expect(200)
      .end((err) => handleError(err, done));
  });

  it('should fail with a wrong user ID', (done) => {
    request
      .delete(`/${process.env.SC_TEST_USERID}a/${process.env.SC_TEST_DECK1_ID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .expect(403)
      .end((err) => handleError(err, done));
  });

  it('should fail with a wrong deck ID', (done) => {
    request
      .delete(`/${process.env.SC_TEST_USERID}/5ee9e1d401d599000a1d7a59`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .expect(404)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .delete(`/${process.env.SC_TEST_USERID}/${process.env.SC_TEST_DECK1_ID}`)
      .expect(401)
      .end((err) => handleError(err, done));
  });
});
