import { useState, useContext } from 'react';
import { SocketContext } from '../../context';
import { TextField, Button, Box } from '@mui/material';

const MessageForm = ({ roomId }) => {
  const [content, setContent] = useState('');
  const socket = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      socket.emit('sendMessage', { roomId, content });
      setContent('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message..."
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        Send
      </Button>
    </Box>
  );
};