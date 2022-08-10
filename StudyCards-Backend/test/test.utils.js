module.exports = {
  user: {
    username: 'api-test',
    password: 'pass123',
  },

  deck1: {
    name: 'Deck 1',
    link: 'https://link.to.deck/first.tsv',
    progress: JSON.stringify({ remaining: [1, 2, 3, 4], difficult: [5, 6], done: [7, 8, 9, 10] }),
  },

  deck2: {
    name: 'Deck 2',
    link: 'https://link.to.deck/second.tsv',
    progress: JSON.stringify({ remaining: [1, 2, 3, 4], difficult: [5, 6], done: [7, 8, 9, 10] }),
  },

  deck3: {
    name: 'Deck 3',
    link: 'https://link.to.deck/third.tsv',
    progress: JSON.stringify({ remaining: [1, 2, 3, 4], difficult: [5, 6], done: [7, 8, 9, 10] }),
  },

  handleError(error, done) {
    if (error) {
      console.log('[ERROR RESPONSE]');
      console.log(error);
      return done(error);
    }
    done();
  },
};
