import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import {split} from 'apollo-link';
import {WebSocketLink} from '@apollo/link-ws';
import {IntrospectionFragmentMatcher} from 'apollo-cache-inmemory';
import {getMainDefinition} from '@apollo/client/utilities';
import {setContext} from 'apollo-link-context';
import {getToken} from './app/utils/asyncStorageHandler';
import {GRAPHQL_URL} from './app/config';
import introspectionQueryResultData from './app/fragmentTypes.json';
import AsyncStorage from '@react-native-community/async-storage';
import {persistCache} from 'apollo-cache-persist';
import MainScreen from './app/screens/MainScreen/MainScreen';
// import AuthLoadingScreen from './app/screens/MainScreen/AuthLoadingScreen';

// import Navigation from './app/screens/Navigation/DrawerNavigation';

// const retryLink = new RetryLink();

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

// auth options for WS
const connectionParams = async () => ({
  authorization: await getToken(),
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: GRAPHQL_URL,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams,
  },
});

// Uncomment avobe code to localhost connection.
// const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const authLink = setContext(async () => {
  const token = await getToken();
  return {
    headers: {
      authorization: token || '',
    },
  };
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const linkSplit = split(
  // split based on operation type
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Code example to handle GraphQL Subscriptions e. g. events.
const inMemoryOptions = {
  addTypename: true,
  resultCaching: true,
  typePolicies: {
    Query: {
      fields: {
        recentEvents: {
          read(existing) {
            if (existing) {
              return existing;
            }
          },
        },
        allEvents: {
          read(existing) {
            if (existing) {
              return existing;
            }
          },
        },
      },
    },
  },
};

// Mixin two options.
const cache = new InMemoryCache({
  ...fragmentMatcher,
  ...inMemoryOptions,
});

// GraphQL Client
const client = new ApolloClient({
  cache,
  link: authLink.concat(linkSplit),
});

(async () => {
  await persistCache({
    cache,
    storage: AsyncStorage,
    trigger: 'background',
  });
})();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <MainScreen />
    </ApolloProvider>
  );
};

export default App;
