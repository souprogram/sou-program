import { reactive } from 'vue';

export const socketState = reactive({
    isConnected: false,
});
export const onlineUsers = reactive([]);

export const ws = new WebSocket(process.env.VUE_APP_WS_URL);

export const setOnlineStatus = (ws, onlineStatus, userAuthData) => {
    if (!userAuthData) {
        return;
    }
    console.log('Sending online status to the server: ', onlineStatus);
    ws.send(JSON.stringify({ type: 'userInformation', data: userAuthData, status: onlineStatus}));
};

// kod uspostave veze posalji svoje podatke
ws.addEventListener('open', () => {
    socketState.isConnected = true;
});
let lastUpdateTime = 0;
// kod promjene statusa nekog korisnika primiti ces poruku sa novom listom online korisnika
ws.addEventListener('message', (event) => {
    const now = Date.now();
    if (now - lastUpdateTime < 333) {
        // Less than 333 milliseconds have passed since the last update, we ignore this one
        return;
    }
    lastUpdateTime = now;

    let newOnlineUsers = JSON.parse(event.data);
    // update onlineUsers with new data
    onlineUsers.splice(0, onlineUsers.length, ...newOnlineUsers);
     
});
    

ws.addEventListener('close', () => {
    socketState.isConnected = false;
});