import { gql } from '@apollo/client';

const serverFourOptions = {
  queries: [
    gql`
      query {
        coloringBooks {
          __typename
          title
          author {
            name
          }
          favorite
          colors {
            name
          }
        }
      }
    `,
    gql`
      query {
        textBooks {
          __typename
          title
          author {
            name
          }
          favorite
          classes {
            name
          }
        }
      }
    `,
  ],
  mutations: {
    favoriteBook: gql`
      mutation FavoriteBook($title: String!, $type: String!) {
        favoriteBook(title: $title, type: $type) {
          title
          favorite
        }
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
            read(current) {
              return current;
            },
          },
          textBooks: {
            read(current) {
              return current;
            },
          },
        },
      },
      Book: {
        keyFields: ['title'],
      },
    },
  },
};

export default serverFourOptions;
