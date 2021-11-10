import { gql} from '@apollo/client';

export const GET_DETAILS = gql`
  query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    moves {
      move {
        name
      }
    }
    types {
      type {
        name
      }
    }
    message
    status
  }
}
`;