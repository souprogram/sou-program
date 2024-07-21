<template>
    <div class="container">
        <form @submit.prevent="resetPassword">
            <div v-auto-animate class="card">
                <h1>Postavljanje nove lozinke</h1>
                <div v-if="successfullReset" class="row">
                    <div class="col-sm d-flex flex-column">
                        <p>
                            uspješno si resetirao/la lozinku! Sada se možeš
                            prijaviti!
                        </p>
                        <button
                            class="btn btn-primary mt-3"
                            @click.prevent="goToLogin"
                        >
                            Nazad na Login
                        </button>
                    </div>
                </div>
                <div v-else class="row">
                    <div class="col form-elements">
                        <div class="form-group mt-3">
                            <Input
                                label="Lozinka"
                                v-model="password"
                                :validations="validationRules.password"
                                type="password"
                                placeholder="Upiši lozinku"
                                :required="true"
                            />
                        </div>
                        <div class="form-group mt-3">
                            <Input
                                label="Potvrda lozinke"
                                v-model="passwordRepeated"
                                type="password"
                                placeholder="Ponovi lozinku"
                                :externalMessage="passwordRepeatedError"
                                :required="true"
                            />
                        </div>

                        <button
                            type="submit"
                            class="submit-button btn btn-primary mt-3"
                        >
                            Resetiraj lozinku
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Input from '@/components/app/Input.vue';
import { useMainStore } from '@/stores/mainStore.store';
import { logout, getAuthData } from '@/services/authService';

import axios from 'axios';

import { password } from '@/utils/validations.js';
export default {
    name: 'ResetPasswordView',
    components: {
        Input,
    },
    data: function () {
        return {
            password: '',
            passwordRepeated: '',
            successfullReset: false,
            passwordRepeatedError: {
                showMessage: false,
                available: false,
                statusMessage: 'Lozinke se ne podudaraju!',
            },
            validationRules: {
                password: [password],
            },
        };
    },
    watch: {
        passwordRepeated(val) {
            if (this.password?.includes(val)) {
                this.passwordRepeatedError.showMessage = false;
            } else {
                this.passwordRepeatedError.showMessage = true;
            }
        },
    },

    methods: {
        goToLogin() {
            this.$router.push({ name: 'LoginView' });
        },
        async resetPassword() {
            if (!this.isFormValid()) {
                return;
            }
            if (getAuthData()) {
                await logout();
            }
            try {
                await axios.post(
                    process.env.VUE_APP_API_URL + '/password/reset',
                    {
                        password: this.password,
                        token: this.$route.query.token,
                    },
                    {
                        withCredentials: true,
                    }
                );
                this.successfullReset = true;
            } catch (error) {
                const { setErrorMessage } = useMainStore();
                setErrorMessage(
                    error?.response?.data?.message ?? error.message
                );
                this.$router.push('/error');
            }
        },
        isFormValid() {
            return this.checkPasswordMatch();
        },

        checkPasswordMatch() {
            if (this.password !== this.passwordRepeated) {
                this.passwordRepeatedError.showMessage = true;
                return false;
            } else {
                this.passwordRepeatedError.showMessage = false;
                return true;
            }
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.submit-button {
    width: 100%;
}
.card {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 2vw;
}
.form-elements {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}
.error {
    font-size: 14px;
    margin-bottom: 0;
    padding-bottom: 0;
    transition: all 0.3s ease-in-out;
}
.form-control {
    transition: all 0.5s ease-in-out;
}
.red {
    border: 1px solid red;
}
</style>
