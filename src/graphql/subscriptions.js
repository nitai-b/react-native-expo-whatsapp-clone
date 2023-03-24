/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
      id
      Messages {
        items {
          id
          text
          chatroomID
          userID
          createdAt
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
        text
        chatroomID
        userID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
      id
      Messages {
        items {
          id
          text
          chatroomID
          userID
          createdAt
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
        text
        chatroomID
        userID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
      id
      Messages {
        items {
          id
          text
          chatroomID
          userID
          createdAt
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
        text
        chatroomID
        userID
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      id
      text
      chatroomID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
      id
      text
      chatroomID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
      id
      text
      chatroomID
      userID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      status
      image
      Messages {
        items {
          id
          text
          chatroomID
          userID
          createdAt
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      status
      image
      Messages {
        items {
          id
          text
          chatroomID
          userID
          createdAt
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      status
      image
      Messages {
        items {
          id
          text
          chatroomID
          userID
          createdAt
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
export const onCreateUserChatRoom = /* GraphQL */ `
  subscription OnCreateUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
  ) {
    onCreateUserChatRoom(filter: $filter) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        Messages {
          items {
            id
            text
            chatroomID
            userID
            createdAt
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
          text
          chatroomID
          userID
          createdAt
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
            text
            chatroomID
            userID
            createdAt
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
export const onUpdateUserChatRoom = /* GraphQL */ `
  subscription OnUpdateUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
  ) {
    onUpdateUserChatRoom(filter: $filter) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        Messages {
          items {
            id
            text
            chatroomID
            userID
            createdAt
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
          text
          chatroomID
          userID
          createdAt
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
            text
            chatroomID
            userID
            createdAt
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
export const onDeleteUserChatRoom = /* GraphQL */ `
  subscription OnDeleteUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
  ) {
    onDeleteUserChatRoom(filter: $filter) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        Messages {
          items {
            id
            text
            chatroomID
            userID
            createdAt
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
          text
          chatroomID
          userID
          createdAt
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
            text
            chatroomID
            userID
            createdAt
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
