import neo4j from 'neo4j-driver';
import type { Result } from 'neo4j-driver';
import type { Query } from 'neo4j-driver-core/types/types';

export const driver = neo4j.driver(
  process.env.NEO4J_URI!,
  neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!),
);

export const query = async (query: Query, params?: Record<string, unknown>): Promise<Result> => {
  const session = driver.session();
  const result = await session.run(query, params);
  await session.close();
  return result;
};
