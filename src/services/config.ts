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
  uri: "https://56b8-2800-486-990-c600-5009-3b0-654b-361c.ngrok-free.app", // Poner IP de la maquina
});

// Crea el cliente de Apollo
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
