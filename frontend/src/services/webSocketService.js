import { reactive } from 'vue';
import { getAuthData } from './authService';


export const socketState = reactive({
    isConnected: false,
});

export const onlineUsers = reactive([]);

const ws = new WebSocket(process.env.VUE_APP_WS_URL);
const authData = getAuthData();

// kod uspostave veze posalji svoje podatke
ws.addEventListener('open', () => {
    socketState.isConnected = true;
    if (!authData) {
        return;
    }
    ws.send(JSON.stringify({ type: 'userInformation', data: authData}));
});

// kod promjene statusa nekog korisnika primiti ces poruku sa novom listom online korisnika
ws.addEventListener('message', (event) => {
    onlineUsers.length = 0;
    onlineUsers.push(...JSON.parse(event.data));    
});
    

ws.addEventListener('close', () => {
    socketState.isConnected = false;
});