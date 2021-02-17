import { gql } from '@apollo/client';

const serverOneOptions = {
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
      coloringBooks: [ColoringBook]
      textBooks: [TextBook]
    }
  `,
  cacheOptions: {
    addTypename: true,
    typePolicies: {
      Query: {
        fields: {
          coloringBooks: {
            read(_, { args, readField }) {
              const cachedData = readField('schoolBooks', readField('Query'));
              const coloringBooksArray = cachedData?.filter(
                (reference) =>
                  readField('__typename', reference) === 'ColoringBook'
              );
              return coloringBooksArray;
            },
          },
          textBooks: {
            read(_, { args, readField }) {
              const cachedData = readField('schoolBooks', readField('Query'));
              const textBooksArray = cachedData?.filter(
                (reference) =>
                  readField('__typename', reference) === 'TextBook'
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

export default serverOneOptions;
