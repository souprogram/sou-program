<template>
    <div class="container">
        <form @submit.prevent="register">
            <div class="card">
                <h1>Želiš se pridružiti?</h1>
                <div @click="checkPasswordMatch" class="row">
                    <div class="col form-elements">
                        <div class="form-group mt-3">
                            <Input
                                label="Ime"
                                v-model="name"
                                :validations="validationRules.name"
                                type="text"
                                placeholder="Upiši ime"
                            />
                            
                        </div>
                        <div class="form-group mt-3">
                            <Input
                                label="Prezime"
                                v-model="surname"
                                :validations="validationRules.surname"
                                type="text"
                                placeholder="Upiši prezime"
                            />
                            
                        </div>
                        <div class="form-group mt-3">
                            <Input
                                label="Korisničko ime"
                                v-model="username"
                                :validations="validationRules.username"
                                type="text"
                                placeholder="Upiši korisničko ime"
                            />
                        </div>
                        <div class="form-group mt-3">
                           <Input
                                label="Email"
                                v-model="email"
                                :validations="validationRules.email"
                                type="email"
                                placeholder="Upiši svoj email"
                            />
                        </div>
                        <div class="form-group mt-3">
                            <Input
                                label="Lozinka"
                                v-model="password"
                                :validations="validationRules.password"
                                type="password"
                                placeholder="Upiši lozinku"
                                
                            />
                            
                        </div>
                        <div class="form-group mt-3">
                            <Input
                                label="Potvrda lozinke"
                                v-model="passwordRepeated"
                                :validations="validationRules.password"
                                type="password"
                                placeholder="Upiši lozinku"
                                
                            />
                            <p v-if="passwordRepeatedError" class="error fw-light">{{ passwordRepeatedError }}</p>
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
            name: '', 
            surname: '',  
            username: '', 
            email: '',
            password: '',
            passwordRepeated: '',
            passwordRepeatedError: '',
            type: 'student',
            validationRules: {
                name: [required, maxLength(30)],
                surname: [required, maxLength(30)],
                email: [required, email],
                username: [required, maxLength(30), noWhitespace],
                password: [password],
                // bio: [maxLength(250)],
            },
        }
    },
    
    watch: {
        password(value) {
            if (value === this.passwordRepeated) {
                this.passwordRepeatedError = '';
            }
        },
        passwordRepeated(value) {
            if (value === this.password) {
                this.passwordRepeatedError = '';
            }
        }
    },
    
    methods: {
        isFormValid() {
            return Object.keys(this.validationRules).every((key) =>
                this.validationRules[key].every(
                    (validation) => validation(this.user[key]) === true
                )
            );
        },
        checkPasswordMatch(e) {
            if( e && e.target.type === 'password'){
                return
            }
            if (this.password !== this.passwordRepeated) {
                this.passwordRepeatedError = 'Lozinke se ne podudaraju!'
                this.passwordRepeated = ''
                return false
            } else {
                this.passwordRepeatedError = ''
                return true
            }
        },
        async register() {
            if (!this.isFormValid) {
                return;
            }
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
            
             const response = await backendApiService.post({
                url: '/registration',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            

            if (!response.ok) {
                alert('Registracija nije uspjela! Provjerite podatke i pokušajte ponovno.')
                return
            }

            this.$router.push({ name: 'PendingRegistration', query: { name: this.name } })
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
