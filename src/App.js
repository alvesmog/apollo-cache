import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Divider } from 'semantic-ui-react';
import {
  serverOneOptions,
  serverTwoOptions,
  serverThreeOptions,
  serverFourOptions,
} from './configs';
import './App.css';

import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  makeVar,
} from '@apollo/client';

import { Content, Controls } from './components';

export const serverOptions = [
  {
    type: 'Correct Typenames + Mutation also returns typename',
    id: 1,
    address: 'http://localhost:4001/',
    ...serverOneOptions,
    actions: ['favorite', 'delete'],
  },
  {
    type:
      'Correct Typenames + Mutation does not return the typename (eg. returns only a Boolean)',
    id: 2,
    address: 'http://localhost:4002/',
    ...serverTwoOptions,
    actions: ['favorite', 'delete'],
  },
  {
    type: 'Different entities, same typename, same query',
    id: 3,
    address: 'http://localhost:4003/',
    ...serverThreeOptions,
    actions: ['favorite', 'delete'],
  },
  {
    type: 'Different entities, same typename, different queries',
    id: 4,
    address: 'http://localhost:4004/',
    ...serverFourOptions,
    actions: ['favorite', 'delete'],
  },
];

export const currentCache = makeVar({});

const App = () => {
  const [selectedServer, setSelectedServer] = useState(1);

  const selectedServerInfo = serverOptions.find(
    (server) => server.id === selectedServer
  );

  const client = new ApolloClient({
    uri: selectedServerInfo?.address,
    cache: new InMemoryCache(selectedServerInfo?.cacheOptions),
    typeDefs: selectedServerInfo?.typeDefs,
  });

  const handleServerChange = (e, { value }) => {
    setSelectedServer(value);
    currentCache({});
  };

  const handleClearCache = () => {
    client.resetStore();
    currentCache(undefined);
  };

  const handleFetchData = async () => {
    const selectedServerQueries = serverOptions.find(
      (server) => server.id === selectedServer
    ).queries;

    let promises = [];

    selectedServerQueries.forEach((selectedServerQuery) => {
      promises.push(
        client.query({
          query: selectedServerQuery,
        })
      );
    });

    Promise.all(promises).then(() => {
      const { cache } = client;
      currentCache(cache);
    });
  };

  return (
    <ApolloProvider client={client}>
      <Container className='content-container'>
        <Controls
          selectedServer={selectedServer}
          handleServerChange={handleServerChange}
          handleFetchData={handleFetchData}
          handleClearCache={handleClearCache}
        />
        <Divider />
        <Content
          selectedServerInfo={selectedServerInfo}
          selectedServer={selectedServer}
        />
      </Container>
    </ApolloProvider>
  );
};

export default App;
