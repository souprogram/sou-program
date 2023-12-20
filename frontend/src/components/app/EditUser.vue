<template>
    <div>
        <IconButton actionType="edit" @click="openModal" />

        <FormModal
            v-if="isModalActive"
            title="Uredi korisnika"
            :onClose="closeModal"
            :onConfirm="updateUser"
            :disabled="!isFormValid"
        >
            <AppInput
                label="Ime"
                v-model="updatedUser.name"
                :validations="validationRules.name"
            />
            <AppInput
                label="Prezime"
                v-model="updatedUser.surname"
                :validations="validationRules.surname"
            />
            <AppInput
                label="Email"
                v-model="updatedUser.email"
                :validations="validationRules.email"
            />
            <div class="form-group">
                <label for="bio">Opis</label>
                <textarea
                    v-model.trim="updatedUser.bio"
                    rows="4"
                    class="form-control"
                    id="bio"
                ></textarea>
            </div>
            <div class="form-group" v-if="!isAuthUserDemos">
                <label for="type">Tip korisnika</label>
                <select
                    v-model="updatedUser.type"
                    class="form-control"
                    id="type"
                >
                    <option value="demonstrator">Demonstrator</option>
                    <option value="student">Student</option>
                </select>
            </div>
        </FormModal>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';

import IconButton from '@/components/app/IconButton.vue';
import FormModal from '@/components/app/FormModal.vue';
import AppInput from '@/components/app/AppInput.vue';

import { isAuthUserDemos } from '@/services/authService';

import { required, email, maxLength } from '@/utils/validations.js';

const props = {
    user: {
        type: Object,
        required: true,
    },
};

export default {
    name: 'EditUser',
    props,
    components: {
        IconButton,
        FormModal,
        AppInput,
    },
    data() {
        return {
            isModalActive: false,
            updatedUser: {
                id: this.user.id,
                name: this.user.name,
                surname: this.user.surname,
                email: this.user.email,
                bio: this.user.bio,
                type: this.user.type,
                profile_picture_key: this.user.profile_picture_key,
            },
            validationRules: {
                name: [required, maxLength(30)],
                surname: [required, maxLength(30)],
                email: [required, email],
                // bio: [maxLength(250)],
            },
        };
    },
    computed: {
        userStore() {
            return useUserStore();
        },
        isAuthUserDemos() {
            return isAuthUserDemos();
        },
        isFormValid() {
            return Object.keys(this.validationRules).every((key) =>
                this.validationRules[key].every(
                    (validation) => validation(this.updatedUser[key]) === true
                )
            );
        },
    },
    methods: {
        openModal() {
            this.isModalActive = true;
        },
        closeModal() {
            this.isModalActive = false;
        },
        async updateUser() {
            await this.userStore.updateUser(this.updatedUser);
        },
    },
};
</script>
