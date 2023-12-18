<template>
    <div>
        <FormModal
            title="Uredi korisnika"
            :onClose="onClose"
            :onConfirm="updateUser"
            :disabled="!isFormValid"
        >
            <Input
                label="Ime"
                v-model="updatedUser.name"
                :validations="validationRules.name"
            />
            <Input
                label="Prezime"
                v-model="updatedUser.surname"
                :validations="validationRules.surname"
            />
            <Input
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
import { useUserStore } from '@/stores/user.store';

import FormModal from '@/components/app/FormModal.vue';
import Input from '@/components/app/Input.vue';

import { isAuthUserDemos } from '@/services/authService';

import { required, email, maxLength } from '@/utils/validations.js';

const props = {
    user: {
        type: Object,
        required: true,
    },
    onClose: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'editUser',
    props,
    components: {
        FormModal,
        Input,
    },
    data() {
        return {
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
        async updateUser() {
            await this.userStore.updateUser(this.updatedUser);
        },
    },
};
</script>
