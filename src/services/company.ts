import { gql } from "@apollo/client";
import client from "./config";

const SIGNIN = gql`
  mutation signInCompany($input: signInInput) {
    signInCompany(input: $input) {
      token
      Company {
        id: ID
        companyName: String
        password: String
        nit: Int
        balance: Float
        token: String
      }
    }
  }
`;

export const comSignIn = async (input: any) => {
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