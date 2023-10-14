"use client"
import { useState, useEffect } from 'react';
import Amplify from '@aws-amplify/core';
import { API, graphqlOperation } from 'aws-amplify';
import { ListMessagesBySenderAndRecipient as ListMessagesBySenderAndRecipient } from '../graphql/queries';
import { createMessages as CreateMessages } from '../graphql/mutations';
import { onCreateMessages as OnCreateMessages } from '../graphql/subscriptions';
import config from '../aws-export'; // adjust the path based on your folder structure


Amplify.configure({ ...config });



export default function Chat() {
  const [messages, setMessages] = useState([]); 
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMessages();

    const subscription = API.graphql(
      graphqlOperation(OnCreateMessages)
    ).subscribe({
      next: ({ provider, value }) => {
        setMessages(prevMessages => [...prevMessages, value.data.onCreateMessages]);
      },
      error: error => console.warn(error)
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchMessages() {
    try {
      const senderIdValue = "nethmin"; // Replace with actual senderId
      const recipientIdValue = "pasindu"; // Replace with actual recipientId
  
      const messageData = await API.graphql({
          query: ListMessagesBySenderAndRecipient,
          variables: {
              senderId: senderIdValue,
              recipientId: recipientIdValue
          }
      });
  
      console.log(messageData.data.listMessages.items);
      setMessages(messageData.data.listMessages.items);
  } catch (err) {
      console.error("Error fetching messages:", err);
  }
  
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    

    const messageDetails = {
      id:new Date().toISOString(),
      content: message,
      createdAt: new Date().toISOString(),
      senderId: "nethmin",  // adjust this as per your application's user management
      recipientId: "sangeeth" // adjust this based on the recipient's ID
    };

    try {
      console.log(messageDetails)
      await API.graphql(graphqlOperation(CreateMessages, { input: messageDetails }));
      setMessage('');
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '400px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0px 0px 5px #ccc',
    }}>
      <h1 style={{
        fontSize: '24px',
        marginBottom: '10px',
      }}>Chat Room</h1>
      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f5f5f5',
      }}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong style={{ color: 'blue' }}>{msg.content}:</strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            width: '100%',
            padding: '5px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
        <button type="submit" style={{
          marginTop: '10px',
          padding: '5px 10px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
        }}>Send</button>
      </form>
    </div>
    
  );
}