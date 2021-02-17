const { serverOne, serverTwo, serverThree, serverFour } = require('./index.js');

serverOne.listen({ port: 4001 }).then(({ url }) => {
  console.log(`[1] - 🚀  Apollo Server with Normalization ready at ${url}`);
});

serverTwo.listen({ port: 4002 }).then(({ url }) => {
  console.log(`[2] - 🚀  Apollo Server with Normalization ready at ${url}`);
});

serverThree.listen({ port: 4003 }).then(({ url }) => {
  console.log(`[3] - 🚀  Apollo Server with Normalization ready at ${url}`);
});

serverFour.listen({ port: 4004 }).then(({ url }) => {
  console.log(`[4] - 🚀  Apollo Server with Normalization ready at ${url}`);
});
