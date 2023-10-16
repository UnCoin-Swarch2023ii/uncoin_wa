import { gql } from "@apollo/client";
import client from "./config";

const SIGNIN = gql`
  mutation signInUser($input: signInInput) {
    signInUser(input: $input) {
      token
      users {
        id
        userName
        userLastName
        password
        document
        balance
        enable
      }
    }
  }
`;

export const useSignIn = async (input: any) => {
  try {
    client.cache.reset();
    const result = await client.mutate({
      mutation: SIGNIN,
      variables: { input },
    });
    return result.data;
  } catch (error) {
    throw error; // Re-throw the error to the caller if needed
  }
};
