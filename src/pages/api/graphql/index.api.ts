import { ApolloServer } from 'apollo-server-micro';
import cors from 'micro-cors';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import { driver } from '~lib/neo4j';
import typeDefs from './typeDefs';
import type { NextApiHandler } from 'next';

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const apolloServer = new ApolloServer({
  schema: neoSchema.schema,
  plugins: process.env.NODE_ENV === 'production' ? [ApolloServerPluginLandingPageDisabled()] : [],
});

const startServer = apolloServer.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = cors()(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});

export default handler;
