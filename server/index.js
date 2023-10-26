const express = require('express')
const cors = require('cors')
const http = require('http')
const WebSocket = require('ws')
const port = 5500
const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

let counter = 0;

const counterValue = async (req, res) => {
    res.json(counter)
}

app.get('/', counterValue)

app.post('/count', (req, res) => {
    counter++;
    res.json(counter)
})

const server = http.createServer(app)
const wss = new WebSocket.Server({server})

wss.on('connection', function connection(ws) {
    console.log('new browser connected')

    ws.on('message', function incoming(message){
        console.log('received: %s', message)
    })

    ws.send(JSON.stringify({type: 'counter', data: counter}))

    const broadcast = () => {
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "counter", data: counter }));
          }
        });
    }
    app.post("/count", (req, res) => {
      counter++;
      res.json(counter);
      broadcast()
    });
})

server.listen(port, () => {console.log(`Server is listening to port ${port}`)})