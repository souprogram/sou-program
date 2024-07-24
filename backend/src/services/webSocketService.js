import WebSocket, { WebSocketServer } from 'ws';

let onlineUsers = new Map();

export const setupWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {

        // kad se korisnik spoji šalje svoje podatke i dodaje se u listu online korisnika
        ws.on('message', async (message) => {
            
            const { status, data } = await JSON.parse(message);

            if(data && status === 'online') {
                onlineUsers.set(ws, data);
            }
            else if(data && status === 'offline') {
                onlineUsers.delete(ws);
            }
        // svim aktivnim korisnicima posalji novu listu online korisnika
            const onlineUserIDsArray = Array.from(onlineUsers).map(([_ws, user]) => user.id);
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(onlineUserIDsArray));
                }
            });
        });

        // kad se veza prekine obrisi usera i svim aktivnim korisnicima posalji novu listu online korisnika
        ws.on('close', () => {
            onlineUsers.delete(ws);
            const onlineUserIDsArray = Array.from(onlineUsers).map(([_ws, user]) => user.id);
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(onlineUserIDsArray));
                }
            });
            
        });
    });

    return wss;
};