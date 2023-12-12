import { WebSocketServer } from 'ws';

export const setupWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });

    // * For debugging purposes
    // wss.on('connection', (ws) => {
    //     console.log('WebSocket connection established');

    //     ws.on('message', (message) => {
    //         console.log(`Received message: ${message}`);
    //     });

    //     ws.on('close', () => {
    //         console.log('WebSocket connection closed');
    //     });
    // });

    return wss;
};
