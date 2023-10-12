export const getMessages = `query GetMessages($id: String!) {
    getMessages(id: $id) {
      id
      content
      createdAt
      recipientId
      senderId
    }
  }`;
  
  export const listMessages = `query ListMessages($filter: TableMessagesFilterInput, $limit: Int, $nextToken: String) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        createdAt
        recipientId
        senderId
      }
      nextToken
    }
  }`;
  