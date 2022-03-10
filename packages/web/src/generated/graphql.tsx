import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type BirthdayConfig = {
  __typename?: "BirthdayConfig";
  guildId: Scalars["String"];
  announceChannelId?: Maybe<Scalars["String"]>;
};

export type Command = {
  __typename?: "Command";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type CommandCategory = {
  __typename?: "CommandCategory";
  category: Scalars["String"];
  commands: Array<CommandWithConfig>;
};

export type CommandConfig = {
  __typename?: "CommandConfig";
  aliases?: Maybe<Array<Scalars["String"]>>;
  description: Scalars["String"];
  usage?: Maybe<Scalars["String"]>;
  examples?: Maybe<Array<Scalars["String"]>>;
  permissions?: Maybe<Array<Scalars["String"]>>;
};

export type CommandWithConfig = {
  __typename?: "CommandWithConfig";
  name: Scalars["String"];
  config: CommandConfig;
};

export type FieldError = {
  __typename?: "FieldError";
  path: Scalars["String"];
  message: Scalars["String"];
};

export type Guild = {
  __typename?: "Guild";
  icon?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  name: Scalars["String"];
  owner: Scalars["String"];
  permissions: Scalars["Float"];
};

export type GuildCommandInput = {
  guildId: Scalars["String"];
  commandName: Scalars["String"];
};

export type GuildConfiguration = {
  __typename?: "GuildConfiguration";
  prefix: Scalars["String"];
  language: Scalars["String"];
  welcomeMessage?: Maybe<Scalars["String"]>;
  welcomeChannelId?: Maybe<Scalars["String"]>;
  welcomeRoleId?: Maybe<Scalars["String"]>;
  preferDM: Scalars["Boolean"];
  leaveMessage?: Maybe<Scalars["String"]>;
  leaveChannelId?: Maybe<Scalars["String"]>;
  disabledCommands: Array<Command>;
};

export type GuildInput = {
  guildId: Scalars["String"];
  prefix: Scalars["String"];
  language: Scalars["String"];
  welcomeMessage?: Maybe<Scalars["String"]>;
  welcomeChannelId?: Maybe<Scalars["String"]>;
  welcomeRoleId?: Maybe<Scalars["String"]>;
  preferDM: Scalars["Boolean"];
  leaveMessage?: Maybe<Scalars["String"]>;
  leaveChannelId?: Maybe<Scalars["String"]>;
};

export type GuildMember = {
  __typename?: "GuildMember";
  id: Scalars["String"];
  name: Scalars["String"];
};

export type GuildResponse = {
  __typename?: "GuildResponse";
  guild?: Maybe<GuildConfiguration>;
  errors?: Maybe<Array<FieldError>>;
};

export type GuildWithExtras = {
  __typename?: "GuildWithExtras";
  prefix: Scalars["String"];
  language: Scalars["String"];
  welcomeMessage?: Maybe<Scalars["String"]>;
  welcomeChannelId?: Maybe<Scalars["String"]>;
  welcomeRoleId?: Maybe<Scalars["String"]>;
  preferDM: Scalars["Boolean"];
  leaveMessage?: Maybe<Scalars["String"]>;
  leaveChannelId?: Maybe<Scalars["String"]>;
  disabledCommands: Array<Command>;
  channels: Array<TextChannel>;
  roles: Array<Role>;
  members: Array<GuildMember>;
};

export type Mutation = {
  __typename?: "Mutation";
  logout: Scalars["Boolean"];
  deleteBirthdayConfig: Scalars["Boolean"];
  upsertBirthdayConfig: Scalars["Boolean"];
  updateGuild: GuildResponse;
  toggleCommand: Scalars["Boolean"];
  deletePresence: Scalars["Boolean"];
};

export type MutationDeleteBirthdayConfigArgs = {
  guildId: Scalars["String"];
};

export type MutationUpsertBirthdayConfigArgs = {
  announceChannelId?: Maybe<Scalars["String"]>;
  guildId: Scalars["String"];
};

export type MutationUpdateGuildArgs = {
  input: GuildInput;
};

export type MutationToggleCommandArgs = {
  input: GuildCommandInput;
};

export type MutationDeletePresenceArgs = {
  presenceId: Scalars["String"];
};

export type Presence = {
  __typename?: "Presence";
  id: Scalars["ID"];
  guildId: Scalars["String"];
  userId: Scalars["String"];
  status: Scalars["String"];
  createdDate: Scalars["DateTime"];
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  commands: Array<Command>;
  commandCategories: Array<CommandCategory>;
  me?: Maybe<User>;
  config?: Maybe<BirthdayConfig>;
  guilds: Array<Scalars["String"]>;
  guild?: Maybe<GuildWithExtras>;
  presences: Array<Presence>;
};

export type QueryConfigArgs = {
  guildId: Scalars["String"];
};

export type QueryGuildArgs = {
  guildId: Scalars["String"];
};

export type QueryPresencesArgs = {
  guildId: Scalars["String"];
};

export type Role = {
  __typename?: "Role";
  id: Scalars["String"];
  name: Scalars["String"];
};

export type TextChannel = {
  __typename?: "TextChannel";
  id: Scalars["String"];
  name: Scalars["String"];
};

export type User = {
  __typename?: "User";
  avatar?: Maybe<Scalars["String"]>;
  discriminator: Scalars["String"];
  guilds: Array<Guild>;
  id: Scalars["String"];
  username: Scalars["String"];
};

export type BirthdayConfigQueryVariables = {
  guildId: Scalars["String"];
};

export type BirthdayConfigQuery = { __typename?: "Query" } & {
  config: Maybe<
    { __typename?: "BirthdayConfig" } & Pick<
      BirthdayConfig,
      "guildId" | "announceChannelId"
    >
  >;
};

export type CommandCategoriesQueryVariables = {};

export type CommandCategoriesQuery = { __typename?: "Query" } & {
  commandCategories: Array<
    { __typename?: "CommandCategory" } & Pick<CommandCategory, "category"> & {
        commands: Array<
          { __typename?: "CommandWithConfig" } & Pick<
            CommandWithConfig,
            "name"
          > & {
              config: { __typename?: "CommandConfig" } & Pick<
                CommandConfig,
                "aliases" | "description" | "usage" | "examples" | "permissions"
              >;
            }
        >;
      }
  >;
};

export type CommandsQueryVariables = {};

export type CommandsQuery = { __typename?: "Query" } & {
  commands: Array<{ __typename?: "Command" } & Pick<Command, "name">>;
};

export type DeleteBirthdayConfigMutationVariables = {
  guildId: Scalars["String"];
};

export type DeleteBirthdayConfigMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteBirthdayConfig"
>;

export type DeletePresenceMutationVariables = {
  presenceId: Scalars["String"];
};

export type DeletePresenceMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deletePresence"
>;

export type GuildQueryVariables = {
  guildId: Scalars["String"];
};

export type GuildQuery = { __typename?: "Query" } & {
  guild: Maybe<
    { __typename?: "GuildWithExtras" } & Pick<
      GuildWithExtras,
      | "prefix"
      | "language"
      | "welcomeMessage"
      | "welcomeChannelId"
      | "welcomeRoleId"
      | "preferDM"
      | "leaveMessage"
      | "leaveChannelId"
    > & {
        disabledCommands: Array<
          { __typename?: "Command" } & Pick<Command, "name">
        >;
        channels: Array<
          { __typename?: "TextChannel" } & Pick<TextChannel, "id" | "name">
        >;
        roles: Array<{ __typename?: "Role" } & Pick<Role, "id" | "name">>;
        members: Array<
          { __typename?: "GuildMember" } & Pick<GuildMember, "id" | "name">
        >;
      }
  >;
};

export type GuildsQueryVariables = {};

export type GuildsQuery = { __typename?: "Query" } & Pick<Query, "guilds">;

export type HelloQueryVariables = {};

export type HelloQuery = { __typename?: "Query" } & Pick<Query, "hello">;

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "avatar" | "discriminator" | "id" | "username"
    > & {
        guilds: Array<
          { __typename?: "Guild" } & Pick<
            Guild,
            "icon" | "id" | "name" | "owner" | "permissions"
          >
        >;
      }
  >;
};

export type PresencesQueryVariables = {
  guildId: Scalars["String"];
};

export type PresencesQuery = { __typename?: "Query" } & {
  presences: Array<
    { __typename?: "Presence" } & Pick<
      Presence,
      "id" | "userId" | "status" | "createdDate"
    >
  >;
};

export type ToggleCommandMutationVariables = {
  input: GuildCommandInput;
};

export type ToggleCommandMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "toggleCommand"
>;

export type UpdateGuildMutationVariables = {
  input: GuildInput;
};

export type UpdateGuildMutation = { __typename?: "Mutation" } & {
  updateGuild: { __typename?: "GuildResponse" } & {
    guild: Maybe<
      { __typename?: "GuildConfiguration" } & Pick<
        GuildConfiguration,
        | "prefix"
        | "language"
        | "welcomeMessage"
        | "welcomeChannelId"
        | "preferDM"
        | "leaveMessage"
        | "leaveChannelId"
      >
    >;
    errors: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "path" | "message">
      >
    >;
  };
};

export type UpsertBirthdayConfigMutationVariables = {
  guildId: Scalars["String"];
  announceChannelId?: Maybe<Scalars["String"]>;
};

export type UpsertBirthdayConfigMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "upsertBirthdayConfig"
>;

export const BirthdayConfigDocument = gql`
  query BirthdayConfig($guildId: String!) {
    config(guildId: $guildId) {
      guildId
      announceChannelId
    }
  }
`;

/**
 * __useBirthdayConfigQuery__
 *
 * To run a query within a React component, call `useBirthdayConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useBirthdayConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBirthdayConfigQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useBirthdayConfigQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    BirthdayConfigQuery,
    BirthdayConfigQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    BirthdayConfigQuery,
    BirthdayConfigQueryVariables
  >(BirthdayConfigDocument, baseOptions);
}
export function useBirthdayConfigLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    BirthdayConfigQuery,
    BirthdayConfigQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    BirthdayConfigQuery,
    BirthdayConfigQueryVariables
  >(BirthdayConfigDocument, baseOptions);
}
export type BirthdayConfigQueryHookResult = ReturnType<
  typeof useBirthdayConfigQuery
>;
export type BirthdayConfigLazyQueryHookResult = ReturnType<
  typeof useBirthdayConfigLazyQuery
>;
export type BirthdayConfigQueryResult = ApolloReactCommon.QueryResult<
  BirthdayConfigQuery,
  BirthdayConfigQueryVariables
>;
export const CommandCategoriesDocument = gql`
  query CommandCategories {
    commandCategories {
      category
      commands {
        name
        config {
          aliases
          description
          usage
          examples
          permissions
        }
      }
    }
  }
`;

/**
 * __useCommandCategoriesQuery__
 *
 * To run a query within a React component, call `useCommandCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommandCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommandCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommandCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CommandCategoriesQuery,
    CommandCategoriesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    CommandCategoriesQuery,
    CommandCategoriesQueryVariables
  >(CommandCategoriesDocument, baseOptions);
}
export function useCommandCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CommandCategoriesQuery,
    CommandCategoriesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    CommandCategoriesQuery,
    CommandCategoriesQueryVariables
  >(CommandCategoriesDocument, baseOptions);
}
export type CommandCategoriesQueryHookResult = ReturnType<
  typeof useCommandCategoriesQuery
>;
export type CommandCategoriesLazyQueryHookResult = ReturnType<
  typeof useCommandCategoriesLazyQuery
>;
export type CommandCategoriesQueryResult = ApolloReactCommon.QueryResult<
  CommandCategoriesQuery,
  CommandCategoriesQueryVariables
>;
export const CommandsDocument = gql`
  query Commands {
    commands {
      name
    }
  }
`;

/**
 * __useCommandsQuery__
 *
 * To run a query within a React component, call `useCommandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommandsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommandsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CommandsQuery,
    CommandsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CommandsQuery, CommandsQueryVariables>(
    CommandsDocument,
    baseOptions
  );
}
export function useCommandsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CommandsQuery,
    CommandsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<CommandsQuery, CommandsQueryVariables>(
    CommandsDocument,
    baseOptions
  );
}
export type CommandsQueryHookResult = ReturnType<typeof useCommandsQuery>;
export type CommandsLazyQueryHookResult = ReturnType<
  typeof useCommandsLazyQuery
>;
export type CommandsQueryResult = ApolloReactCommon.QueryResult<
  CommandsQuery,
  CommandsQueryVariables
>;
export const DeleteBirthdayConfigDocument = gql`
  mutation DeleteBirthdayConfig($guildId: String!) {
    deleteBirthdayConfig(guildId: $guildId)
  }
`;
export type DeleteBirthdayConfigMutationFn = ApolloReactCommon.MutationFunction<
  DeleteBirthdayConfigMutation,
  DeleteBirthdayConfigMutationVariables
>;

/**
 * __useDeleteBirthdayConfigMutation__
 *
 * To run a mutation, you first call `useDeleteBirthdayConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBirthdayConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBirthdayConfigMutation, { data, loading, error }] = useDeleteBirthdayConfigMutation({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useDeleteBirthdayConfigMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteBirthdayConfigMutation,
    DeleteBirthdayConfigMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteBirthdayConfigMutation,
    DeleteBirthdayConfigMutationVariables
  >(DeleteBirthdayConfigDocument, baseOptions);
}
export type DeleteBirthdayConfigMutationHookResult = ReturnType<
  typeof useDeleteBirthdayConfigMutation
>;
export type DeleteBirthdayConfigMutationResult = ApolloReactCommon.MutationResult<
  DeleteBirthdayConfigMutation
>;
export type DeleteBirthdayConfigMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteBirthdayConfigMutation,
  DeleteBirthdayConfigMutationVariables
>;
export const DeletePresenceDocument = gql`
  mutation DeletePresence($presenceId: String!) {
    deletePresence(presenceId: $presenceId)
  }
`;
export type DeletePresenceMutationFn = ApolloReactCommon.MutationFunction<
  DeletePresenceMutation,
  DeletePresenceMutationVariables
>;

/**
 * __useDeletePresenceMutation__
 *
 * To run a mutation, you first call `useDeletePresenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePresenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePresenceMutation, { data, loading, error }] = useDeletePresenceMutation({
 *   variables: {
 *      presenceId: // value for 'presenceId'
 *   },
 * });
 */
export function useDeletePresenceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeletePresenceMutation,
    DeletePresenceMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeletePresenceMutation,
    DeletePresenceMutationVariables
  >(DeletePresenceDocument, baseOptions);
}
export type DeletePresenceMutationHookResult = ReturnType<
  typeof useDeletePresenceMutation
>;
export type DeletePresenceMutationResult = ApolloReactCommon.MutationResult<
  DeletePresenceMutation
>;
export type DeletePresenceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeletePresenceMutation,
  DeletePresenceMutationVariables
>;
export const GuildDocument = gql`
  query Guild($guildId: String!) {
    guild(guildId: $guildId) {
      prefix
      language
      welcomeMessage
      welcomeChannelId
      welcomeRoleId
      preferDM
      leaveMessage
      leaveChannelId
      disabledCommands {
        name
      }
      channels {
        id
        name
      }
      roles {
        id
        name
      }
      members {
        id
        name
      }
    }
  }
`;

/**
 * __useGuildQuery__
 *
 * To run a query within a React component, call `useGuildQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function useGuildQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GuildQuery,
    GuildQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GuildQuery, GuildQueryVariables>(
    GuildDocument,
    baseOptions
  );
}
export function useGuildLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GuildQuery,
    GuildQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GuildQuery, GuildQueryVariables>(
    GuildDocument,
    baseOptions
  );
}
export type GuildQueryHookResult = ReturnType<typeof useGuildQuery>;
export type GuildLazyQueryHookResult = ReturnType<typeof useGuildLazyQuery>;
export type GuildQueryResult = ApolloReactCommon.QueryResult<
  GuildQuery,
  GuildQueryVariables
>;
export const GuildsDocument = gql`
  query Guilds {
    guilds
  }
`;

/**
 * __useGuildsQuery__
 *
 * To run a query within a React component, call `useGuildsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGuildsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGuildsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGuildsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GuildsQuery,
    GuildsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GuildsQuery, GuildsQueryVariables>(
    GuildsDocument,
    baseOptions
  );
}
export function useGuildsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GuildsQuery,
    GuildsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GuildsQuery, GuildsQueryVariables>(
    GuildsDocument,
    baseOptions
  );
}
export type GuildsQueryHookResult = ReturnType<typeof useGuildsQuery>;
export type GuildsLazyQueryHookResult = ReturnType<typeof useGuildsLazyQuery>;
export type GuildsQueryResult = ApolloReactCommon.QueryResult<
  GuildsQuery,
  GuildsQueryVariables
>;
export const HelloDocument = gql`
  query Hello {
    hello
  }
`;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    HelloQuery,
    HelloQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    baseOptions
  );
}
export function useHelloLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    HelloQuery,
    HelloQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    baseOptions
  );
}
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = ApolloReactCommon.QueryResult<
  HelloQuery,
  HelloQueryVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

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
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      avatar
      discriminator
      guilds {
        icon
        id
        name
        owner
        permissions
      }
      id
      username
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
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>;
export const PresencesDocument = gql`
  query Presences($guildId: String!) {
    presences(guildId: $guildId) {
      id
      userId
      status
      createdDate
    }
  }
`;

/**
 * __usePresencesQuery__
 *
 * To run a query within a React component, call `usePresencesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresencesQuery({
 *   variables: {
 *      guildId: // value for 'guildId'
 *   },
 * });
 */
export function usePresencesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    PresencesQuery,
    PresencesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<PresencesQuery, PresencesQueryVariables>(
    PresencesDocument,
    baseOptions
  );
}
export function usePresencesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    PresencesQuery,
    PresencesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<PresencesQuery, PresencesQueryVariables>(
    PresencesDocument,
    baseOptions
  );
}
export type PresencesQueryHookResult = ReturnType<typeof usePresencesQuery>;
export type PresencesLazyQueryHookResult = ReturnType<
  typeof usePresencesLazyQuery
>;
export type PresencesQueryResult = ApolloReactCommon.QueryResult<
  PresencesQuery,
  PresencesQueryVariables
>;
export const ToggleCommandDocument = gql`
  mutation ToggleCommand($input: GuildCommandInput!) {
    toggleCommand(input: $input)
  }
`;
export type ToggleCommandMutationFn = ApolloReactCommon.MutationFunction<
  ToggleCommandMutation,
  ToggleCommandMutationVariables
>;

/**
 * __useToggleCommandMutation__
 *
 * To run a mutation, you first call `useToggleCommandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleCommandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleCommandMutation, { data, loading, error }] = useToggleCommandMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleCommandMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ToggleCommandMutation,
    ToggleCommandMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ToggleCommandMutation,
    ToggleCommandMutationVariables
  >(ToggleCommandDocument, baseOptions);
}
export type ToggleCommandMutationHookResult = ReturnType<
  typeof useToggleCommandMutation
>;
export type ToggleCommandMutationResult = ApolloReactCommon.MutationResult<
  ToggleCommandMutation
>;
export type ToggleCommandMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ToggleCommandMutation,
  ToggleCommandMutationVariables
>;
export const UpdateGuildDocument = gql`
  mutation UpdateGuild($input: GuildInput!) {
    updateGuild(input: $input) {
      guild {
        prefix
        language
        welcomeMessage
        welcomeChannelId
        preferDM
        leaveMessage
        leaveChannelId
      }
      errors {
        path
        message
      }
    }
  }
`;
export type UpdateGuildMutationFn = ApolloReactCommon.MutationFunction<
  UpdateGuildMutation,
  UpdateGuildMutationVariables
>;

/**
 * __useUpdateGuildMutation__
 *
 * To run a mutation, you first call `useUpdateGuildMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGuildMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGuildMutation, { data, loading, error }] = useUpdateGuildMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGuildMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateGuildMutation,
    UpdateGuildMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateGuildMutation,
    UpdateGuildMutationVariables
  >(UpdateGuildDocument, baseOptions);
}
export type UpdateGuildMutationHookResult = ReturnType<
  typeof useUpdateGuildMutation
>;
export type UpdateGuildMutationResult = ApolloReactCommon.MutationResult<
  UpdateGuildMutation
>;
export type UpdateGuildMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateGuildMutation,
  UpdateGuildMutationVariables
>;
export const UpsertBirthdayConfigDocument = gql`
  mutation UpsertBirthdayConfig($guildId: String!, $announceChannelId: String) {
    upsertBirthdayConfig(
      guildId: $guildId
      announceChannelId: $announceChannelId
    )
  }
`;
export type UpsertBirthdayConfigMutationFn = ApolloReactCommon.MutationFunction<
  UpsertBirthdayConfigMutation,
  UpsertBirthdayConfigMutationVariables
>;

/**
 * __useUpsertBirthdayConfigMutation__
 *
 * To run a mutation, you first call `useUpsertBirthdayConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertBirthdayConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertBirthdayConfigMutation, { data, loading, error }] = useUpsertBirthdayConfigMutation({
 *   variables: {
 *      guildId: // value for 'guildId'
 *      announceChannelId: // value for 'announceChannelId'
 *   },
 * });
 */
export function useUpsertBirthdayConfigMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpsertBirthdayConfigMutation,
    UpsertBirthdayConfigMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpsertBirthdayConfigMutation,
    UpsertBirthdayConfigMutationVariables
  >(UpsertBirthdayConfigDocument, baseOptions);
}
export type UpsertBirthdayConfigMutationHookResult = ReturnType<
  typeof useUpsertBirthdayConfigMutation
>;
export type UpsertBirthdayConfigMutationResult = ApolloReactCommon.MutationResult<
  UpsertBirthdayConfigMutation
>;
export type UpsertBirthdayConfigMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpsertBirthdayConfigMutation,
  UpsertBirthdayConfigMutationVariables
>;
