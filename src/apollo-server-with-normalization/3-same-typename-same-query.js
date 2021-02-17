//"Different" entities, same typename, same query

const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    title: String
    author: Author
    favorite: Boolean
    classes: [Class]
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
    favoriteBook(title: String!, type: String!): Book
    deleteBook(title: String!): Boolean
  }
`;

const resolvers = {
  Book: {
    __resolveType(book, context, info) {
      if (book) {
        return 'Book';
      }
      return null;
    },
  },
  Query: {
    schoolBooks: () => books,
  },
  Mutation: {
    favoriteBook: async (_, { title, type }) => {
      const favoritedBook = {
        title: title,
        type: type,
        favorite: true,
      };
      return favoritedBook;
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

const serverThree = new ApolloServer({ typeDefs, resolvers });

module.exports = serverThree;
