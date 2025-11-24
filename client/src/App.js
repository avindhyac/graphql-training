import './App.css';
import DisplayData from './DisplayData';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:4000/graphql', // URL to where the GraphQL API is running
    }),
  });
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <DisplayData />
      </div>
      ;
    </ApolloProvider>
  );
}

export default App;
