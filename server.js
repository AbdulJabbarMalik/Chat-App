const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('A new client connected');

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    
    // Send the message to all connected clients except the sender
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ sender: 'other', message: parsedMessage.message }));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
