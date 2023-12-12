<template>
    <div>
        <router-view v-if="isConnected" />
        <div id="loading-container" v-else>
            <p>Molim pričekaj minutu da se aplikacija učita!</p>
            <div id="loader"></div>
        </div>
    </div>
</template>

<script>
import { socketState } from '@/services/webSocketService';

export default {
    computed: {
        isConnected() {
            return socketState.isConnected;
        },
    },
};
</script>

<style lang="scss">
#app {
    font-family: 'Poppins', sans-serif;
}

#loading-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#loading-container p {
    font-size: 1.5rem;
}

#loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
