import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@chakra-ui/core";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import React from "react";
import { Provider as AlertProvider } from "react-alert";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./App";
import { AlertTemplate } from "./components/AlertTemplate";
import { theme } from "./theme";

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_DOMAIN + "/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <AlertProvider
          template={AlertTemplate}
          timeout={5000}
          position="bottom right"
        >
          <App />
        </AlertProvider>
      </ThemeProvider>
    </HelmetProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
