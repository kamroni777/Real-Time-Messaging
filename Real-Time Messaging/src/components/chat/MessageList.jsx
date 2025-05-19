import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../context';
import { List, ListItem, ListItemText, Avatar, Typography } from '@mui/material';

const MessageList = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      setMessages(prev => [...prev, msg]);
    };

    const handlePreviousMessages = (msgs) => {
      setMessages(msgs);
    };

    socket.emit('joinRoom', roomId);
    socket.on('newMessage', handleNewMessage);
    socket.on('previousMessages', handlePreviousMessages);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('previousMessages', handlePreviousMessages);
    };
  }, [roomId]);

  return (
    <List>
      {messages.map((msg) => (
        <ListItem key={msg._id}>
          <Avatar src={msg.sender.avatar} />
          <ListItemText
            primary={msg.sender.username}
            secondary={
              <>
                <Typography variant="body2">{msg.content}</Typography>
                <Typography variant="caption">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};