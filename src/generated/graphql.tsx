import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Bot = {
  __typename?: 'Bot';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  incommingMessageColor: Scalars['String'];
  incommingMessageTextColor: Scalars['String'];
  logo: Scalars['String'];
  messageFieldColor: Scalars['String'];
  messageFieldTextColor: Scalars['String'];
  name: Scalars['String'];
  outgoingMessageColor: Scalars['String'];
  outgoingMessageTextColor: Scalars['String'];
  token: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type DataFeed = {
  __typename?: 'DataFeed';
  bot: Bot;
  createdAt: Scalars['String'];
  descriptionSnippet: Scalars['String'];
  fileName?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addEmail: Scalars['Boolean'];
  changePassword: UserResponse;
  confirmEmail: Scalars['String'];
  createBot: Bot;
  createDataFeedWithPDF: Scalars['Boolean'];
  createDataFeedWithScrapping: Scalars['Boolean'];
  createDataFeedWithText: Scalars['Boolean'];
  createSetting: Scalars['Boolean'];
  deleteDataFeed: Scalars['Boolean'];
  enterUserDetails: UserResponse;
  forgotPassword: Scalars['Boolean'];
  getLinks: Array<Scalars['String']>;
  joinShopifyWaitlist: Scalars['Boolean'];
  joinWaitlist: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: RegisterResponse;
  subscribe: Scalars['Boolean'];
  trainBot: Scalars['Boolean'];
  updateBotLogoAndName: Bot;
  updateBotSetting: Scalars['Boolean'];
  updateSetting: Scalars['Boolean'];
  uploadLogo: Scalars['String'];
  uploadProfilePicture: Scalars['String'];
};


export type MutationAddEmailArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};


export type MutationCreateBotArgs = {
  logo: Scalars['Upload'];
  name: Scalars['String'];
};


export type MutationCreateDataFeedWithPdfArgs = {
  botId: Scalars['Int'];
  name: Scalars['String'];
  pdf: Scalars['Upload'];
};


export type MutationCreateDataFeedWithScrappingArgs = {
  botId: Scalars['Int'];
  name: Scalars['String'];
  urls: Array<Scalars['String']>;
};


export type MutationCreateDataFeedWithTextArgs = {
  botId: Scalars['Int'];
  name: Scalars['String'];
  text: Scalars['String'];
};


export type MutationCreateSettingArgs = {
  incommingMessageColor: Scalars['String'];
  incommingMessageTextColor: Scalars['String'];
  logo: Scalars['String'];
  messageFieldColor: Scalars['String'];
  messageFieldTextColor: Scalars['String'];
  outgoingMessageColor: Scalars['String'];
  outgoingMessageTextColor: Scalars['String'];
};


export type MutationDeleteDataFeedArgs = {
  id: Scalars['Int'];
};


export type MutationEnterUserDetailsArgs = {
  options: UserFormInput;
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationGetLinksArgs = {
  depth: Scalars['Int'];
  maxNoUrls: Scalars['Int'];
  url: Scalars['String'];
};


export type MutationJoinShopifyWaitlistArgs = {
  options: ShopifyWaitlistInput;
};


export type MutationJoinWaitlistArgs = {
  options: WaitlistInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationSubscribeArgs = {
  auth: Scalars['String'];
  endpoint: Scalars['String'];
  p256dh: Scalars['String'];
};


export type MutationTrainBotArgs = {
  botId: Scalars['Int'];
};


export type MutationUpdateBotLogoAndNameArgs = {
  id: Scalars['Int'];
  logo: Scalars['Upload'];
  name: Scalars['String'];
};


export type MutationUpdateBotSettingArgs = {
  id: Scalars['Int'];
  incommingMessageColor: Scalars['String'];
  incommingMessageTextColor: Scalars['String'];
  logo: Scalars['String'];
  messageFieldColor: Scalars['String'];
  messageFieldTextColor: Scalars['String'];
  outgoingMessageColor: Scalars['String'];
  outgoingMessageTextColor: Scalars['String'];
};


export type MutationUpdateSettingArgs = {
  id: Scalars['Int'];
  incommingMessageColor: Scalars['String'];
  incommingMessageTextColor: Scalars['String'];
  logo: Scalars['String'];
  messageFieldColor: Scalars['String'];
  messageFieldTextColor: Scalars['String'];
  outgoingMessageColor: Scalars['String'];
  outgoingMessageTextColor: Scalars['String'];
};


export type MutationUploadLogoArgs = {
  file: Scalars['Upload'];
  fileName: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationUploadProfilePictureArgs = {
  file: Scalars['Upload'];
  fileName: Scalars['String'];
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getBotToken: Scalars['String'];
  getBots: Array<Bot>;
  getDataFeeds: Array<DataFeed>;
  getSettingById: Bot;
  getSettingByToken: SettingResponse;
  me?: Maybe<User>;
  serve: Scalars['String'];
  testEmail: Scalars['Boolean'];
};


export type QueryGetBotTokenArgs = {
  id: Scalars['Int'];
};


export type QueryGetDataFeedsArgs = {
  botId: Scalars['Int'];
};


export type QueryGetSettingByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetSettingByTokenArgs = {
  token: Scalars['String'];
};


export type QueryServeArgs = {
  message: Scalars['String'];
  sessionId: Scalars['String'];
  token: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  created?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<FieldError>>;
};

export type SettingResponse = {
  __typename?: 'SettingResponse';
  sessionId: Scalars['String'];
  setting: Bot;
};

export type ShopifyWaitlistInput = {
  accuracyRating?: InputMaybe<Scalars['Int']>;
  addOn?: InputMaybe<Scalars['String']>;
  availabilityRating?: InputMaybe<Scalars['Int']>;
  company?: InputMaybe<Scalars['String']>;
  costRating?: InputMaybe<Scalars['Int']>;
  customerSupportSpending?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  languageRating?: InputMaybe<Scalars['Int']>;
  lastName: Scalars['String'];
  noOfEmployees?: InputMaybe<Scalars['String']>;
  speedRating?: InputMaybe<Scalars['Int']>;
  staffRating?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  trainingRating?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  bots: Array<Bot>;
  company?: Maybe<Scalars['String']>;
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['String'];
  dateOfPurchase?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  facebookId?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  googleId?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  noOfEmployees?: Maybe<Scalars['String']>;
  operations?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  stageOfAIAdoption?: Maybe<Scalars['String']>;
  subscription?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  validity?: Maybe<Scalars['String']>;
  whereDidYouHearAboutUs?: Maybe<Scalars['String']>;
};

export type UserFormInput = {
  company?: InputMaybe<Scalars['String']>;
  noOfEmployees?: InputMaybe<Scalars['String']>;
  operations?: InputMaybe<Scalars['String']>;
  stageOfAIAdoption?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  whereDidYouHearAboutUs?: InputMaybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  userToken?: Maybe<Scalars['String']>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
};

export type WaitlistInput = {
  company?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  noOfEmployees?: InputMaybe<Scalars['String']>;
  operations?: InputMaybe<Scalars['String']>;
  stageOfAIAdoption?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  whereDidYouHearAboutUs?: InputMaybe<Scalars['String']>;
};

export type AddEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type AddEmailMutation = { __typename?: 'Mutation', addEmail: boolean };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', userToken?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ConfirmEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: string };

export type CreateBotMutationVariables = Exact<{
  name: Scalars['String'];
  logo: Scalars['Upload'];
}>;


export type CreateBotMutation = { __typename?: 'Mutation', createBot: { __typename?: 'Bot', id: number, name: string, logo: string, token: string } };

export type CreateDataFeedWithPdfMutationVariables = Exact<{
  name: Scalars['String'];
  pdf: Scalars['Upload'];
  botId: Scalars['Int'];
}>;


export type CreateDataFeedWithPdfMutation = { __typename?: 'Mutation', createDataFeedWithPDF: boolean };

export type CreateDataFeedWithScrappingMutationVariables = Exact<{
  name: Scalars['String'];
  urls: Array<Scalars['String']> | Scalars['String'];
  botId: Scalars['Int'];
}>;


export type CreateDataFeedWithScrappingMutation = { __typename?: 'Mutation', createDataFeedWithScrapping: boolean };

export type CreateDataFeedWithTextMutationVariables = Exact<{
  name: Scalars['String'];
  text: Scalars['String'];
  botId: Scalars['Int'];
}>;


export type CreateDataFeedWithTextMutation = { __typename?: 'Mutation', createDataFeedWithText: boolean };

export type DeleteDataFeedMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteDataFeedMutation = { __typename?: 'Mutation', deleteDataFeed: boolean };

export type EnterUserDetailsMutationVariables = Exact<{
  options: UserFormInput;
  token: Scalars['String'];
}>;


export type EnterUserDetailsMutation = { __typename?: 'Mutation', enterUserDetails: { __typename?: 'UserResponse', userToken?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type GetLinksMutationVariables = Exact<{
  url: Scalars['String'];
  depth: Scalars['Int'];
  maxNoUrls: Scalars['Int'];
}>;


export type GetLinksMutation = { __typename?: 'Mutation', getLinks: Array<string> };

export type JoinShopifyWaitlistMutationVariables = Exact<{
  options: ShopifyWaitlistInput;
}>;


export type JoinShopifyWaitlistMutation = { __typename?: 'Mutation', joinShopifyWaitlist: boolean };

export type JoinWaitlistMutationVariables = Exact<{
  options: WaitlistInput;
}>;


export type JoinWaitlistMutation = { __typename?: 'Mutation', joinWaitlist: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', userToken?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', created?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type TrainBotMutationVariables = Exact<{
  botId: Scalars['Int'];
}>;


export type TrainBotMutation = { __typename?: 'Mutation', trainBot: boolean };

export type UpdateBotLogoAndNameMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  logo: Scalars['Upload'];
}>;


export type UpdateBotLogoAndNameMutation = { __typename?: 'Mutation', updateBotLogoAndName: { __typename?: 'Bot', id: number, name: string, logo: string } };

export type UpdateBotSettingMutationVariables = Exact<{
  id: Scalars['Int'];
  messageFieldColor: Scalars['String'];
  outgoingMessageColor: Scalars['String'];
  outgoingMessageTextColor: Scalars['String'];
  incommingMessageColor: Scalars['String'];
  incommingMessageTextColor: Scalars['String'];
  messageFieldTextColor: Scalars['String'];
  logo: Scalars['String'];
}>;


export type UpdateBotSettingMutation = { __typename?: 'Mutation', updateBotSetting: boolean };

export type UpdateSettingMutationVariables = Exact<{
  id: Scalars['Int'];
  messageFieldColor: Scalars['String'];
  outgoingMessageColor: Scalars['String'];
  outgoingMessageTextColor: Scalars['String'];
  incommingMessageColor: Scalars['String'];
  incommingMessageTextColor: Scalars['String'];
  messageFieldTextColor: Scalars['String'];
  logo: Scalars['String'];
}>;


export type UpdateSettingMutation = { __typename?: 'Mutation', updateSetting: boolean };

export type UploadLogoMutationVariables = Exact<{
  fileName: Scalars['String'];
  file: Scalars['Upload'];
  id: Scalars['Int'];
}>;


export type UploadLogoMutation = { __typename?: 'Mutation', uploadLogo: string };

export type UploadProfilePictureMutationVariables = Exact<{
  fileName: Scalars['String'];
  file: Scalars['Upload'];
  id: Scalars['Int'];
}>;


export type UploadProfilePictureMutation = { __typename?: 'Mutation', uploadProfilePicture: string };

export type GetBotTokenQueryVariables = Exact<{
  botId: Scalars['Int'];
}>;


export type GetBotTokenQuery = { __typename?: 'Query', getBotToken: string };

export type GetBotsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBotsQuery = { __typename?: 'Query', getBots: Array<{ __typename?: 'Bot', id: number, name: string, messageFieldColor: string, incommingMessageColor: string, incommingMessageTextColor: string, outgoingMessageColor: string, outgoingMessageTextColor: string, messageFieldTextColor: string, logo: string }> };

export type GetDataFeedsQueryVariables = Exact<{
  botId: Scalars['Int'];
}>;


export type GetDataFeedsQuery = { __typename?: 'Query', getDataFeeds: Array<{ __typename?: 'DataFeed', id: number, name: string, url?: string | null, fileName?: string | null, descriptionSnippet: string, createdAt: string, updatedAt: string }> };

export type GetSettingByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetSettingByIdQuery = { __typename?: 'Query', getSettingById: { __typename?: 'Bot', messageFieldColor: string, incommingMessageColor: string, incommingMessageTextColor: string, outgoingMessageColor: string, outgoingMessageTextColor: string, messageFieldTextColor: string, logo: string, token: string } };

export type GetSettingByTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetSettingByTokenQuery = { __typename?: 'Query', getSettingByToken: { __typename?: 'SettingResponse', sessionId: string, setting: { __typename?: 'Bot', messageFieldColor: string, incommingMessageColor: string, incommingMessageTextColor: string, outgoingMessageColor: string, outgoingMessageTextColor: string, messageFieldTextColor: string, logo: string } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, fullName: string, email: string, picture?: string | null, company?: string | null, title?: string | null, noOfEmployees?: string | null, stageOfAIAdoption?: string | null, whereDidYouHearAboutUs?: string | null, operations?: string | null, subscription?: string | null } | null };

export type SettingQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type SettingQuery = { __typename?: 'Query', getSettingByToken: { __typename?: 'SettingResponse', sessionId: string, setting: { __typename?: 'Bot', messageFieldColor: string, incommingMessageColor: string, incommingMessageTextColor: string, outgoingMessageColor: string, outgoingMessageTextColor: string, messageFieldTextColor: string, logo: string } } };


export const AddEmailDocument = gql`
    mutation AddEmail($email: String!) {
  addEmail(email: $email)
}
    `;
export type AddEmailMutationFn = Apollo.MutationFunction<AddEmailMutation, AddEmailMutationVariables>;

/**
 * __useAddEmailMutation__
 *
 * To run a mutation, you first call `useAddEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEmailMutation, { data, loading, error }] = useAddEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddEmailMutation(baseOptions?: Apollo.MutationHookOptions<AddEmailMutation, AddEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEmailMutation, AddEmailMutationVariables>(AddEmailDocument, options);
      }
export type AddEmailMutationHookResult = ReturnType<typeof useAddEmailMutation>;
export type AddEmailMutationResult = Apollo.MutationResult<AddEmailMutation>;
export type AddEmailMutationOptions = Apollo.BaseMutationOptions<AddEmailMutation, AddEmailMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      field
      message
    }
    userToken
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($token: String!) {
  confirmEmail(token: $token)
}
    `;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const CreateBotDocument = gql`
    mutation CreateBot($name: String!, $logo: Upload!) {
  createBot(name: $name, logo: $logo) {
    id
    name
    logo
    token
  }
}
    `;
export type CreateBotMutationFn = Apollo.MutationFunction<CreateBotMutation, CreateBotMutationVariables>;

/**
 * __useCreateBotMutation__
 *
 * To run a mutation, you first call `useCreateBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBotMutation, { data, loading, error }] = useCreateBotMutation({
 *   variables: {
 *      name: // value for 'name'
 *      logo: // value for 'logo'
 *   },
 * });
 */
export function useCreateBotMutation(baseOptions?: Apollo.MutationHookOptions<CreateBotMutation, CreateBotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBotMutation, CreateBotMutationVariables>(CreateBotDocument, options);
      }
export type CreateBotMutationHookResult = ReturnType<typeof useCreateBotMutation>;
export type CreateBotMutationResult = Apollo.MutationResult<CreateBotMutation>;
export type CreateBotMutationOptions = Apollo.BaseMutationOptions<CreateBotMutation, CreateBotMutationVariables>;
export const CreateDataFeedWithPdfDocument = gql`
    mutation CreateDataFeedWithPDF($name: String!, $pdf: Upload!, $botId: Int!) {
  createDataFeedWithPDF(name: $name, pdf: $pdf, botId: $botId)
}
    `;
export type CreateDataFeedWithPdfMutationFn = Apollo.MutationFunction<CreateDataFeedWithPdfMutation, CreateDataFeedWithPdfMutationVariables>;

/**
 * __useCreateDataFeedWithPdfMutation__
 *
 * To run a mutation, you first call `useCreateDataFeedWithPdfMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDataFeedWithPdfMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDataFeedWithPdfMutation, { data, loading, error }] = useCreateDataFeedWithPdfMutation({
 *   variables: {
 *      name: // value for 'name'
 *      pdf: // value for 'pdf'
 *      botId: // value for 'botId'
 *   },
 * });
 */
export function useCreateDataFeedWithPdfMutation(baseOptions?: Apollo.MutationHookOptions<CreateDataFeedWithPdfMutation, CreateDataFeedWithPdfMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDataFeedWithPdfMutation, CreateDataFeedWithPdfMutationVariables>(CreateDataFeedWithPdfDocument, options);
      }
export type CreateDataFeedWithPdfMutationHookResult = ReturnType<typeof useCreateDataFeedWithPdfMutation>;
export type CreateDataFeedWithPdfMutationResult = Apollo.MutationResult<CreateDataFeedWithPdfMutation>;
export type CreateDataFeedWithPdfMutationOptions = Apollo.BaseMutationOptions<CreateDataFeedWithPdfMutation, CreateDataFeedWithPdfMutationVariables>;
export const CreateDataFeedWithScrappingDocument = gql`
    mutation CreateDataFeedWithScrapping($name: String!, $urls: [String!]!, $botId: Int!) {
  createDataFeedWithScrapping(name: $name, urls: $urls, botId: $botId)
}
    `;
export type CreateDataFeedWithScrappingMutationFn = Apollo.MutationFunction<CreateDataFeedWithScrappingMutation, CreateDataFeedWithScrappingMutationVariables>;

/**
 * __useCreateDataFeedWithScrappingMutation__
 *
 * To run a mutation, you first call `useCreateDataFeedWithScrappingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDataFeedWithScrappingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDataFeedWithScrappingMutation, { data, loading, error }] = useCreateDataFeedWithScrappingMutation({
 *   variables: {
 *      name: // value for 'name'
 *      urls: // value for 'urls'
 *      botId: // value for 'botId'
 *   },
 * });
 */
export function useCreateDataFeedWithScrappingMutation(baseOptions?: Apollo.MutationHookOptions<CreateDataFeedWithScrappingMutation, CreateDataFeedWithScrappingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDataFeedWithScrappingMutation, CreateDataFeedWithScrappingMutationVariables>(CreateDataFeedWithScrappingDocument, options);
      }
export type CreateDataFeedWithScrappingMutationHookResult = ReturnType<typeof useCreateDataFeedWithScrappingMutation>;
export type CreateDataFeedWithScrappingMutationResult = Apollo.MutationResult<CreateDataFeedWithScrappingMutation>;
export type CreateDataFeedWithScrappingMutationOptions = Apollo.BaseMutationOptions<CreateDataFeedWithScrappingMutation, CreateDataFeedWithScrappingMutationVariables>;
export const CreateDataFeedWithTextDocument = gql`
    mutation CreateDataFeedWithText($name: String!, $text: String!, $botId: Int!) {
  createDataFeedWithText(name: $name, text: $text, botId: $botId)
}
    `;
export type CreateDataFeedWithTextMutationFn = Apollo.MutationFunction<CreateDataFeedWithTextMutation, CreateDataFeedWithTextMutationVariables>;

/**
 * __useCreateDataFeedWithTextMutation__
 *
 * To run a mutation, you first call `useCreateDataFeedWithTextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDataFeedWithTextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDataFeedWithTextMutation, { data, loading, error }] = useCreateDataFeedWithTextMutation({
 *   variables: {
 *      name: // value for 'name'
 *      text: // value for 'text'
 *      botId: // value for 'botId'
 *   },
 * });
 */
export function useCreateDataFeedWithTextMutation(baseOptions?: Apollo.MutationHookOptions<CreateDataFeedWithTextMutation, CreateDataFeedWithTextMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDataFeedWithTextMutation, CreateDataFeedWithTextMutationVariables>(CreateDataFeedWithTextDocument, options);
      }
export type CreateDataFeedWithTextMutationHookResult = ReturnType<typeof useCreateDataFeedWithTextMutation>;
export type CreateDataFeedWithTextMutationResult = Apollo.MutationResult<CreateDataFeedWithTextMutation>;
export type CreateDataFeedWithTextMutationOptions = Apollo.BaseMutationOptions<CreateDataFeedWithTextMutation, CreateDataFeedWithTextMutationVariables>;
export const DeleteDataFeedDocument = gql`
    mutation DeleteDataFeed($id: Int!) {
  deleteDataFeed(id: $id)
}
    `;
export type DeleteDataFeedMutationFn = Apollo.MutationFunction<DeleteDataFeedMutation, DeleteDataFeedMutationVariables>;

/**
 * __useDeleteDataFeedMutation__
 *
 * To run a mutation, you first call `useDeleteDataFeedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDataFeedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDataFeedMutation, { data, loading, error }] = useDeleteDataFeedMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDataFeedMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDataFeedMutation, DeleteDataFeedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDataFeedMutation, DeleteDataFeedMutationVariables>(DeleteDataFeedDocument, options);
      }
export type DeleteDataFeedMutationHookResult = ReturnType<typeof useDeleteDataFeedMutation>;
export type DeleteDataFeedMutationResult = Apollo.MutationResult<DeleteDataFeedMutation>;
export type DeleteDataFeedMutationOptions = Apollo.BaseMutationOptions<DeleteDataFeedMutation, DeleteDataFeedMutationVariables>;
export const EnterUserDetailsDocument = gql`
    mutation EnterUserDetails($options: UserFormInput!, $token: String!) {
  enterUserDetails(options: $options, token: $token) {
    userToken
    errors {
      field
      message
    }
  }
}
    `;
export type EnterUserDetailsMutationFn = Apollo.MutationFunction<EnterUserDetailsMutation, EnterUserDetailsMutationVariables>;

/**
 * __useEnterUserDetailsMutation__
 *
 * To run a mutation, you first call `useEnterUserDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnterUserDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enterUserDetailsMutation, { data, loading, error }] = useEnterUserDetailsMutation({
 *   variables: {
 *      options: // value for 'options'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useEnterUserDetailsMutation(baseOptions?: Apollo.MutationHookOptions<EnterUserDetailsMutation, EnterUserDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnterUserDetailsMutation, EnterUserDetailsMutationVariables>(EnterUserDetailsDocument, options);
      }
export type EnterUserDetailsMutationHookResult = ReturnType<typeof useEnterUserDetailsMutation>;
export type EnterUserDetailsMutationResult = Apollo.MutationResult<EnterUserDetailsMutation>;
export type EnterUserDetailsMutationOptions = Apollo.BaseMutationOptions<EnterUserDetailsMutation, EnterUserDetailsMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GetLinksDocument = gql`
    mutation GetLinks($url: String!, $depth: Int!, $maxNoUrls: Int!) {
  getLinks(url: $url, depth: $depth, maxNoUrls: $maxNoUrls)
}
    `;
export type GetLinksMutationFn = Apollo.MutationFunction<GetLinksMutation, GetLinksMutationVariables>;

/**
 * __useGetLinksMutation__
 *
 * To run a mutation, you first call `useGetLinksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetLinksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getLinksMutation, { data, loading, error }] = useGetLinksMutation({
 *   variables: {
 *      url: // value for 'url'
 *      depth: // value for 'depth'
 *      maxNoUrls: // value for 'maxNoUrls'
 *   },
 * });
 */
export function useGetLinksMutation(baseOptions?: Apollo.MutationHookOptions<GetLinksMutation, GetLinksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetLinksMutation, GetLinksMutationVariables>(GetLinksDocument, options);
      }
export type GetLinksMutationHookResult = ReturnType<typeof useGetLinksMutation>;
export type GetLinksMutationResult = Apollo.MutationResult<GetLinksMutation>;
export type GetLinksMutationOptions = Apollo.BaseMutationOptions<GetLinksMutation, GetLinksMutationVariables>;
export const JoinShopifyWaitlistDocument = gql`
    mutation JoinShopifyWaitlist($options: ShopifyWaitlistInput!) {
  joinShopifyWaitlist(options: $options)
}
    `;
export type JoinShopifyWaitlistMutationFn = Apollo.MutationFunction<JoinShopifyWaitlistMutation, JoinShopifyWaitlistMutationVariables>;

/**
 * __useJoinShopifyWaitlistMutation__
 *
 * To run a mutation, you first call `useJoinShopifyWaitlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinShopifyWaitlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinShopifyWaitlistMutation, { data, loading, error }] = useJoinShopifyWaitlistMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useJoinShopifyWaitlistMutation(baseOptions?: Apollo.MutationHookOptions<JoinShopifyWaitlistMutation, JoinShopifyWaitlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinShopifyWaitlistMutation, JoinShopifyWaitlistMutationVariables>(JoinShopifyWaitlistDocument, options);
      }
export type JoinShopifyWaitlistMutationHookResult = ReturnType<typeof useJoinShopifyWaitlistMutation>;
export type JoinShopifyWaitlistMutationResult = Apollo.MutationResult<JoinShopifyWaitlistMutation>;
export type JoinShopifyWaitlistMutationOptions = Apollo.BaseMutationOptions<JoinShopifyWaitlistMutation, JoinShopifyWaitlistMutationVariables>;
export const JoinWaitlistDocument = gql`
    mutation JoinWaitlist($options: WaitlistInput!) {
  joinWaitlist(options: $options)
}
    `;
export type JoinWaitlistMutationFn = Apollo.MutationFunction<JoinWaitlistMutation, JoinWaitlistMutationVariables>;

/**
 * __useJoinWaitlistMutation__
 *
 * To run a mutation, you first call `useJoinWaitlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinWaitlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinWaitlistMutation, { data, loading, error }] = useJoinWaitlistMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useJoinWaitlistMutation(baseOptions?: Apollo.MutationHookOptions<JoinWaitlistMutation, JoinWaitlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinWaitlistMutation, JoinWaitlistMutationVariables>(JoinWaitlistDocument, options);
      }
export type JoinWaitlistMutationHookResult = ReturnType<typeof useJoinWaitlistMutation>;
export type JoinWaitlistMutationResult = Apollo.MutationResult<JoinWaitlistMutation>;
export type JoinWaitlistMutationOptions = Apollo.BaseMutationOptions<JoinWaitlistMutation, JoinWaitlistMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    errors {
      field
      message
    }
    userToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    created
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const TrainBotDocument = gql`
    mutation TrainBot($botId: Int!) {
  trainBot(botId: $botId)
}
    `;
export type TrainBotMutationFn = Apollo.MutationFunction<TrainBotMutation, TrainBotMutationVariables>;

/**
 * __useTrainBotMutation__
 *
 * To run a mutation, you first call `useTrainBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrainBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trainBotMutation, { data, loading, error }] = useTrainBotMutation({
 *   variables: {
 *      botId: // value for 'botId'
 *   },
 * });
 */
export function useTrainBotMutation(baseOptions?: Apollo.MutationHookOptions<TrainBotMutation, TrainBotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrainBotMutation, TrainBotMutationVariables>(TrainBotDocument, options);
      }
export type TrainBotMutationHookResult = ReturnType<typeof useTrainBotMutation>;
export type TrainBotMutationResult = Apollo.MutationResult<TrainBotMutation>;
export type TrainBotMutationOptions = Apollo.BaseMutationOptions<TrainBotMutation, TrainBotMutationVariables>;
export const UpdateBotLogoAndNameDocument = gql`
    mutation UpdateBotLogoAndName($id: Int!, $name: String!, $logo: Upload!) {
  updateBotLogoAndName(id: $id, name: $name, logo: $logo) {
    id
    name
    logo
  }
}
    `;
export type UpdateBotLogoAndNameMutationFn = Apollo.MutationFunction<UpdateBotLogoAndNameMutation, UpdateBotLogoAndNameMutationVariables>;

/**
 * __useUpdateBotLogoAndNameMutation__
 *
 * To run a mutation, you first call `useUpdateBotLogoAndNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBotLogoAndNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBotLogoAndNameMutation, { data, loading, error }] = useUpdateBotLogoAndNameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      logo: // value for 'logo'
 *   },
 * });
 */
export function useUpdateBotLogoAndNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBotLogoAndNameMutation, UpdateBotLogoAndNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBotLogoAndNameMutation, UpdateBotLogoAndNameMutationVariables>(UpdateBotLogoAndNameDocument, options);
      }
export type UpdateBotLogoAndNameMutationHookResult = ReturnType<typeof useUpdateBotLogoAndNameMutation>;
export type UpdateBotLogoAndNameMutationResult = Apollo.MutationResult<UpdateBotLogoAndNameMutation>;
export type UpdateBotLogoAndNameMutationOptions = Apollo.BaseMutationOptions<UpdateBotLogoAndNameMutation, UpdateBotLogoAndNameMutationVariables>;
export const UpdateBotSettingDocument = gql`
    mutation UpdateBotSetting($id: Int!, $messageFieldColor: String!, $outgoingMessageColor: String!, $outgoingMessageTextColor: String!, $incommingMessageColor: String!, $incommingMessageTextColor: String!, $messageFieldTextColor: String!, $logo: String!) {
  updateBotSetting(
    logo: $logo
    messageFieldTextColor: $messageFieldTextColor
    outgoingMessageTextColor: $outgoingMessageTextColor
    outgoingMessageColor: $outgoingMessageColor
    incommingMessageTextColor: $incommingMessageTextColor
    incommingMessageColor: $incommingMessageColor
    messageFieldColor: $messageFieldColor
    id: $id
  )
}
    `;
export type UpdateBotSettingMutationFn = Apollo.MutationFunction<UpdateBotSettingMutation, UpdateBotSettingMutationVariables>;

/**
 * __useUpdateBotSettingMutation__
 *
 * To run a mutation, you first call `useUpdateBotSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBotSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBotSettingMutation, { data, loading, error }] = useUpdateBotSettingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      messageFieldColor: // value for 'messageFieldColor'
 *      outgoingMessageColor: // value for 'outgoingMessageColor'
 *      outgoingMessageTextColor: // value for 'outgoingMessageTextColor'
 *      incommingMessageColor: // value for 'incommingMessageColor'
 *      incommingMessageTextColor: // value for 'incommingMessageTextColor'
 *      messageFieldTextColor: // value for 'messageFieldTextColor'
 *      logo: // value for 'logo'
 *   },
 * });
 */
export function useUpdateBotSettingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBotSettingMutation, UpdateBotSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBotSettingMutation, UpdateBotSettingMutationVariables>(UpdateBotSettingDocument, options);
      }
export type UpdateBotSettingMutationHookResult = ReturnType<typeof useUpdateBotSettingMutation>;
export type UpdateBotSettingMutationResult = Apollo.MutationResult<UpdateBotSettingMutation>;
export type UpdateBotSettingMutationOptions = Apollo.BaseMutationOptions<UpdateBotSettingMutation, UpdateBotSettingMutationVariables>;
export const UpdateSettingDocument = gql`
    mutation UpdateSetting($id: Int!, $messageFieldColor: String!, $outgoingMessageColor: String!, $outgoingMessageTextColor: String!, $incommingMessageColor: String!, $incommingMessageTextColor: String!, $messageFieldTextColor: String!, $logo: String!) {
  updateSetting(
    logo: $logo
    messageFieldTextColor: $messageFieldTextColor
    outgoingMessageTextColor: $outgoingMessageTextColor
    outgoingMessageColor: $outgoingMessageColor
    incommingMessageTextColor: $incommingMessageTextColor
    incommingMessageColor: $incommingMessageColor
    messageFieldColor: $messageFieldColor
    id: $id
  )
}
    `;
export type UpdateSettingMutationFn = Apollo.MutationFunction<UpdateSettingMutation, UpdateSettingMutationVariables>;

/**
 * __useUpdateSettingMutation__
 *
 * To run a mutation, you first call `useUpdateSettingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSettingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSettingMutation, { data, loading, error }] = useUpdateSettingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      messageFieldColor: // value for 'messageFieldColor'
 *      outgoingMessageColor: // value for 'outgoingMessageColor'
 *      outgoingMessageTextColor: // value for 'outgoingMessageTextColor'
 *      incommingMessageColor: // value for 'incommingMessageColor'
 *      incommingMessageTextColor: // value for 'incommingMessageTextColor'
 *      messageFieldTextColor: // value for 'messageFieldTextColor'
 *      logo: // value for 'logo'
 *   },
 * });
 */
export function useUpdateSettingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSettingMutation, UpdateSettingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSettingMutation, UpdateSettingMutationVariables>(UpdateSettingDocument, options);
      }
export type UpdateSettingMutationHookResult = ReturnType<typeof useUpdateSettingMutation>;
export type UpdateSettingMutationResult = Apollo.MutationResult<UpdateSettingMutation>;
export type UpdateSettingMutationOptions = Apollo.BaseMutationOptions<UpdateSettingMutation, UpdateSettingMutationVariables>;
export const UploadLogoDocument = gql`
    mutation UploadLogo($fileName: String!, $file: Upload!, $id: Int!) {
  uploadLogo(fileName: $fileName, file: $file, id: $id)
}
    `;
export type UploadLogoMutationFn = Apollo.MutationFunction<UploadLogoMutation, UploadLogoMutationVariables>;

/**
 * __useUploadLogoMutation__
 *
 * To run a mutation, you first call `useUploadLogoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadLogoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadLogoMutation, { data, loading, error }] = useUploadLogoMutation({
 *   variables: {
 *      fileName: // value for 'fileName'
 *      file: // value for 'file'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUploadLogoMutation(baseOptions?: Apollo.MutationHookOptions<UploadLogoMutation, UploadLogoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadLogoMutation, UploadLogoMutationVariables>(UploadLogoDocument, options);
      }
export type UploadLogoMutationHookResult = ReturnType<typeof useUploadLogoMutation>;
export type UploadLogoMutationResult = Apollo.MutationResult<UploadLogoMutation>;
export type UploadLogoMutationOptions = Apollo.BaseMutationOptions<UploadLogoMutation, UploadLogoMutationVariables>;
export const UploadProfilePictureDocument = gql`
    mutation UploadProfilePicture($fileName: String!, $file: Upload!, $id: Int!) {
  uploadProfilePicture(fileName: $fileName, file: $file, id: $id)
}
    `;
export type UploadProfilePictureMutationFn = Apollo.MutationFunction<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>;

/**
 * __useUploadProfilePictureMutation__
 *
 * To run a mutation, you first call `useUploadProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProfilePictureMutation, { data, loading, error }] = useUploadProfilePictureMutation({
 *   variables: {
 *      fileName: // value for 'fileName'
 *      file: // value for 'file'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUploadProfilePictureMutation(baseOptions?: Apollo.MutationHookOptions<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>(UploadProfilePictureDocument, options);
      }
export type UploadProfilePictureMutationHookResult = ReturnType<typeof useUploadProfilePictureMutation>;
export type UploadProfilePictureMutationResult = Apollo.MutationResult<UploadProfilePictureMutation>;
export type UploadProfilePictureMutationOptions = Apollo.BaseMutationOptions<UploadProfilePictureMutation, UploadProfilePictureMutationVariables>;
export const GetBotTokenDocument = gql`
    query GetBotToken($botId: Int!) {
  getBotToken(id: $botId)
}
    `;

/**
 * __useGetBotTokenQuery__
 *
 * To run a query within a React component, call `useGetBotTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBotTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBotTokenQuery({
 *   variables: {
 *      botId: // value for 'botId'
 *   },
 * });
 */
export function useGetBotTokenQuery(baseOptions: Apollo.QueryHookOptions<GetBotTokenQuery, GetBotTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBotTokenQuery, GetBotTokenQueryVariables>(GetBotTokenDocument, options);
      }
export function useGetBotTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBotTokenQuery, GetBotTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBotTokenQuery, GetBotTokenQueryVariables>(GetBotTokenDocument, options);
        }
export type GetBotTokenQueryHookResult = ReturnType<typeof useGetBotTokenQuery>;
export type GetBotTokenLazyQueryHookResult = ReturnType<typeof useGetBotTokenLazyQuery>;
export type GetBotTokenQueryResult = Apollo.QueryResult<GetBotTokenQuery, GetBotTokenQueryVariables>;
export const GetBotsDocument = gql`
    query GetBots {
  getBots {
    id
    name
    messageFieldColor
    incommingMessageColor
    incommingMessageTextColor
    outgoingMessageColor
    outgoingMessageTextColor
    messageFieldTextColor
    logo
  }
}
    `;

/**
 * __useGetBotsQuery__
 *
 * To run a query within a React component, call `useGetBotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBotsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBotsQuery(baseOptions?: Apollo.QueryHookOptions<GetBotsQuery, GetBotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBotsQuery, GetBotsQueryVariables>(GetBotsDocument, options);
      }
export function useGetBotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBotsQuery, GetBotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBotsQuery, GetBotsQueryVariables>(GetBotsDocument, options);
        }
export type GetBotsQueryHookResult = ReturnType<typeof useGetBotsQuery>;
export type GetBotsLazyQueryHookResult = ReturnType<typeof useGetBotsLazyQuery>;
export type GetBotsQueryResult = Apollo.QueryResult<GetBotsQuery, GetBotsQueryVariables>;
export const GetDataFeedsDocument = gql`
    query GetDataFeeds($botId: Int!) {
  getDataFeeds(botId: $botId) {
    id
    name
    url
    fileName
    descriptionSnippet
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetDataFeedsQuery__
 *
 * To run a query within a React component, call `useGetDataFeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataFeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataFeedsQuery({
 *   variables: {
 *      botId: // value for 'botId'
 *   },
 * });
 */
export function useGetDataFeedsQuery(baseOptions: Apollo.QueryHookOptions<GetDataFeedsQuery, GetDataFeedsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataFeedsQuery, GetDataFeedsQueryVariables>(GetDataFeedsDocument, options);
      }
export function useGetDataFeedsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataFeedsQuery, GetDataFeedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataFeedsQuery, GetDataFeedsQueryVariables>(GetDataFeedsDocument, options);
        }
export type GetDataFeedsQueryHookResult = ReturnType<typeof useGetDataFeedsQuery>;
export type GetDataFeedsLazyQueryHookResult = ReturnType<typeof useGetDataFeedsLazyQuery>;
export type GetDataFeedsQueryResult = Apollo.QueryResult<GetDataFeedsQuery, GetDataFeedsQueryVariables>;
export const GetSettingByIdDocument = gql`
    query GetSettingById($id: Int!) {
  getSettingById(id: $id) {
    messageFieldColor
    incommingMessageColor
    incommingMessageTextColor
    outgoingMessageColor
    outgoingMessageTextColor
    messageFieldTextColor
    logo
    token
  }
}
    `;

/**
 * __useGetSettingByIdQuery__
 *
 * To run a query within a React component, call `useGetSettingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSettingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSettingByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSettingByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSettingByIdQuery, GetSettingByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSettingByIdQuery, GetSettingByIdQueryVariables>(GetSettingByIdDocument, options);
      }
export function useGetSettingByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSettingByIdQuery, GetSettingByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSettingByIdQuery, GetSettingByIdQueryVariables>(GetSettingByIdDocument, options);
        }
export type GetSettingByIdQueryHookResult = ReturnType<typeof useGetSettingByIdQuery>;
export type GetSettingByIdLazyQueryHookResult = ReturnType<typeof useGetSettingByIdLazyQuery>;
export type GetSettingByIdQueryResult = Apollo.QueryResult<GetSettingByIdQuery, GetSettingByIdQueryVariables>;
export const GetSettingByTokenDocument = gql`
    query GetSettingByToken($token: String!) {
  getSettingByToken(token: $token) {
    sessionId
    setting {
      messageFieldColor
      incommingMessageColor
      incommingMessageTextColor
      outgoingMessageColor
      outgoingMessageTextColor
      messageFieldTextColor
      logo
    }
  }
}
    `;

/**
 * __useGetSettingByTokenQuery__
 *
 * To run a query within a React component, call `useGetSettingByTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSettingByTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSettingByTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetSettingByTokenQuery(baseOptions: Apollo.QueryHookOptions<GetSettingByTokenQuery, GetSettingByTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSettingByTokenQuery, GetSettingByTokenQueryVariables>(GetSettingByTokenDocument, options);
      }
export function useGetSettingByTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSettingByTokenQuery, GetSettingByTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSettingByTokenQuery, GetSettingByTokenQueryVariables>(GetSettingByTokenDocument, options);
        }
export type GetSettingByTokenQueryHookResult = ReturnType<typeof useGetSettingByTokenQuery>;
export type GetSettingByTokenLazyQueryHookResult = ReturnType<typeof useGetSettingByTokenLazyQuery>;
export type GetSettingByTokenQueryResult = Apollo.QueryResult<GetSettingByTokenQuery, GetSettingByTokenQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    fullName
    email
    picture
    company
    title
    noOfEmployees
    stageOfAIAdoption
    whereDidYouHearAboutUs
    operations
    subscription
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SettingDocument = gql`
    query Setting($token: String!) {
  getSettingByToken(token: $token) {
    sessionId
    setting {
      messageFieldColor
      incommingMessageColor
      incommingMessageTextColor
      outgoingMessageColor
      outgoingMessageTextColor
      messageFieldTextColor
      logo
    }
  }
}
    `;

/**
 * __useSettingQuery__
 *
 * To run a query within a React component, call `useSettingQuery` and pass it any options that fit your needs.
 * When your component renders, `useSettingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSettingQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSettingQuery(baseOptions: Apollo.QueryHookOptions<SettingQuery, SettingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SettingQuery, SettingQueryVariables>(SettingDocument, options);
      }
export function useSettingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SettingQuery, SettingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SettingQuery, SettingQueryVariables>(SettingDocument, options);
        }
export type SettingQueryHookResult = ReturnType<typeof useSettingQuery>;
export type SettingLazyQueryHookResult = ReturnType<typeof useSettingLazyQuery>;
export type SettingQueryResult = Apollo.QueryResult<SettingQuery, SettingQueryVariables>;