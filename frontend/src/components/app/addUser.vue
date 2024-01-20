<template>
    <div @click="checkPasswordMatch">
        <FormModal
            title="Dodaj korisnika"
            :onClose="onClose"
            :onConfirm="createUser"
        >
            <Input
                label="Ime"
                v-model="user.name"
                :validations="validationRules.name"
            />
            <Input
                label="Prezime"
                v-model="user.surname"
                :validations="validationRules.surname"
            />
            <Input
                label="Email"
                v-model="user.email"
                :validations="validationRules.email"
                placeholder="Upiši svoj email"
                @input="checkEmailAvailability"
                :externalMessage="emailAvailability"
            />
            <Input
                label="Korisničko ime"
                v-model="user.username"
                :validations="validationRules.username"
                placeholder="Upiši korisničko ime"
                @input="checkUsernameAvailability"
                :externalMessage="usernameAvailability"
            />
            <div class="row gx-4">
                <Input
                    label="Lozinka"
                    v-model="user.password"
                    :type="'password'"
                    :validations="validationRules.password"
                    class="col"
                />
                <Input
                    label="Potvrda lozinke"
                    v-model="passwordRepeated"
                    :type="'password'"
                    :validations="validationRules.password"
                    class="col"
                    :externalMessage="passwordRepeatedError"
                />
            </div>
            <div class="form-group">
                <label for="profilePicture">Slika profila</label>
                <input
                    type="file"
                    @change="addFile"
                    id="profilePicture"
                    class="picture-input form-control"
                    accept="image/*"
                />
            </div>
            <div class="form-group">
                <label for="bio">Opis</label>
                <textarea
                    v-model.trim="user.bio"
                    class="form-control"
                    id="bio"
                    rows="4"
                ></textarea>
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
                    <option value="demonstrator">Demonstrator</option>
                    <option value="student">Student</option>
                </select>
            </div>
        </FormModal>
    </div>
</template>

<script>
import { useGalleryStore } from '@/stores/gallery.store';
import { useUserStore } from '@/stores/user.store';

import FormModal from '@/components/app/FormModal.vue';
import Input from '@/components/app/Input.vue';
import backendApiService from '@/services/backendApiService';

import {
    required,
    email,
    maxLength,
    noWhitespace,
    password,
} from '@/utils/validations.js';

const props = {
    onClose: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'addUser',
    props,
    components: {
        FormModal,
        Input,
    },
    data: function () {
        return {
            galleryStore: useGalleryStore(),
            userStore: useUserStore(),
            user: {
                name: '',
                surname: '',
                email: '',
                email_verified: false,
                username: '',
                password: '',
                bio: '',
                type: 'student',
                status: 'active',
            },
            passwordRepeated: '',
            passwordRepeatedError: {
                showMessage: false,
                available: false,
                statusMessage: 'Lozinke se ne podudaraju!',
            },
            selectedImage: null,
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
                // bio: [maxLength(250)],
            },
        };
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
        checkPasswordMatch(e) {
            console.log('pass check initiated');
            if (e && e.target.type === 'password' && !this.passwordRepeated) {
                this.passwordRepeatedError.showMessage = false;
                return;
            }
            if (this.user.password !== this.passwordRepeated) {
                this.passwordRepeatedError.showMessage = true;
                // this.passwordRepeated = '';
                return false;
            } else {
                this.passwordRepeatedError.showMessage = false;
                return true;
            }
        },
        addFile(event) {
            this.selectedImage = event.target.files[0];
        },
        async createUser() {
            if (!this.isFormValid()) {
                console.error('Forma nije validna!');
                return;
            }

            this.user.profile_picture_key = null;
            if (this.selectedImage) {
                const images = await this.galleryStore.googleUploadImages({
                    images: [this.selectedImage],
                    folderName: 'user',
                });
                this.user.profile_picture_key = images[0];
            }

            await this.userStore.createUser(this.user);

            this.onClose();
        },
    },
};
</script>
<style scoped>
.error-msg {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: var(--red-color);
    transition: opacity 0.3s;
}

.error-msg span {
    display: block;
}
</style>