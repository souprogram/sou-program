<template>
    <div class="container">
        <form @submit.prevent="register">
            <div class="card">
                <h1>Želiš se pridružiti?</h1>
                <div class="row">
                    <div class="col form-elements">
                        <div class="form-group mt-3">
                            <Input
                                label="Ime"
                                v-model="user.name"
                                :validations="validationRules.name"
                                type="text"
                                placeholder="Upiši ime"
                                :required="true"
                            />
                        </div>
                        <div class="form-group mt-3">
                            <Input
                                label="Prezime"
                                v-model="user.surname"
                                :validations="validationRules.surname"
                                type="text"
                                placeholder="Upiši prezime"
                                :required="true"
                            />
                        </div>
                        <div class="form-group mt-3">
                            <Input
                                label="Korisničko ime"
                                v-model="user.username"
                                :validations="validationRules.username"
                                type="text"
                                placeholder="Upiši korisničko ime"
                                @input="checkUsernameAvailability"
                                :externalMessage="usernameAvailability"
                                :required="true"
                            />
                        </div>
                        <div class="form-group mt-3">
                            <Input
                                label="Email"
                                v-model="user.email"
                                :validations="validationRules.email"
                                type="email"
                                placeholder="Upiši svoj email"
                                @input="checkEmailAvailability"
                                :externalMessage="emailAvailability"
                                :required="true"
                            />
                        </div>
                        <div class="form-group mt-3">
                            <Input
                                label="Lozinka"
                                v-model="user.password"
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
                                :validations="validationRules.password"
                                type="password"
                                placeholder="Upiši lozinku"
                                :externalMessage="passwordRepeatedError"
                                :required="true"
                            />
                        </div>

                        <div class="form-group">
                            <label for="type">Tip korisnika</label>
                            <select
                                v-model="user.type"
                                class="form-control"
                                id="type"
                                required
                            >
                                <option value="" disabled selected>
                                    Odaberi tip korisnika
                                </option>
                                <option value="demonstrator">
                                    Demonstrator
                                </option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            class="submit-button btn btn-primary mt-3"
                        >
                            Do it!
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import backendApiService from '@/services/backendApiService';
import Input from '@/components/app/Input.vue';

import {
    required,
    email,
    maxLength,
    noWhitespace,
    password,
} from '@/utils/validations.js';
export default {
    name: 'RegisterView',
    components: {
        Input,
    },
    data: function () {
        return {
            user: {
                name: '',
                surname: '',
                email: '',
                email_verified: false,
                username: '',
                password: '',
                bio: '',
                profile_picture_key: '',
                type: 'student',
                status: 'pending',
            },
            passwordRepeated: '',
            passwordRepeatedError: {
                showMessage: false,
                available: false,
                statusMessage: 'Lozinke se ne podudaraju!',
            },
            timeoutUsername: null,
            timeoutMail: null,
            usernameAvailability: {
                showMessage: false,
                available: false,
                statusMessage: '',
            },
            emailAvailability: {
                showMessage: false,
                available: false,
                statusMessage: '',
            },
            validationRules: {
                name: [required, maxLength(30)],
                surname: [required, maxLength(30)],
                email: [required, email],
                username: [required, maxLength(30), noWhitespace],
                password: [password],
            },
        };
    },
    watch: {
        passwordRepeated(val) {
            if (this.user.password.includes(val)) {
                this.passwordRepeatedError.showMessage = false;
            } else {
                this.passwordRepeatedError.showMessage = true;
            }
        },
    },

    methods: {
        isFormValid() {
            const isSyntaxValid = Object.keys(this.validationRules).every(
                (key) =>
                    this.validationRules[key].every(
                        (validation) => validation(this.user[key]) === true
                    ) && this.checkPasswordMatch()
            );
            const isUsernameAvailable = this.usernameAvailability.available;
            const isEmailAvailable = this.emailAvailability.available;
            const passwordsMatch = this.checkPasswordMatch();

            return (
                isSyntaxValid &&
                isUsernameAvailable &&
                isEmailAvailable &&
                passwordsMatch
            );
        },
        async checkUsernameAvailability() {
            if (this.timeoutUsername) {
                clearTimeout(this.timeoutUsername);
            }
            this.timeoutUsername = setTimeout(async () => {
                const response = await backendApiService.get({
                    url: `/registration/availability/username?username=${this.user.username}`,
                });
                if (!response.ok) {
                    this.usernameAvailability = {
                        showMessage: true,
                        available: false,
                        statusMessage:
                            'Greška prilikom provjere dostupnosti korisničkog imena.',
                    };
                } else {
                    const { data } = await response.json();
                    this.usernameAvailability = {
                        showMessage: true,
                        available: data.available,
                        statusMessage: data.statusMessage,
                    };
                }
            }, 1000);
        },
        async checkEmailAvailability() {
            if (this.timeoutMail) {
                clearTimeout(this.timeoutMail);
            }
            this.timeoutMail = setTimeout(async () => {
                const response = await backendApiService.get({
                    url: `/registration/availability/email?email=${this.user.email}`,
                });
                if (!response.ok) {
                    this.emailAvailability = {
                        showMessage: true,
                        available: false,
                        statusMessage:
                            'Greška prilikom provjere dostupnosti emaila.',
                    };
                } else {
                    const { data } = await response.json();
                    this.emailAvailability = {
                        showMessage: true,
                        available: data.available,
                        statusMessage: data.statusMessage,
                    };
                }
            }, 1000);
        },
        checkPasswordMatch() {
            if (this.user.password !== this.passwordRepeated) {
                this.passwordRepeatedError.showMessage = true;
                return false;
            } else {
                this.passwordRepeatedError.showMessage = false;
                return true;
            }
        },
        async register() {
            if (!this.isFormValid()) {
                console.error('Forma nije validna!');
                return;
            }

            const response = await backendApiService.post({
                url: '/registration',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.user),
            });

            if (!response.ok) {
                alert(
                    'Registracija nije uspjela! Provjerite podatke i pokušajte ponovno.'
                );
                return;
            }

            this.$router.push({
                name: 'PendingRegistration',
                query: { name: this.name },
            });
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
    grid-column: span 2;
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
    grid-template-columns: 1fr 1fr;
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
