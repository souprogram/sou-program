<template>
    <div>
        <router-view v-if="isConnected" />
        <div id="loading-container-in-app" v-else>
            <p>Molim pričekaj minutu da se aplikacija učita!</p>
            <div id="loader-in-app"></div>
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
    mounted() {
        const loadingContainer = document.getElementById('loading-container');
        if (loadingContainer) {
            loadingContainer.style.display = 'none';
        }
    },
};
</script>

<style lang="scss">
#app {
    font-family: 'Poppins', sans-serif;
}

#loading-container-in-app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#loading-container-in-app p {
    font-size: 1.5rem;
}

#loader-in-app {
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
