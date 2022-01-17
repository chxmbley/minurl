import { PrismaClient } from '@prisma/client';
import client from '~lib/db/client';

test('exports an Prisma client instance', () => {
  expect(client).toBeInstanceOf(PrismaClient);
});
