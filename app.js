const cors = require('cors');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3030;

// Allow cross-origin resource sharing
app.use(cors({
  origin: "*",
}));
// Serve the index.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Handle incoming messages
  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);
    io.emit('message', data);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});
