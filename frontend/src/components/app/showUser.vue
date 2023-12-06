<template>
    <div>
        <div class="card">
            <div class="card-body d-flex gap-3">
                <div>
                    <router-link
                        :to="'/user-profile/' + user.id"
                        class="text-dark d-block icon rounded-circle"
                    >
                        <img
                            class="icon rounded-circle"
                            :src="
                                user.profilePictureSrc ||
                                require('@/assets/sp-icon.png')
                            "
                        />
                    </router-link>
                </div>
                <div class="flex-grow-1">
                    <router-link
                        :to="'/user-profile/' + user.id"
                        class="text-dark"
                    >
                        {{ user.fullName }}
                    </router-link>
                    <div class="text-muted">
                        {{ user.username }}
                    </div>
                </div>
                <div
                    v-if="isAuthUserDemos"
                    class="h-fit d-flex justify-content-end gap-1"
                >
                    <button class="btn btn-edit" @click="openEditingUser">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button
                        v-if="user.id != currentUserID"
                        class="btn btn-delete"
                        @click="openDeletingUser"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>

        <edit-user v-if="isEditing" :user="user" :onClose="closeEditingUser" />

        <ConfirmationModal
            v-if="isConfirming"
            title="Izbriši korisnika"
            message="Jesi li siguran/na da želiš izbrisati korisnika?"
            :onConfirm="confirmDeleteUser"
            :onCancel="cancelDeleteUser"
        />
    </div>
</template>

<script>
import ConfirmationModal from '@/components/app/ConfirmationModal.vue';
import editUser from '@/components/app/editUser.vue';
import { getAuthData, isAuthUserDemos } from '@/services/authService';
import { useUserStore } from '@/stores/user.store';

const props = {
    user: {
        type: Object,
        required: true,
    },
};

export default {
    name: 'showUser',
    props,
    components: {
        ConfirmationModal,
        editUser,
    },
    data() {
        return {
            userStore: useUserStore(),
            currentUserID: getAuthData().id,
            isConfirming: false,
            isEditing: false,
            isAuthUserDemos: isAuthUserDemos(),
        };
    },
    methods: {
        openDeletingUser() {
            this.isConfirming = true;
        },
        async confirmDeleteUser() {
            await this.userStore.deleteUser(this.user.id);

            this.isConfirming = false;
        },
        cancelDeleteUser() {
            this.isConfirming = false;
        },
        openEditingUser() {
            this.isEditing = true;
        },
        closeEditingUser() {
            this.isEditing = false;
        },
    },
};
</script>
