<template>
    <div>
        <div class="card">
            <div class="card-body d-flex gap-3">
                <div>
                    <router-link
                        :to="userProfilePath"
                        class="text-dark d-block icon rounded-circle"
                    >
                        <img
                            class="icon rounded-circle"
                            :src="user.profilePictureSrc"
                        />
                    </router-link>
                </div>
                <div class="flex-grow-1">
                    <router-link :to="userProfilePath" class="text-dark">
                        {{ user.fullName }}
                    </router-link>
                    <div class="text-muted">
                        {{ user.username }}
                    </div>
                </div>
                <div
                    v-if="user.id == currentUserID || isAuthUserDemos"
                    class="h-fit d-flex justify-content-end gap-1"
                >
                    <IconButton
                        actionType="edit"
                        :onClick="() => (isEditingUser = true)"
                    />
                    <IconButton
                        v-if="user.id != currentUserID"
                        actionType="delete"
                        :onClick="() => (isDeletingUser = true)"
                    />
                </div>
            </div>
        </div>

        <EditUser
            v-if="isEditingUser"
            :user="user"
            :onClose="() => (isEditingUser = false)"
        />

        <ConfirmationModal
            v-if="isDeletingUser"
            title="Izbriši korisnika"
            message="Jesi li siguran/na da želiš izbrisati korisnika?"
            :onConfirm="deleteUser"
            :onCancel="() => (isDeletingUser = false)"
        />
    </div>
</template>

<script>
import ConfirmationModal from '@/components/app/ConfirmationModal.vue';
import EditUser from '@/components/app/EditUser.vue';
import IconButton from '@/components/app/IconButton.vue';
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
        EditUser,
        IconButton,
    },
    data: function () {
        return {
            isEditingUser: false,
            isDeletingUser: false,
            currentUserID: getAuthData().id,
            isAuthUserDemos: isAuthUserDemos(),
        };
    },
    computed: {
        userStore() {
            return useUserStore();
        },
        userProfilePath() {
            return `/user-profile/${this.user.id}`;
        },
    },
    methods: {
        deleteUser() {
            this.userStore.deleteUser(user.id);
        },
    },
};
</script>
