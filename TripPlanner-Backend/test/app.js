const supertest = require('supertest');
const chai = require('chai');

const expect = chai.expect;
const request = supertest('http://localhost:3300');

describe('App controller GET /', () => {
  it('should return a message', (done) => {
    request
      .get('/')
      .expect((res) => {
        expect(res.text).to.equal('Hello from the TripPlanner API!');
      })
      .expect(200)
      .end(done);
  });
});
