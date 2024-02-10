import WebSocket, { WebSocketServer } from 'ws';

let onlineUsers = new Map();

export const setupWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {

        // kad se korisnik spoji šalje svoje podatke i dodaje se u listu online korisnika
        let userData;
        ws.on('message', async (message) => {
            const payload = JSON.parse(message);
            userData = payload.data;
            if(userData) {
                onlineUsers.set(userData.id, userData);
            }
        // svim aktivnim korisnicima posalji novi spisak online korisnika
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(Array.from(onlineUsers)));
                }
            });
        });

        // kad se veza prekine obrisi usera i svim aktivnim korisnicima posalji novu listu online korisnika
        ws.on('close', () => {
            console.log(`WebSocket connection closed by ${userData?.username || 'unknown user'}`);
            if(userData) {
                onlineUsers.delete(userData.id);
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(Array.from(onlineUsers)));
                    }
                });
            }
        });
    });

    return wss;
};