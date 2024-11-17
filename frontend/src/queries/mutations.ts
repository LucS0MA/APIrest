import { gql } from '@apollo/client';

export const CREATE_AD = gql`
mutation Mutation($data: AdInputs!) {
  createNewAd(data: $data) {
    id
    title
    description
    owner
    price
    location
    createdAt
  }
}
  `;

  export const DEL_AD_BY_ID = gql`
mutation Mutation($deleteAdId: Float!) {
  deleteAd(id: $deleteAdId)
}
`;

export const UPDATE_AD = gql`mutation UpdateAd($data: UpDateAdInputs!) {
    updateAd(data: $data)
  }
    `;
