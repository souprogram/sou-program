<template>
    <div class="container">
        <form @submit.prevent="passwordReset">
            <div v-auto-animate class="card">
                <h1>Zaboravljena lozinka</h1>
                <div v-if="showSuccess" class="row">
                    <div class="col-sm d-flex flex-column">
                        <p>
                            Link za resetiranje lozinke uspješno je poslan na
                            tvoju email adresu!
                        </p>
                        <button class="btn btn-primary mt-3" @click="goToLogin">
                            Nazad na Login
                        </button>
                    </div>
                </div>

                <div v-else class="row">
                    <div class="col-sm">
                        <div class="form-group mt-4">
                            <label for="email">Email adresa</label>
                            <input
                                label="Email"
                                v-model="email"
                                type="email"
                                placeholder="Upiši email za obnovu lozinke"
                                :required="true"
                                class="form-control"
                            />
                        </div>

                        <button
                            type="submit"
                            class="btn btn-primary mt-3 mb-2 w-100"
                        >
                            Pošalji link za resetiranje lozinke
                        </button>
                    </div>
                </div>
                <div class="row"></div>
            </div>
        </form>
    </div>
</template>

<script>
import { useMainStore } from '@/stores/mainStore.store';
import axios from 'axios';

export default {
    name: 'LoginView',
    data: function () {
        return {
            email: '',
            showSuccess: false,
        };
    },
    methods: {
        goToLogin() {
            this.$router.push({ name: 'LoginView' });
        },
        async passwordReset() {
            const data = {
                email: this.email,
            };
            try {
                await axios.post(
                    process.env.VUE_APP_API_URL + '/password/reset',
                    data
                );
                this.showSuccess = true;
            } catch (error) {
                {
                    const { setErrorMessage } = useMainStore();
                    setErrorMessage(
                        error?.response?.data?.message ?? error.message
                    );
                    this.$router.push('/error');
                }
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
