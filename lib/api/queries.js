import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fs from 'fs';
import MockUser from '@/lib/mock_user';

const PROFILE_QUERY = gql`
  ${fs.readFileSync('graphql_config/queries/profile_query.graphql', 'utf-8')}
`;

const JOBS_QUERY = gql`
  ${fs.readFileSync('graphql_config/queries/jobs_query.graphql', 'utf-8')}
`;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI, // Set your GraphQL API URL here
});

const authLink = setContext((_, { headers }) => {
  // Set authentication headers here if needed
  const token = process.env.NEXT_PUBLIC_API_KEY; // Replace with your API token
  return {
    headers: {
      ...headers,
      'FLEXHIRE-API-KEY': token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export async function getProfileData() {
  // Replace this function with code that fetches profile data via GraphQL
  // Example:
  // const { data } = await client.query({
  //   query: PROFILE_QUERY,
  // });
  // return data.profile;
  const data = await MockUser.fakeData();
  return data// Mock profile data
}

export async function getJobsData() {
  // Replace this function with code that fetches job data via GraphQL
  // Example:
  // const { data } = await client.query({
  //   query: JOBS_QUERY,
  // });
  // return data.jobs;
  return await MockUser.fakeData(); // Mock job data
}
