import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const SET_MESSAGE = gql`
  mutation updateMessage($message: String!) {
    setMessage(message: $message) {
      ciccio
    }
  }
`;

client.mutate({
  mutation: SET_MESSAGE,
  variables : {
    message : 'Hello world!'
  }
})
  .then(result => console.log('All done.', result))
  .catch(error => console.log('Error occurred', error))
