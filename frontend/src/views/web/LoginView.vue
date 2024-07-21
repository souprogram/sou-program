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
                        <button
                            type="submit"
                            class="btn btn-primary mt-3 mb-2 w-100"
                        >
                            Pusti me unutra!
                        </button>
                        <button
                            @click.prevent="googleLogin"
                            class="btn btn-outline-primary d-flex justify-content-center align-items-center w-100"
                        >
                            <img
                                src="@/assets/google-icon.svg"
                                alt="google icon"
                                id="google-icon"
                            />
                            <span>Google Login</span>
                        </button>
                    </div>
                </div>
                <div class="row"></div>
            </div>
        </form>
    </div>
</template>

<script>
import { login, loginWithGoogle } from '@/services/authService';
import { useMainStore } from '@/stores/mainStore.store';
import { googleSdkLoaded } from 'vue3-google-login';

export default {
    name: 'LoginView',
    data: function () {
        return {
            username: '',
            password: '',
            googleUrl: process.env.VUE_APP_API_URL + '/google/auth',
            clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
            redirectURL: process.env.VUE_APP_GOOGLE_REDIRECT_URI,
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
        googleLogin() {
            googleSdkLoaded((google) => {
                google.accounts.oauth2
                    .initCodeClient({
                        client_id: this.clientId,
                        scope: 'email profile openid',
                        redirect_uri: this.redirectURL,
                        callback: async (response) => {
                            if (response.code) {
                                await this.loginWithCode(response.code);
                            }
                        },
                    })
                    .requestCode();
            });
        },
        async loginWithCode(code) {
            try {
                const loginUser = await loginWithGoogle(code);
                if (loginUser) {
                    this.$router.push('/newsfeed');
                } else {
                    this.$router.push('/pending-registration');
                }
            } catch (error) {
                const { setErrorMessage } = useMainStore();
                setErrorMessage(error.message);
                this.$router.push('/error');
            }
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
