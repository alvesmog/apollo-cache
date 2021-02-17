import { useQuery } from '@apollo/client';
import { Loader } from 'semantic-ui-react';
import { BookCard } from './index';

const ColoringBooks = ({ selectedServerInfo, selectedServer }) => {
  const GET_COLORING_BOOKS =
    selectedServerInfo?.cacheQueries.coloringBooksQuery;
  const FAVORITE_BOOK = selectedServerInfo?.mutations.favoriteBook;
  const DELETE_BOOK = selectedServerInfo?.mutations.deleteBook;

  const { loading, data } = useQuery(GET_COLORING_BOOKS);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h2>Coloring Books</h2>
      {data &&
        data.coloringBooks.map((bookData, index) => {
          return (
            <BookCard
              isFavorite={bookData.favorite}
              key={index}
              title={bookData.title}
              author={bookData.author.name}
              contentDescription={'Colors:'}
              content={bookData.colors}
              favoriteBookMutation={FAVORITE_BOOK}
              deleteBookMutation={DELETE_BOOK}
              type={bookData.__typename}
              actions={selectedServerInfo?.actions}
              /*I couln't find a better way to do this because the coloringBooks function depends on the book title
              so if i'd put it in the server config file this info would be unreachable. Also, I couldn't find a way
              to pass it as a variable because this is destructures to a default apollo cache function
              */
              rootQueryField={
                selectedServer === 4
                  ? {
                      coloringBooks(existingBooksRefs = [], { readField }) {
                        const updatedBooks = existingBooksRefs.filter(
                          (bookRef) =>
                            bookData.title !== readField('title', bookRef)
                        );
                        return [...updatedBooks];
                      },
                    }
                  : undefined
              }
              selectedServer={selectedServer}
            />
          );
        })}
    </>
  );
};

export default ColoringBooks;
