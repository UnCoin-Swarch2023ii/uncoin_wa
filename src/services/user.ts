import { gql } from "@apollo/client";
import client from "./config";

const SIGNIN = gql`
  mutation signInUser($input: signInInput) {
    signInUser(input: $input) {
      token
      users {
        id
        username
        userLastName
        password
        document
        balance
        enable
      }
    }
  }
`;
const REGISTER = gql`
  mutation signUpUser($input: UserInput) {
    signUpUser(input: $input) {
      token
      users {
        id
        username
        userLastName
        password
        document
        balance
        enable
      }
    }
  }
`;
const GETUSER = gql`
  query userByDocument($document: Int, $token: String) {
    userByDocument(document: $document, token: $token) {
      id
      username
      userLastName
      password
      document
      balance
      enable
    }
  }
`;
export const useSignIn = async (input: any) => {
  try {
    client.cache.reset();
    //console.log("input", input);
    const result = await client.mutate({
      mutation: SIGNIN,
      variables: { input },
    });
    return result.data;
  } catch (error) {
    throw error; // Re-throw the error to the caller if needed
  }
};

export const useSignUp = async (input: any) => {
  try {
    client.cache.reset();
    const result = await client.mutate({
      mutation: REGISTER,
      variables: { input },
    });
    return result.data;
  } catch (error) {
    throw error; // Re-throw the error to the caller if needed
  }
};

export const getUser = async (token: any, document: any) => {
  try {
    client.cache.reset();
    //console.log("input", input);
    const result = await client.query({
      query: GETUSER,
      variables: { token, document },
    });
    return result.data;
  } catch (error) {
    throw error; // Re-throw the error to the caller if needed
  }
};
