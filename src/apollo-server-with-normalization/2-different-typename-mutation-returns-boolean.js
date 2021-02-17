//Different entities, different typename

const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  interface Book {
    title: String
    author: Author
    favorite: Boolean
  }

  type TextBook implements Book {
    title: String
    author: Author
    favorite: Boolean
    classes: [Class]
  }

  type ColoringBook implements Book {
    title: String
    author: Author
    favorite: Boolean
    colors: [Color]
  }

  type Author {
    name: String
  }

  type Class {
    name: String
  }

  type Color {
    name: String
  }

  type Query {
    schoolBooks: [Book]
  }

  type Mutation {
    favoriteBook(title: String!, type: String!): Boolean
    deleteBook(title: String!): Boolean
  }
`;

const resolvers = {
  Book: {
    __resolveType(book, context, info) {
      if (book.classes || book.type === 'TextBook') {
        return 'TextBook';
      }

      if (book.colors || book.type === 'ColoringBook') {
        return 'ColoringBook';
      }
      return null;
    },
  },
  Query: {
    schoolBooks: () => books,
  },
  Mutation: {
    favoriteBook: async (_, { title, type }) => {
      return true;
    },
    deleteBook: async (_, { title }) => {
      return true;
    },
  },
};

const books = [
  {
    title: 'Text book 1',
    author: { name: 'Jane Doe' },
    classes: [{ name: 'history' }, { name: 'philosophy' }],
    favorite: false,
  },
  {
    title: 'Color book 1',
    author: { name: 'John Doe' },
    colors: [{ name: 'red' }, { name: 'green' }, { name: 'blue' }],
    favorite: false,
  },
  {
    title: 'Color book 2',
    author: { name: 'Paul Doe' },
    colors: [{ name: 'white' }, { name: 'yellow' }, { name: 'pink' }],
    favorite: false,
  },
];

const serverTwo = new ApolloServer({ typeDefs, resolvers });

module.exports = serverTwo;