import { reactive } from 'vue';
import { getAuthData } from './authService';

export const socketState = reactive({
    isConnected: false,
});

const ws = new WebSocket(process.env.VUE_APP_WS_URL);

export const sendOnlineStatus = (status) => {
    const authData = getAuthData();
    if (!authData) {
        return;
    }
    ws.send(JSON.stringify({ type: 'userInformation', data: {...authData, status}}));
};


ws.addEventListener('open', () => {
    socketState.isConnected = true;
});
ws.addEventListener('message', (event) => {
    console.log('Message from server:');
    event.data.forEach(e => {
        console.log(e);
        
    });
    // console.log(event.data);
});

ws.addEventListener('close', () => {
    socketState.isConnected = false;
    sendOnlineStatus('offline');
});