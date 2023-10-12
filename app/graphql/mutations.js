export const createMessages = `mutation CreateMessages($input: CreateMessagesInput!) {
    createMessages(input: $input) {
      id
      content
      createdAt
      recipientId
      senderId
    }
  }`;
  
  export const updateMessages = `mutation UpdateMessages($input: UpdateMessagesInput!) {
    updateMessages(input: $input) {
      id
      content
      createdAt
      recipientId
      senderId
    }
  }`;
  
  export const deleteMessages = `mutation DeleteMessages($input: DeleteMessagesInput!) {
    deleteMessages(input: $input) {
      id
      content
      createdAt
      recipientId
      senderId
    }
  }`;
  