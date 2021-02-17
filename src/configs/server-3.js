import { gql } from '@apollo/client';

const serverThreeOptions = {
  queries: [
    gql`
      query {
        schoolBooks {
          __typename
          title
          author {
            name
          }
          favorite
          classes {
            name
          }
          colors {
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
      coloringBooks: [Book]
      textBooks: [Book]
    }
  `,
  cacheOptions: {
    addTypename: true,
    typePolicies: {
      Query: {
        fields: {
          coloringBooks: {
            read(_, { readField }) {
              const cachedData = readField('schoolBooks', readField('Query'));
              const coloringBooksArray = cachedData?.filter((reference) =>
                readField('colors', reference)
              );
              return coloringBooksArray;
            },
          },
          textBooks: {
            read(_, { readField }) {
              const cachedData = readField('schoolBooks', readField('Query'));
              const textBooksArray = cachedData?.filter((reference) =>
                readField('classes', reference)
              );
              return textBooksArray;
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

export default serverThreeOptions;
