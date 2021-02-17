import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Card, Icon } from 'semantic-ui-react';
import { currentCache } from '../App';

const renderCardAction = (
  action,
  favoriteBook,
  deleteBook,
  title,
  type,
  index
) => {
  switch (action) {
    case 'favorite':
      return (
        <Button
          key={index}
          color='yellow'
          onClick={() =>
            favoriteBook({
              variables: {
                title: title,
                type: type,
              },
            })
          }
        >
          Favorite
        </Button>
      );
    case 'delete':
      return (
        <Button
          key={index}
          color='red'
          onClick={() =>
            deleteBook({
              variables: {
                title: title,
              },
            })
          }
        >
          Delete
        </Button>
      );
    default:
      console.log(`Couldn't render action: ${action}`);
  }
};

const BookCard = ({
  isFavorite,
  title,
  author,
  contentDescription,
  content,
  favoriteBookMutation,
  deleteBookMutation,
  type,
  actions,
  rootQueryField,
  selectedServer,
}) => {
  const [isFavoriteBook, setIsFavoriteBook] = useState(isFavorite);
  const [favoriteBook] = useMutation(favoriteBookMutation, {
    update(cache, { data: { favoriteBook } }) {
      if (selectedServer === 2) {
        cache.modify({
          id: cache.identify({
            __typename: type,
            title: title,
          }),
          fields: {
            favorite(_) {
              return favoriteBook;
            },
          },
          broadcast: false,
        });
        currentCache({ ...cache });
        setIsFavoriteBook(favoriteBook);
      } else {
        currentCache({ ...cache });
        setIsFavoriteBook(favoriteBook);
      }
    },
  });

  const defaultRootQueryField = {
    schoolBooks(existingBooksRefs = [], { readField }) {
      const updatedBooks = existingBooksRefs.filter(
        (bookRef) => title !== readField('title', bookRef)
      );
      return [...updatedBooks];
    },
  };

  const evalRootQueryField = rootQueryField
    ? rootQueryField
    : defaultRootQueryField;

  const [deleteBook] = useMutation(deleteBookMutation, {
    update(cache) {
      cache.modify({
        fields: {
          ...evalRootQueryField,
        },
      });
      /* After we delete the item from our query field, we are left with an unreachable normalized object in our cache, the gc 
      method below removes all objects from the normalized cache that are not reachable: */
      cache.gc();
      /* And then we update de reactiveVariable. We need to do this because in this case, the referential equality isn't broken, 
      therefore it does not trigger a rerender on components that rely on the reactiveVar */
      currentCache({ ...cache });
      console.log('cache atualizado', cache);
      console.log({ evalRootQueryField });
    },
  });

  return (
    <Card>
      <Card.Content>
        <Card.Header className='card-header'>
          <h3>{title}</h3>
          {isFavoriteBook && <Icon color='yellow' name='star' />}
        </Card.Header>
        <Card.Meta>{author}</Card.Meta>
        <Card.Description>
          {<strong>{contentDescription}</strong>}
          {content.map((content, index) => (
            <p key={index}>{content.name}</p>
          ))}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          {actions &&
            actions.map((action, index) =>
              renderCardAction(
                action,
                favoriteBook,
                deleteBook,
                title,
                type,
                index
              )
            )}
        </div>
      </Card.Content>
    </Card>
  );
};

export default BookCard;
