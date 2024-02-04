import WebSocket, { WebSocketServer } from 'ws';

let onlineUsers = new Set();

export const setupWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {

        ws.on('message', async (message) => {
            const payload = JSON.parse(message);
            const id = payload?.data?.id;
            if (id) {
                onlineUsers.add(payload.data);
            } else {
                onlineUsers.delete(payload.data);
            }
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(Array.from(onlineUsers)));
                }
            });
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });

    return wss;
};