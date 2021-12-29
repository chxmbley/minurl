// noinspection GraphQLMissingType, GraphQLUnresolvedReference

import { gql } from 'apollo-server-micro';

export default gql`
  type Todo {
    id: ID! @id
    text: String!
    completed: Boolean!
  }

  type List {
    id: ID! @id
    title: String!
    items: [Todo!] @relationship(type: "BELONGS_TO", direction: IN)
  }
`;
