import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `,
  })
  .then((result) => console.log(result));

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

export function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import ApolloClient from "apollo-boost";
// import gql from "graphql-tag";

// const client = new ApolloClient({
//   uri: "https://api.github.com/graphql",
//   request: (operation) => {
//     operation.setContext({
//       headers: {
//         authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
//       },
//     });
//   },
// });

// // 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

// //

// const query = gql`
//   {
//     organization(login: "apollographql") {
//       repositories(first: 5) {
//         nodes {
//           id
//           name
//           url
//           viewerHasStarred
//           stargazer {
//             totalCount
//           }
//         }
//       }
//     }
//   }
// `;

// client
//   .query({
//     query,
//   })
//   .then((result) => console.log(result));
