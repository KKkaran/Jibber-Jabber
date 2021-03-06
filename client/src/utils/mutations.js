import { gql } from '@apollo/client';

export const QUERY_Users = gql`
  query {
    users {
      _id
      username
      email
    }
  }
`;
export const Query_Channel = gql`
  query ($id: ID!) {
    channel(_id: $id) {
      _id
      users {
        _id
      }
      messages {
        _id
        textValue
        sender {
          _id
        }
      }
    }
  }
`;
export const Query_Me = gql`
  query me {
    me {
      _id
      username
      channelModel {
        _id
        users {
          _id
          username
        }
        messages {
          textValue
          sender {
            username
          }
        }
        createdAt
      }
    }
  }
`;

export const Mutation_findUser = gql`
  mutation ($email: String!) {
    findUser(email: $email) {
      username
    }
  }
`;

export const Mutation_Login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const Mutation_signup = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      user {
        username
        _id
      }
      token
    }
  }
`;
export const Mutation_SendMessage = gql`
  mutation sendMessage($id: ID, $textValue: String!, $senderId: Userss!) {
    sendMessage(_id: $id, textValue: $textValue, senderId: $senderId) {
      users {
        email
      }
      messages {
        textValue
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($textValue: String!, $senderId: ID!, $channelId: ID) {
    sendMessage(
      textValue: $textValue
      senderId: $senderId
      channelId: $channelId
    ) {
      _id
      messages {
        _id
        textValue
        sender {
          _id
          username
          email
        }
        createdAt
      }
    }
  }
`;

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($users: [Userss]!, $channelName: String!) {
    createChannel(users: $users, channelName: $channelName) {
      _id
      channelName
    }
  }
`;
