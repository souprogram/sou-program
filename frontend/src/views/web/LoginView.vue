<template>
    <div class="container">
        <form @submit.prevent="handleLogin">
            <div class="card">
                <h1>Tko si?</h1>
                <div class="row w-100">
                    <div class="col-sm">
                        <div class="form-group mt-4">
                            <label for="username">Korisničko ime</label>
                            <input
                                v-model="username"
                                type="text"
                                class="form-control"
                                id="username"
                                placeholder="Upiši korisničko ime"
                            />
                        </div>
                        <div class="form-group mt-3">
                            <label for="password">Lozinka</label>
                            <input
                                v-model="password"
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="Upiši lozinku"
                            />
                        </div>
                        <button type="submit" class="btn btn-primary mt-3 mb-2 w-100">
                            Pusti me unutra!
                        </button>
                        <a :href="googleUrl" class="btn btn-outline-primary d-flex justify-content-center align-items-center">
                             <img src="@/assets/google-icon.svg" alt="google icon" id="google-icon">
                             <span>Google Login</span>
                        </a>
                    </div>
                </div>
                <div class="row">
                    
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { login } from '@/services/authService';
import { useMainStore } from '@/stores/mainStore.store';

export default {
    name: 'LoginView',
    data: function () {
        return {
            username: '',
            password: '',
            googleUrl: process.env.VUE_APP_API_URL + '/google/auth',
        };
    },
    methods: {
        async handleLogin() {
            try {
                await login({
                    username: this.username,
                    password: this.password,
                });
                
            } catch (error) {
                const mainStore = useMainStore();
                mainStore.setErrorMessage(error.message);
                this.$router.push('/error');
                return;
                
            }

            this.$router.push('/newsfeed');
        },
    },
};
</script>

<style scoped>
body {
    background-color: black;
}
a {
    color: black;
}
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 2vw;
}
#google-icon {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
}
</style>
