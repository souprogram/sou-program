import WebSocket, { WebSocketServer } from 'ws';

let onlineUsers = new Map();

export const setupWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        let userData;
        ws.on('message', async (message) => {
            const payload = JSON.parse(message);
            userData = payload.data;
            if(userData) {
                if (userData?.status === 'online') {
                    onlineUsers.set(userData.id, userData);
                } else {
                    onlineUsers.delete(userData.id);
                }
            }
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(Array.from(onlineUsers)));
                }
            });
        });

        ws.on('close', () => {
            console.log(`WebSocket connection closed by ${userData?.username || client}`);
            if(userData) {
                onlineUsers.delete(userData.id);
                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(Array.from(onlineUsers)));
                    }
                });
            }
        });
    });

    return wss;
};