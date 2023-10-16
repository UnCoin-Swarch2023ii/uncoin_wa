// Importa las bibliotecas necesarias
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

var token = "";

export const setToken = (newToken: string) => {
  token = newToken;
};

// Crea el enlace de autenticación
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:5001/graphql", // Poner IP de la maquina
});

// Crea el cliente de Apollo
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
