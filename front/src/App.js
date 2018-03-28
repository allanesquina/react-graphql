import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';
import { Query } from 'react-apollo';
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
const bookQuery = gql`{
      books {
        title
      }
    }
    `;

client
  .query({
    query: bookQuery
  })
  .then(data => console.log({ data }));

const ExchangeRates = () => (
  <Query
    query={bookQuery}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.books.map(({ title }) => (
        <div key={title}>
          <p>{`${title}`}</p>
        </div>
      ));
    }}
  </Query>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ApolloProvider client={client}>
          <div>
            <h2>My first Apollo app 🚀</h2>
            <ExchangeRates />
          </div>
        </ApolloProvider>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
