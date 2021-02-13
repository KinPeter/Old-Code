const supertest = require('supertest');
const { handleError } = require('../test-utils');
const request = supertest('http://localhost:3300/users');

describe('Users controller DELETE /{userId}', () => {
  it('should fail with a wrong ID', (done) => {
    request
      .delete(`/userid`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(403)
      .end((err) => handleError(err, done));
  });

  it('should fail without authentication', (done) => {
    request
      .delete(`/${process.env.TP_TEST_USERID}`)
      .expect(401)
      .end((err) => handleError(err, done));
  });

  it('should delete the user', (done) => {
    request
      .delete(`/${process.env.TP_TEST_USERID}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN}`)
      .expect(200)
      .end((err) => handleError(err, done));

    // clean up environment variables
    process.env.TP_TEST_USERID = undefined;
    process.env.TP_TEST_TRIP1_ID = undefined;
    process.env.TP_TEST_TRIP2_ID = undefined;
    process.env.TP_TEST_TRIP3_ID = undefined;
    process.env.TP_TEST_TOKEN = undefined;
  });

  it('should delete the second user', (done) => {
    request
      .delete(`/${process.env.TP_TEST_USERID2}`)
      .set('Authorization', `Bearer ${process.env.TP_TEST_TOKEN2}`)
      .expect(200)
      .end((err) => handleError(err, done));

    // clean up environment variables
    process.env.TP_TEST_USERID2 = undefined;
    process.env.TP_TEST_TOKEN2 = undefined;
  });
});
