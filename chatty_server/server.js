// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  //Return the count of users on connect
  console.log('Users connected:', wss.clients.size);
  const usersConnected = {
    type: 'connectionCount',
    usersCount: wss.clients.size
  }
  wss.broadcast(JSON.stringify(usersConnected));

  // Array with colors for usernames
  const colors = ['#a3fd7f', '#BA8146', '#465E5F', '#54302C', '#851313', '#373427', '#775D45', '#78836A', '#949B70', '#20394C', '#453345']
  //Assign random color for each connected user
  ws.color = colors[Math.floor(Math.random()*colors.length)];

  //Recieves a new message, parses it and adds the uuid to it.
  ws.on('message', (message) => {
    const userMessage = JSON.parse(message);
    userMessage.id = uuid();
    userMessage.color = ws.color;
    console.log('received:', userMessage);

    if (userMessage.type === 'user') {
      wss.broadcast(JSON.stringify(userMessage));
      // wss.broadcast(JSON.stringify(userColor));
    } else if (userMessage.type === 'system') {
      wss.broadcast(JSON.stringify(userMessage));
    } else {
      console.log('errored');
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => { 
    console.log('Client disconnected')

    //Return the count of users on disconnect
    console.log('Users connected:', wss.clients.size);
    const usersConnected = {
      type: 'connectionCount',
      usersCount: wss.clients.size
    }
    wss.broadcast(JSON.stringify(usersConnected));
  });

  ws.on('error', () => console.log('errored'));

});