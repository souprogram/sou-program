import { reactive } from 'vue';

export const socketState = reactive({
    isConnected: false,
});

const ws = new WebSocket(process.env.VUE_APP_WS_URL);

ws.addEventListener('open', () => {
    socketState.isConnected = true;
});

ws.addEventListener('close', () => {
    socketState.isConnected = false;
});
