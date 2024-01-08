<template>
    <div>
        <FormModal
            title="Dodaj korisnika"
            :onClose="onClose"
            :onConfirm="createUser"
            :disabled="!isFormValid"
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
            />
            <Input
                label="Korisničko ime"
                v-model="user.username"
                :validations="validationRules.username"
            />
            <Input
                label="Lozinka"
                v-model="user.password"
                :type="'password'"
                :validations="validationRules.password"
            />
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
            selectedImage: null,
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
    computed: {
        isFormValid() {
            return Object.keys(this.validationRules).every((key) =>
                this.validationRules[key].every(
                    (validation) => validation(this.user[key]) === true
                )
            );
        },
    },
    methods: {
        addFile(event) {
            this.selectedImage = event.target.files[0];
        },
        async createUser() {
            if (!this.isFormValid) {
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
