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
                            :class="[
                                'icon',
                                'rounded-circle',
                                'profile-picture',
                                { online: user.onlineStatus === 'online' },
                            ]"
                            :src="
                                user.profilePictureSrc ||
                                require('@/assets/sp-icon.png')
                            "
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
                    class="d-flex justify-content-end gap-1"
                >
                    <IconButton
                        v-if="viewProfileEdit"
                        actionType="edit"
                        :onClick="openEditingUser"
                    />
                    <IconButton
                        v-if="viewProfileDelete"
                        actionType="delete"
                        :onClick="openDeletingUser"
                    />
                    <UserStatusIndicator :status="user.status" />
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
import {
    getAuthData,
    isAuthUserDemos,
    isAuthUserAdmin,
} from '@/services/authService';
import { useUserStore } from '@/stores/user.store';
import IconButton from '@/components/app/IconButton.vue';
import UserStatusIndicator from '@/components/app/userStatusIndicator.vue';
import userTypeEnum from '@/enums/userTypeEnum';

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
        IconButton,
        UserStatusIndicator,
    },
    data() {
        return {
            userStore: useUserStore(),
            currentUserID: getAuthData().id,
            isConfirming: false,
            isEditing: false,
            isAuthUserDemos: isAuthUserDemos(),
            isAuthUserAdmin: isAuthUserAdmin(),
            userTypeEnum,
        };
    },
    computed: {
        userProfilePath() {
            return `/user-profile/${this.user.id}`;
        },
        viewProfileDelete() {
            const selfAccount = this.user.id === this.currentUserID;
            // Admins can delete all users except themselves
            if (this.isAuthUserAdmin) {
                return !selfAccount; 
            }
            // Demonstrators can delete students and themselves, but not other demonstrators
            if (this.isAuthUserDemos) {
                return this.user.type !== userTypeEnum.DEMOS || selfAccount; 
            } 
            // Students can only delete themselves
            return selfAccount; 
        },
        viewProfileEdit() {
            const selfAccount = this.user.id === this.currentUserID;
            // Admins can edit all profiles
            if (this.isAuthUserAdmin) return true;

            // Demonstrators can edit students and themselves, but not other demonstrators
            if (this.isAuthUserDemos) {
                return this.user.type !== userTypeEnum.DEMOS || selfAccount;
            }
            // Students can only edit themselves
            return selfAccount;
        },
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

<style>
.profile-picture {
    box-shadow: 0px 0px 7px 0px var(--gray-color);
}
.online {
    box-shadow: 0px 0px 7px 3px var(--green-color);
}
</style>
