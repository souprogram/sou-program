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
            <div class="form-group" v-if="isAuthUserAdmin">
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
            <div class="form-group" v-if="user.id !== currentUserID">
                <label for="status">Status korisnika</label>
                <select
                    v-model="updatedUser.status"
                    class="form-control"
                    id="status"
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

        </FormModal>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user.store';

import FormModal from '@/components/app/FormModal.vue';
import Input from '@/components/app/Input.vue';

import { isAuthUserAdmin, getAuthData } from '@/services/authService';

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
            userStore: useUserStore(),
            currentUserID: getAuthData().id,
            updatedUser: {
                id: this.user.id,
                name: this.user.name,
                surname: this.user.surname,
                email: this.user.email,
                bio: this.user.bio,
                type: this.user.type,
                profile_picture_key: this.user.profile_picture_key,
                status: this.user.status,
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
        isAuthUserAdmin() {
            return isAuthUserAdmin();
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
            if (!this.isFormValid) {
                return;
            }

            await this.userStore.updateUser(this.updatedUser);
        },
    },
};
</script>
