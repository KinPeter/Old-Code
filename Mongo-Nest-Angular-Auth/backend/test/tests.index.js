// Order is important, 'users_delete' should be the last one to run
// so we can use one user for the whole test suite and get rid of test
// data at the end
require('./app');
require('./users/users');
require('./trips/trips');
require('./users/users_delete');
