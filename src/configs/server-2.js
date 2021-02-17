import { gql } from '@apollo/client';

const serverTwoOptions = {
  queries: [gql`
    query {
      schoolBooks {
        __typename
        title
        author {
          name
        }
        favorite
        ... on TextBook {
          __typename
          classes {
            name
          }
        }
        ... on ColoringBook {
          __typename
          colors {
            name
          }
        }
      }
    }
  `],
  mutations: {
    favoriteBook: gql`
      mutation FavoriteBook($title: String!, $type: String!) {
        favoriteBook(title: $title, type: $type)
      }
    `,
    deleteBook: gql`
      mutation DeleteBook($title: String!) {
        deleteBook(title: $title)
      }
    `,
  },
  cacheQueries: {
    coloringBooksQuery: gql`
      query GetColoringBooks {
        coloringBooks @client {
          author
          colors
          title
          favorite
        }
      }
    `,
    textBooksQuery: gql`
      query GetTextBooks {
        textBooks @client {
          author
          classes
          title
          favorite
        }
      }
    `,
  },
  typeDefs: gql`
    extend type Query {
      coloringBooks: [Any]
      textBooks: [Any]
    }
  `,
  cacheOptions: {
    addTypename: true,
    typePolicies: {
      Query: {
        fields: {
          coloringBooks: {
            read(_, { args, readField }) {
              const dadosNoCache = readField('schoolBooks', readField('Query'));
              const coloringBooksArray = dadosNoCache?.filter(
                (referencia) =>
                  readField('__typename', referencia) === 'ColoringBook'
              );
              return coloringBooksArray;
            },
          },
          textBooks: {
            read(_, { args, readField }) {
              const dadosNoCache = readField('schoolBooks', readField('Query'));
              const textBooksArray = dadosNoCache?.filter(
                (referencia) =>
                  readField('__typename', referencia) === 'TextBook'
              );
              return textBooksArray;
            },
          },
        },
      },
      TextBook: {
        keyFields: ['title'],
      },
      ColoringBook: {
        keyFields: ['title'],
      },
    },
  },
};

export default serverTwoOptions;