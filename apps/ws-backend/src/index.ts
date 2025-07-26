import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8080 });
server.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(message);
    });
});