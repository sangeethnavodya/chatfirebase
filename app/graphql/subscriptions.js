export const onCreateMessages = `subscription OnCreateMessages($id: String, $content: String, $createdAt: String, $recipientId: String, $senderId: String) {
    onCreateMessages(id: $id, content: $content, createdAt: $createdAt, recipientId: $recipientId, senderId: $senderId) {
      id
      content
      createdAt
      recipientId
      senderId
    }
  }`;
  
  export const onUpdateMessages = `subscription OnUpdateMessages($id: String, $content: String, $createdAt: String, $recipientId: String, $senderId: String) {
    onUpdateMessages(id: $id, content: $content, createdAt: $createdAt, recipientId: $recipientId, senderId: $senderId) {
      id
      content
      createdAt
      recipientId
      senderId
    }
  }`;
  
  export const onDeleteMessages = `subscription OnDeleteMessages($id: String, $content: String, $createdAt: String, $recipientId: String, $senderId: String) {
    onDeleteMessages(id: $id, content: $content, createdAt: $createdAt, recipientId: $recipientId, senderId: $senderId) {
      id
      content
      createdAt
      recipientId
      senderId
    }
  }`;
  