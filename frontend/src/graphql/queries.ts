import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      description
      owner
      price
      location
      createdAt
      category {
        id
        title
      }
      pictures {
        url
        id
      }
      tag {
        id
        title
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      id
      title
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query GetAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
      id
      title
      owner
      description
      price
      pictures {
        id
        url
      }
      location
      createdAt
      category {
        id
        title
      }
      tag {
        id
        title
      }
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      title
    }
  }
`;

export const GET_ADS_BY_KEYWORD = gql`
  query GetAdsByKeyword($adTitle: String!) {
    getAdsByKeyword(adTitle: $adTitle) {
      id
      title
      description
      owner
      price
      pictures {
        id
        url
      }
      location
      createdAt
      category {
        id
        title
      }
      tag {
        id
        title
      }
    }
  }
`;

export const GET_ADS_BY_CATEGORY = gql`
  query GetAdsByCategory($categoryTitle: String!) {
    getAdsByCategory(categoryTitle: $categoryTitle) {
      id
      title
      description
      owner
      price
      pictures {
        id
        url
      }
      location
      createdAt
      category {
        id
        title
      }
      tag {
        id
        title
      }
    }
  }
`;

export const LOGIN = gql`
  query Login($data: UserInputs!) {
    login(data: $data)
  }
`;
