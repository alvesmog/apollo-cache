const serverOne = require('./1-different-typename-mutation-returns-typename');
const serverTwo = require('./2-different-typename-mutation-returns-boolean');
const serverThree = require('./3-same-typename-same-query');
const serverFour = require('./4-same-typename-different-queries');

module.exports = { serverOne, serverTwo, serverThree, serverFour }
