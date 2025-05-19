io.on('connection', (socket) => {
  
  socket.on('joinRoom', async (roomId) => {
    socket.join(roomId);
    
    const messages = await Message.find({ room: roomId })
      .populate('sender', 'username avatar');
    socket.emit('previousMessages', messages);
  });

  
  socket.on('sendMessage', async ({ roomId, content }) => {
    const message = new Message({
      content,
      sender: socket.userId,
      room: roomId
    });
    await message.save();
    
    const populatedMsg = await message.populate('sender', 'username avatar');
    io.to(roomId).emit('newMessage', populatedMsg);
  });
});