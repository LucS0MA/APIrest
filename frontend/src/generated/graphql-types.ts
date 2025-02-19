import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  category?: Maybe<Category>;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  pictures: Array<Picture>;
  price: Scalars['Float']['output'];
  tag?: Maybe<Array<Tag>>;
  title: Scalars['String']['output'];
};

export type AdInputs = {
  category: Scalars['ID']['input'];
  createdAt: Scalars['DateTimeISO']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  pictures?: InputMaybe<Array<PictureInput>>;
  price: Scalars['Float']['input'];
  tag?: InputMaybe<Array<TagInput>>;
  title: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type CategoryInputs = {
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewAd: Ad;
  createNewCategory: Category;
  deleteAd: Scalars['String']['output'];
  deleteCategory: Scalars['String']['output'];
  register: Scalars['String']['output'];
  updateAd: Scalars['String']['output'];
  updateCategory: Scalars['String']['output'];
};


export type MutationCreateNewAdArgs = {
  data: AdInputs;
};


export type MutationCreateNewCategoryArgs = {
  data: CategoryInputs;
};


export type MutationDeleteAdArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRegisterArgs = {
  data: UserInputs;
};


export type MutationUpdateAdArgs = {
  data: UpDateAdInputs;
};


export type MutationUpdateCategoryArgs = {
  data: UpDateCategoryInputs;
};

export type Picture = {
  __typename?: 'Picture';
  id: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type PictureInput = {
  url: Scalars['String']['input'];
};

export type PictureUpdateInput = {
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAdById: Ad;
  getAdsByCategory: Array<Ad>;
  getAdsByKeyword: Array<Ad>;
  getAllAds: Array<Ad>;
  getAllCategories: Array<Category>;
  getAllTags: Array<Tag>;
  getCategoryById: Category;
  getTagById: Tag;
  login: Scalars['String']['output'];
};


export type QueryGetAdByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetAdsByCategoryArgs = {
  categoryTitle: Scalars['String']['input'];
};


export type QueryGetAdsByKeywordArgs = {
  adTitle: Scalars['String']['input'];
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetTagByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryLoginArgs = {
  data: UserInputs;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type TagInput = {
  id: Scalars['Float']['input'];
};

export type TagUpdateInput = {
  id: Scalars['Float']['input'];
};

export type UpDateAdInputs = {
  category?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  pictures?: InputMaybe<Array<PictureUpdateInput>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  tag?: InputMaybe<Array<TagUpdateInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpDateCategoryInputs = {
  id: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type UserInputs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateAdMutationVariables = Exact<{
  data: AdInputs;
}>;


export type CreateAdMutation = { __typename?: 'Mutation', createNewAd: { __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any } };

export type DeleteAdMutationVariables = Exact<{
  deleteAdId: Scalars['Float']['input'];
}>;


export type DeleteAdMutation = { __typename?: 'Mutation', deleteAd: string };

export type UpdateAdMutationVariables = Exact<{
  data: UpDateAdInputs;
}>;


export type UpdateAdMutation = { __typename?: 'Mutation', updateAd: string };

export type GetAllAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAdsQuery = { __typename?: 'Query', getAllAds: Array<{ __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, category?: { __typename?: 'Category', id: number, title: string } | null, pictures: Array<{ __typename?: 'Picture', url: string, id: number }>, tag?: Array<{ __typename?: 'Tag', id: number, title: string }> | null }> };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: number, title: string }> };

export type GetAdByIdQueryVariables = Exact<{
  getAdByIdId: Scalars['Float']['input'];
}>;


export type GetAdByIdQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: number, title: string, owner: string, description: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, title: string } | null, tag?: Array<{ __typename?: 'Tag', id: number, title: string }> | null } };

export type GetAllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTagsQuery = { __typename?: 'Query', getAllTags: Array<{ __typename?: 'Tag', id: number, title: string }> };

export type GetAdsByKeywordQueryVariables = Exact<{
  adTitle: Scalars['String']['input'];
}>;


export type GetAdsByKeywordQuery = { __typename?: 'Query', getAdsByKeyword: Array<{ __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, title: string } | null, tag?: Array<{ __typename?: 'Tag', id: number, title: string }> | null }> };

export type GetAdsByCategoryQueryVariables = Exact<{
  categoryTitle: Scalars['String']['input'];
}>;


export type GetAdsByCategoryQuery = { __typename?: 'Query', getAdsByCategory: Array<{ __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, title: string } | null, tag?: Array<{ __typename?: 'Tag', id: number, title: string }> | null }> };

export type LoginQueryVariables = Exact<{
  data: UserInputs;
}>;


export type LoginQuery = { __typename?: 'Query', login: string };


export const CreateAdDocument = gql`
    mutation createAd($data: AdInputs!) {
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
export type CreateAdMutationFn = Apollo.MutationFunction<CreateAdMutation, CreateAdMutationVariables>;

/**
 * __useCreateAdMutation__
 *
 * To run a mutation, you first call `useCreateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdMutation, { data, loading, error }] = useCreateAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAdMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdMutation, CreateAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdMutation, CreateAdMutationVariables>(CreateAdDocument, options);
      }
export type CreateAdMutationHookResult = ReturnType<typeof useCreateAdMutation>;
export type CreateAdMutationResult = Apollo.MutationResult<CreateAdMutation>;
export type CreateAdMutationOptions = Apollo.BaseMutationOptions<CreateAdMutation, CreateAdMutationVariables>;
export const DeleteAdDocument = gql`
    mutation deleteAd($deleteAdId: Float!) {
  deleteAd(id: $deleteAdId)
}
    `;
export type DeleteAdMutationFn = Apollo.MutationFunction<DeleteAdMutation, DeleteAdMutationVariables>;

/**
 * __useDeleteAdMutation__
 *
 * To run a mutation, you first call `useDeleteAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdMutation, { data, loading, error }] = useDeleteAdMutation({
 *   variables: {
 *      deleteAdId: // value for 'deleteAdId'
 *   },
 * });
 */
export function useDeleteAdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAdMutation, DeleteAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAdMutation, DeleteAdMutationVariables>(DeleteAdDocument, options);
      }
export type DeleteAdMutationHookResult = ReturnType<typeof useDeleteAdMutation>;
export type DeleteAdMutationResult = Apollo.MutationResult<DeleteAdMutation>;
export type DeleteAdMutationOptions = Apollo.BaseMutationOptions<DeleteAdMutation, DeleteAdMutationVariables>;
export const UpdateAdDocument = gql`
    mutation UpdateAd($data: UpDateAdInputs!) {
  updateAd(data: $data)
}
    `;
export type UpdateAdMutationFn = Apollo.MutationFunction<UpdateAdMutation, UpdateAdMutationVariables>;

/**
 * __useUpdateAdMutation__
 *
 * To run a mutation, you first call `useUpdateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdMutation, { data, loading, error }] = useUpdateAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAdMutation, UpdateAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAdMutation, UpdateAdMutationVariables>(UpdateAdDocument, options);
      }
export type UpdateAdMutationHookResult = ReturnType<typeof useUpdateAdMutation>;
export type UpdateAdMutationResult = Apollo.MutationResult<UpdateAdMutation>;
export type UpdateAdMutationOptions = Apollo.BaseMutationOptions<UpdateAdMutation, UpdateAdMutationVariables>;
export const GetAllAdsDocument = gql`
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

/**
 * __useGetAllAdsQuery__
 *
 * To run a query within a React component, call `useGetAllAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAdsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
      }
export function useGetAllAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export function useGetAllAdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export type GetAllAdsQueryHookResult = ReturnType<typeof useGetAllAdsQuery>;
export type GetAllAdsLazyQueryHookResult = ReturnType<typeof useGetAllAdsLazyQuery>;
export type GetAllAdsSuspenseQueryHookResult = ReturnType<typeof useGetAllAdsSuspenseQuery>;
export type GetAllAdsQueryResult = Apollo.QueryResult<GetAllAdsQuery, GetAllAdsQueryVariables>;
export const GetAllCategoriesDocument = gql`
    query getAllCategories {
  getAllCategories {
    id
    title
  }
}
    `;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
      }
export function useGetAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export function useGetAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export type GetAllCategoriesQueryHookResult = ReturnType<typeof useGetAllCategoriesQuery>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesLazyQuery>;
export type GetAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoriesSuspenseQuery>;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const GetAdByIdDocument = gql`
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

/**
 * __useGetAdByIdQuery__
 *
 * To run a query within a React component, call `useGetAdByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdByIdQuery({
 *   variables: {
 *      getAdByIdId: // value for 'getAdByIdId'
 *   },
 * });
 */
export function useGetAdByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables> & ({ variables: GetAdByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
      }
export function useGetAdByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export function useGetAdByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export type GetAdByIdQueryHookResult = ReturnType<typeof useGetAdByIdQuery>;
export type GetAdByIdLazyQueryHookResult = ReturnType<typeof useGetAdByIdLazyQuery>;
export type GetAdByIdSuspenseQueryHookResult = ReturnType<typeof useGetAdByIdSuspenseQuery>;
export type GetAdByIdQueryResult = Apollo.QueryResult<GetAdByIdQuery, GetAdByIdQueryVariables>;
export const GetAllTagsDocument = gql`
    query GetAllTags {
  getAllTags {
    id
    title
  }
}
    `;

/**
 * __useGetAllTagsQuery__
 *
 * To run a query within a React component, call `useGetAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTagsDocument, options);
      }
export function useGetAllTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTagsDocument, options);
        }
export function useGetAllTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTagsDocument, options);
        }
export type GetAllTagsQueryHookResult = ReturnType<typeof useGetAllTagsQuery>;
export type GetAllTagsLazyQueryHookResult = ReturnType<typeof useGetAllTagsLazyQuery>;
export type GetAllTagsSuspenseQueryHookResult = ReturnType<typeof useGetAllTagsSuspenseQuery>;
export type GetAllTagsQueryResult = Apollo.QueryResult<GetAllTagsQuery, GetAllTagsQueryVariables>;
export const GetAdsByKeywordDocument = gql`
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

/**
 * __useGetAdsByKeywordQuery__
 *
 * To run a query within a React component, call `useGetAdsByKeywordQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdsByKeywordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdsByKeywordQuery({
 *   variables: {
 *      adTitle: // value for 'adTitle'
 *   },
 * });
 */
export function useGetAdsByKeywordQuery(baseOptions: Apollo.QueryHookOptions<GetAdsByKeywordQuery, GetAdsByKeywordQueryVariables> & ({ variables: GetAdsByKeywordQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdsByKeywordQuery, GetAdsByKeywordQueryVariables>(GetAdsByKeywordDocument, options);
      }
export function useGetAdsByKeywordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdsByKeywordQuery, GetAdsByKeywordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdsByKeywordQuery, GetAdsByKeywordQueryVariables>(GetAdsByKeywordDocument, options);
        }
export function useGetAdsByKeywordSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdsByKeywordQuery, GetAdsByKeywordQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdsByKeywordQuery, GetAdsByKeywordQueryVariables>(GetAdsByKeywordDocument, options);
        }
export type GetAdsByKeywordQueryHookResult = ReturnType<typeof useGetAdsByKeywordQuery>;
export type GetAdsByKeywordLazyQueryHookResult = ReturnType<typeof useGetAdsByKeywordLazyQuery>;
export type GetAdsByKeywordSuspenseQueryHookResult = ReturnType<typeof useGetAdsByKeywordSuspenseQuery>;
export type GetAdsByKeywordQueryResult = Apollo.QueryResult<GetAdsByKeywordQuery, GetAdsByKeywordQueryVariables>;
export const GetAdsByCategoryDocument = gql`
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

/**
 * __useGetAdsByCategoryQuery__
 *
 * To run a query within a React component, call `useGetAdsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdsByCategoryQuery({
 *   variables: {
 *      categoryTitle: // value for 'categoryTitle'
 *   },
 * });
 */
export function useGetAdsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables> & ({ variables: GetAdsByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>(GetAdsByCategoryDocument, options);
      }
export function useGetAdsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>(GetAdsByCategoryDocument, options);
        }
export function useGetAdsByCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>(GetAdsByCategoryDocument, options);
        }
export type GetAdsByCategoryQueryHookResult = ReturnType<typeof useGetAdsByCategoryQuery>;
export type GetAdsByCategoryLazyQueryHookResult = ReturnType<typeof useGetAdsByCategoryLazyQuery>;
export type GetAdsByCategorySuspenseQueryHookResult = ReturnType<typeof useGetAdsByCategorySuspenseQuery>;
export type GetAdsByCategoryQueryResult = Apollo.QueryResult<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>;
export const LoginDocument = gql`
    query Login($data: UserInputs!) {
  login(data: $data)
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;