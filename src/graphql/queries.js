/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      name
      image
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          chatRoomId
          userId
          chatRoom {
            id
            name
            image
            createdAt
            updatedAt
            chatRoomLastMessageId
          }
          user {
            id
            name
            status
            image
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      LastMessage {
        id
        createdAt
        text
        chatroomID
        userID
        updatedAt
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
    }
  }
`;
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        Messages {
          items {
            id
            createdAt
            text
            chatroomID
            userID
            updatedAt
          }
          nextToken
        }
        users {
          items {
            id
            chatRoomId
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        LastMessage {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      createdAt
      text
      chatroomID
      userID
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        text
        chatroomID
        userID
        updatedAt
      }
      nextToken
    }
  }
`;
export const listMessagesByChatRoom = /* GraphQL */ `
  query ListMessagesByChatRoom(
    $chatroomID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesByChatRoom(
      chatroomID: $chatroomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        text
        chatroomID
        userID
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesByUserID = /* GraphQL */ `
  query MessagesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        text
        chatroomID
        userID
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      status
      image
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
        }
        nextToken
      }
      ChatRooms {
        items {
          id
          chatRoomId
          userId
          chatRoom {
            id
            name
            image
            createdAt
            updatedAt
            chatRoomLastMessageId
          }
          user {
            id
            name
            status
            image
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        image
        Messages {
          items {
            id
            createdAt
            text
            chatroomID
            userID
            updatedAt
          }
          nextToken
        }
        ChatRooms {
          items {
            id
            chatRoomId
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserChatRoom = /* GraphQL */ `
  query GetUserChatRoom($id: ID!) {
    getUserChatRoom(id: $id) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        name
        image
        Messages {
          items {
            id
            createdAt
            text
            chatroomID
            userID
            updatedAt
          }
          nextToken
        }
        users {
          items {
            id
            chatRoomId
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        LastMessage {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      user {
        id
        name
        status
        image
        Messages {
          items {
            id
            createdAt
            text
            chatroomID
            userID
            updatedAt
          }
          nextToken
        }
        ChatRooms {
          items {
            id
            chatRoomId
            userId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUserChatRooms = /* GraphQL */ `
  query ListUserChatRooms(
    $filter: ModelUserChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        chatRoomId
        userId
        chatRoom {
          id
          name
          image
          Messages {
            nextToken
          }
          users {
            nextToken
          }
          LastMessage {
            id
            createdAt
            text
            chatroomID
            userID
            updatedAt
          }
          createdAt
          updatedAt
          chatRoomLastMessageId
        }
        user {
          id
          name
          status
          image
          Messages {
            nextToken
          }
          ChatRooms {
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userChatRoomsByChatRoomId = /* GraphQL */ `
  query UserChatRoomsByChatRoomId(
    $chatRoomId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userChatRoomsByChatRoomId(
      chatRoomId: $chatRoomId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        chatRoomId
        userId
        chatRoom {
          id
          name
          image
          Messages {
            nextToken
          }
          users {
            nextToken
          }
          LastMessage {
            id
            createdAt
            text
            chatroomID
            userID
            updatedAt
          }
          createdAt
          updatedAt
          chatRoomLastMessageId
        }
        user {
          id
          name
          status
          image
          Messages {
            nextToken
          }
          ChatRooms {
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userChatRoomsByUserId = /* GraphQL */ `
  query UserChatRoomsByUserId(
    $userId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userChatRoomsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        chatRoomId
        userId
        chatRoom {
          id
          name
          image
          Messages {
            nextToken
          }
          users {
            nextToken
          }
          LastMessage {
            id
            createdAt
            text
            chatroomID
            userID
            updatedAt
          }
          createdAt
          updatedAt
          chatRoomLastMessageId
        }
        user {
          id
          name
          status
          image
          Messages {
            nextToken
          }
          ChatRooms {
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
