module.exports = {
  user: {
    email: 'api-test@test.com',
    password: 'TestPass123',
    displayName: 'Test User',
  },

  user2: {
    email: 'api-test2@test.com',
    password: 'TestPass123',
    displayName: 'Test User 2',
  },

  trip1: {
    title: 'Test trip 1',
    startingDate: new Date('2022.05.10').toISOString(),
    endingDate: new Date('2022.05.20').toISOString(),
    coverImageUrl: 'https://nice.image.of.korea.jpg',
    countries: ['KOREA', 'TAIWAN'],
    days: JSON.stringify({ days: ['days'] }),
  },

  trip2: {
    title: 'Test trip 2',
    startingDate: new Date('2022.07.10').toISOString(),
    endingDate: new Date('2022.07.20').toISOString(),
    coverImageUrl: null,
    countries: ['USA', 'MEXICO'],
    days: JSON.stringify({ days: ['days'] }),
  },

  trip3: {
    title: 'Test trip 3',
    startingDate: new Date('2022.09.10').toISOString(),
    endingDate: new Date('2022.09.20').toISOString(),
    coverImageUrl: null,
    countries: ['THAILAND'],
    days: JSON.stringify({ days: ['days'] }),
  },

  trip4: {
    title: 'Test trip 4',
    startingDate: new Date('2022.10.10').toISOString(),
    endingDate: new Date('2022.10.20').toISOString(),
    coverImageUrl: null,
    countries: ['THAILAND'],
    days: JSON.stringify({ days: ['days'] }),
  },

  handleError(error, done) {
    if (error) {
      console.log('[ERROR RESPONSE]: ', error.message);
      return done(error);
    }
    done();
  },

  testDate(string) {
    const dateRegex = new RegExp(/^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$/);
    return dateRegex.test(string);
  },
};
