const supertest = require('supertest');
const { handleError } = require('../test.utils');
const request = supertest('http://localhost:3300/user');

describe('User controller DELETE /{userId}', () => {
  it('should fail with a wrong ID', (done) => {
    request
      .delete(`/userid`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .expect(403)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .delete(`/${process.env.SC_TEST_USERID}`)
      .expect(401)
      .end((err) => handleError(err, done));
  });

  it('should delete the user', (done) => {
    request
      .delete(`/${process.env.SC_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.SC_TEST_TOKEN}`)
      .expect(200)
      .end((err) => handleError(err, done));

    // clean up environment variables
    process.env.SC_TEST_USERID = undefined;
    process.env.SC_TEST_TOKEN = undefined;
    process.env.SC_TEST_DECK1_ID = undefined;
    process.env.SC_TEST_DECK2_ID = undefined;
    process.env.SC_TEST_DECK3_ID = undefined;
  });
});
