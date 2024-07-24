<template>
    <div
        class="h-full d-flex flex-column justify-content-center align-items-center"
    >
        <h1>NOPE! :(</h1>
        <p v-if="mainStore.errorMessage">{{ mainStore.errorMessage }}</p>
        <button v-if="this.$route.query.login" class="btn btn-primary mt-3" @click="goToLogin">
            Nazad na Login
        </button>
        <button v-else class="btn btn-primary mt-3" @click="goBack">
            Vrati me natrag
        </button>
    </div>
</template>

<script>
import { keys, storage } from '@/services/storageService';
import { useMainStore } from '@/stores/mainStore.store';

export default {
    name: 'Error',
    methods: {
        goBack() {
            storage.set(keys.SHOULD_REFRESH, true);
            window.history.back();
        },
        goToLogin() {
            this.$router.push({ name: 'LoginView' });
        },
    },
    data() {
        return {
            mainStore: useMainStore(),
        };
    },
    beforeUnmount() {
        this.mainStore.clearErrorMessage();
    },
};
</script>

<style scoped>
.h-full {
    height: 100vh;
}
.btn-primary {
    background-color: #66ccff;
    border: #66ccff;
}
.btn-primary:hover {
    background-color: #66ccff;
}
.btn-primary:active {
    background-color: #66ccff !important;
}
.btn-primary:focus {
    background-color: #66ccff;
}
</style>
