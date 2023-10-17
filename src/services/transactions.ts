import { gql } from "@apollo/client";
import client from "./config";

const GET_TRANSACTIONS_BY_USER_ID = gql`
  query getTransactionsByUserId($id: ID!, $token: String) {
    getTransactionsByUserId(id: $id, token: $token) {
      id
      amount
      description
      receiverId
      senderId
      type
      status
    }
  }
`;

export const useGetTransactionsByUserId = async (id: string, token: string) => {
  try {
    client.cache.reset();
    const result = await client.query({
      query: GET_TRANSACTIONS_BY_USER_ID,
      variables: { id, token },
    });
    return result.data.getTransactionsByUserId;
  } catch (error) {
    return [];
  }
};

const MAKE_TRANSACTION = gql`
  mutation createTransaction($input: TransactionInput, $token: String) {
    createTransaction(input: $input, token: $token) {
      id
      amount
      description
      receiverId
      senderId
      type
      status
    }
  }
`;

export const useMakeTransaction = async (input: any, token: string) => {
  try {
    client.cache.reset();
    const result = await client.mutate({
      mutation: MAKE_TRANSACTION,
      variables: { input, token },
    });
    return result.data.createTransaction;
  } catch (error) {
    throw error; // Re-throw the error to the caller if needed
  }
};
