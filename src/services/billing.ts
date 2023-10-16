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
