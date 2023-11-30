import { gql } from "@apollo/client";
import client from "./config";

const GET_SHIPMENTS_BY_USER = gql`
  query shipmentsByUser($user: String, $token: String) {
    shipmentsByUser(user: $user, token: $token) {
      _id
      userId
      companyId
      shipmentValue
      shipmentDate
    }
  }
`;

export const useGetShipmentsByUser = async (
  user: string,
  token: string
): Promise<any> => {
  try {
    client.cache.reset();
    const result = await client.query({
      query: GET_SHIPMENTS_BY_USER,
      variables: { user, token },
    });
    return result.data.shipmentsByUser;
  } catch (error) {
    return [];
  }
};

const ADD_SHIPMENT = gql`
  mutation addShipment(
    $userId: String
    $companyId: String
    $shipmentValue: Float
    $shipmentDate: String
    $token: String
  ) {
    addShipment(
      userId: $userId
      companyId: $companyId
      shipmentValue: $shipmentValue
      shipmentDate: $shipmentDate
      token: $token
    ) {
      _id
      userId
      companyId
      shipmentValue
      shipmentDate
    }
  }
`;

export const useAddShipment = async (
  userId: String,
  companyId: String,
  shipmentValue: Number,
  shipmentDate: String,
  token: String
) => {
  try {
    client.cache.reset();
    const result = await client.mutate({
      mutation: ADD_SHIPMENT,
      variables: { userId, companyId, shipmentValue, shipmentDate, token },
    });
    return result.data.addShipment;
  } catch (error) {
    throw error; // Re-throw the error to the caller if needed
  }
};
