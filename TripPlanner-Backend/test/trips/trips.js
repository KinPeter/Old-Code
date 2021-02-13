const supertest = require('supertest');
const chai = require('chai');

const { trip1, trip2, trip3, trip4, handleError, testDate } = require('../test-utils');

const expect = chai.expect;
const request = supertest('http://localhost:3300/trips');

describe('Trips controller POST /', () => {
  it('should create a new trip', (done) => {
    request
      .post(`/`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send(trip1)
      .expect(201)
      .expect((res) => {
        expect(res.body).to.haveOwnProperty('id');
        expect(res.body.id).to.be.a('string');
        expect(res.body.id.length).to.be.greaterThan(0);
        expect(res.body).to.haveOwnProperty('userId');
        expect(res.body.userId).to.be.a('string');
        expect(res.body.userId).to.be.equal(process.env.TP_TEST_USERID);
        expect(res.body).to.haveOwnProperty('title');
        expect(res.body.title).to.be.a('string');
        expect(res.body.title).to.be.equal(trip1.title);
        expect(res.body).to.haveOwnProperty('startingDate');
        expect(testDate(res.body.startingDate)).to.be.true;
        expect(res.body).to.haveOwnProperty('endingDate');
        expect(testDate(res.body.endingDate)).to.be.true;
        expect(res.body).to.haveOwnProperty('countries');
        expect(res.body.countries).to.be.an('array');
        expect(res.body.countries.length).to.be.equal(trip1.countries.length);
        expect(res.body).to.haveOwnProperty('days');
        expect(JSON.parse(res.body.days)).to.haveOwnProperty('days');

        process.env.TP_TEST_TRIP1_ID = res.body.id;
      })
      .end((err) => handleError(err, done));
  });

  it('should create a second trip', (done) => {
    request
      .post(`/`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send(trip2)
      .expect(201)
      .expect((res) => {
        process.env.TP_TEST_TRIP2_ID = res.body.id;
      })
      .end((err) => handleError(err, done));
  });

  it('should create a third trip', (done) => {
    request
      .post(`/`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send(trip3)
      .expect(201)
      .expect((res) => {
        process.env.TP_TEST_TRIP3_ID = res.body.id;
      })
      .end((err) => handleError(err, done));
  });

  it('should create a trip for the second user', (done) => {
    request
      .post(`/`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN2}`)
      .send(trip4)
      .expect(201)
      .expect((res) => {
        process.env.TP_TEST_TRIP4_ID = res.body.id;
      })
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .post(`/`)
      .send(trip2)
      .expect(401)
      .end((err) => handleError(err, done));
  });

  it('should fail with missing fields', (done) => {
    request
      .post(`/`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({ title: trip1.title, startingDate: trip1.startingDate })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail with invalid title', (done) => {
    request
      .post(`/`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({ ...trip2, title: 123 })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail with invalid starting date', (done) => {
    request
      .post(`/`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({ ...trip2, startingDate: 'not-a-date' })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail with invalid ending date', (done) => {
    request
      .post(`/`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({ ...trip2, endingDate: 'not-a-date' })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail with invalid image url', (done) => {
    request
      .post(`/`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({ ...trip2, coverImageUrl: 'not-a-url' })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail with invalid countries', (done) => {
    request
      .post(`/`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({ ...trip2, countries: 123 })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail with non-string countries', (done) => {
    request
      .post(`/`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({ ...trip2, countries: [1, 2, 3] })
      .expect(400)
      .end((err) => handleError(err, done));
  });
});

describe('Trips controller GET /{tripId}', () => {
  it('should get a trip by ID', (done) => {
    request
      .get(`/${process.env.TP_TEST_TRIP1_ID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).to.be.equal(process.env.TP_TEST_TRIP1_ID);
        expect(res.body.userId).to.be.equal(process.env.TP_TEST_USERID);
        expect(res.body.title).to.be.equal(trip1.title);
        expect(res.body.startingDate).to.be.equal(trip1.startingDate);
        expect(res.body.endingDate).to.be.equal(trip1.endingDate);
        expect(res.body.coverImageUrl).to.be.equal(trip1.coverImageUrl);
        expect(res.body.countries[0]).to.be.equal(trip1.countries[0]);
        expect(res.body.days).to.be.equal(trip1.days);
      })
      .end((err) => handleError(err, done));
  });

  it('should fail with wrong trip ID', (done) => {
    request
      .get(`/5f5c7e847f5ed00584514144`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(404)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .get(`/${process.env.TP_TEST_TRIP1_ID}`)
      .expect(401)
      .end((err) => handleError(err, done));
  });
});

describe('Trips controller GET /all/{userId}', () => {
  it('should get all trips for a user', (done) => {
    request
      .get(`/all/${process.env.TP_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
        expect(res.body[0].id).to.be.equal(process.env.TP_TEST_TRIP1_ID);
        expect(res.body[0].userId).to.be.equal(process.env.TP_TEST_USERID);
        expect(res.body[0].startingDate).to.be.equal(trip1.startingDate);
        expect(res.body[1].id).to.be.equal(process.env.TP_TEST_TRIP2_ID);
        expect(res.body[1].title).to.be.equal(trip2.title);
        expect(res.body[1].countries.length).to.equal(trip2.countries.length);
        expect(res.body[2].id).to.be.equal(process.env.TP_TEST_TRIP3_ID);
        expect(res.body[2].title).to.be.equal(trip3.title);
        expect(res.body[2].countries.length).to.equal(trip3.countries.length);
      })
      .end((err) => handleError(err, done));
  });

  it('should fail with wrong user ID', (done) => {
    request
      .get(`/all/${process.env.TP_TEST_USERID2}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(403)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .get(`/all/${process.env.TP_TEST_USERID}`)
      .expect(401)
      .end((err) => handleError(err, done));
  });
});

describe('Trips controller PUT /{tripId}', () => {
  it('should update trip data', (done) => {
    request
      .put(`/${process.env.TP_TEST_TRIP1_ID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({
        ...trip1,
        title: 'New title',
        countries: ['KOREA', 'TAIWAN', 'JAPAN'],
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.id).to.be.equal(process.env.TP_TEST_TRIP1_ID);
        expect(res.body.title).to.be.equal('New title');
        expect(res.body.startingDate).to.be.equal(trip1.startingDate);
        expect(res.body.endingDate).to.be.equal(trip1.endingDate);
        expect(res.body.countries[2]).to.be.equal('JAPAN');
      })
      .expect(200)
      .end((err) => handleError(err, done));
  });

  it('should get and check updated trip data', (done) => {
    request
      .get(`/${process.env.TP_TEST_TRIP1_ID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).to.be.equal(process.env.TP_TEST_TRIP1_ID);
        expect(res.body.title).to.be.equal('New title');
        expect(res.body.startingDate).to.be.equal(trip1.startingDate);
        expect(res.body.endingDate).to.be.equal(trip1.endingDate);
        expect(res.body.countries[2]).to.be.equal('JAPAN');
      })
      .end((err) => handleError(err, done));
  });

  it('should fail with invalid countries data', (done) => {
    request
      .put(`/${process.env.TP_TEST_TRIP1_ID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({ ...trip1, countries: 'KOREA, TAIWAN, JAPAN' })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail with invalid starting date', (done) => {
    request
      .put(`/${process.env.TP_TEST_TRIP1_ID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({ ...trip1, startingDate: 'tomorrow' })
      .expect(400)
      .end((err) => handleError(err, done));
  });

  it('should fail with invalid tripId', (done) => {
    request
      .put(`/5f5c7e847f5ed00584514144`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .send({
        ...trip1,
        title: 'New title',
        countries: ['KOREA', 'TAIWAN', 'JAPAN'],
      })
      .expect(404)
      .end((err) => handleError(err, done));
  });
});

describe('Trips controller DELETE /{tripId}', () => {
  it('should delete the trip by id', (done) => {
    request
      .delete(`/${process.env.TP_TEST_TRIP2_ID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(200)
      .end((err) => handleError(err, done));
  });

  it('should try to get deleted trip and fail', (done) => {
    request
      .get(`/${process.env.TP_TEST_TRIP2_ID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(404)
      .end((err) => handleError(err, done));
  });

  it('should fail with wrong trip ID', (done) => {
    request
      .delete(`/5f5c86fd8bc8f427d06aa05e`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(404)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .delete(`/${process.env.TP_TEST_TRIP3_ID}`)
      .expect(401)
      .end((err) => handleError(err, done));
  });
});
