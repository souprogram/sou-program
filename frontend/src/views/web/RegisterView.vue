<template>
    <div class="container">
        <form @submit.prevent="register">
            <div class="card">
                <h1>Želiš se pridružiti?</h1>
                <div class="row">
                    <div class="col form-elements">
                        <div class="form-group mt-3">
                            <label for="name">Ime</label>
                            <input
                                v-model="name"
                                type="text"
                                :class="['form-control', {'red' : nameError}]"
                                id="name"
                                placeholder="Upiši ime"
                                required
                            />
                            <p v-if="nameError" class="error mt-1 ms-1 fw-light text-danger">{{ nameError }}</p>
                        </div>
                        <div class="form-group mt-3">
                            <label for="surname">Prezime</label>
                            <input
                                v-model="surname"
                                type="text"
                                :class="['form-control', {'red' : surnameError}]"
                                id="surname"
                                placeholder="Upiši Prezime"
                                required
                            />
                            <p v-if="surnameError" class="error mt-1 ms-1 fw-light text-danger">{{ surnameError }}</p>
                        </div>
                        <div class="form-group mt-3">
                            <label for="username">Korisničko ime</label>
                            <input
                                v-model="username"
                                type="text"
                                :class="['form-control', {'red' : usernameError}]"
                                id="username"
                                placeholder="Upiši korisničko ime"
                                required
                            />
                            <p v-if="usernameError" class="error mt-1 ms-1 fw-light text-danger">{{ usernameError }}</p>
                        </div>
                        <div class="form-group mt-3">
                            <label for="email">E-mail</label>
                            <input
                                v-model="email"
                                type="email"
                                :class="['form-control', {'red' : emailError}]"
                                id="email"
                                placeholder="Upiši svoj email"
                                required
                            />
                            <p v-if="emailError" class="error mt-1 ms-1 fw-light text-danger">{{ emailError }}</p>
                        </div>
                        <div class="form-group mt-3">
                            <label for="password">Lozinka</label>
                            <input
                                v-model="password"
                                type="password"
                                :class="['form-control', {'red' : passwordError}]"
                                id="password"
                                placeholder="Upiši lozinku"
                                required
                            />
                            <p v-if="passwordError" class="error mt-1 ms-1 fw-light text-danger">{{ passwordError }}</p>
                        </div>
                        <div class="form-group mt-3">
                            <label for="password-repeated">Potvrdi lozinku</label>
                            <input
                                v-model="passwordRepeated"
                                type="password"
                                :class="['form-control', {'red' : passwordRepeatedError}]"
                                id="password-repeated"
                                placeholder="Ponovi lozinku"
                                required
                            />
                            <p v-if="passwordRepeatedError" class="error mt-1 ms-1 fw-light text-danger">{{ passwordRepeatedError }}</p>
                        </div>
                        <div class="form-group">
                            <label for="type">Tip korisnika</label>
                            <select
                                v-model="type"
                                class="form-control"
                                id="type"
                                required
                            >
                                <option value="" disabled selected>
                                    Odaberi tip korisnika
                                </option>
                                <option value="demonstrator">Demonstrator</option>
                                <option value="student">Student</option>
                            </select>
                            <p v-if="typeError" class="error mt-1 ms-1 fw-light text-danger">{{ typeError }}</p>
                        </div>
                        <button type="submit" class="submit-button btn btn-primary mt-3">
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
export default {
    name: 'RegisterView',
    data: function () {
        return {
            name: '',
            nameError: '',
            surname: '',
            surnameError: '',
            username: '',
            usernameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            passwordRepeated: '',
            passwordRepeatedError: '',
            type: 'student',
            typeError: '',
        }
    },
    methods: {
        checkPasswordMatch() {
            if (this.password !== this.passwordRepeated) {
                this.passwordRepeatedError = 'Passwords do not match!'
                this.passwordRepeated = ''
                return false
            } else {
                this.passwordRepeatedError = ''
                return true
            }
        },
        async register() {
            if(!this.checkPasswordMatch()){
                return
            }

            const credentials = {
                name: this.name,
                surname: this.surname,
                username: this.username,
                email: this.email,
                password: this.password,
                type: this.type,
                profile_picture_key: '',
                bio: ''
            }
            console.log('before fetch')
             const response = await backendApiService.post({
                url: '/registration',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            console.log('after fetch')

            if (!response.ok) {
                alert('Registracija nije uspjela! Provjerite podatke i pokušajte ponovno.')
                return
            }
            console.log('after response')


            this.$router.push({ name: 'PendingRegistration', query: { name: this.name } })
            console.log('after push')
            console.log(this.$router)
        },
    },
}
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
