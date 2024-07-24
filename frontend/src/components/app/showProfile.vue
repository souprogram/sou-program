<template>
    <div class="card">
        <div
            class="card-body d-flex flex-wrap flex-column flex-sm-row justify-content-center justify-content-sm-start align-items-center gap-5"
        >
            <div>
                <img
                    class="profile-pic rounded-circle"
                    :src="
                        user.profilePictureSrc ||
                        require('@/assets/sp-icon.png')
                    "
                />
            </div>
            <div class="text-center text-sm-start">
                <h1 class="card-title">{{ user.fullName }}</h1>

                <p v-if="user.username && user.type" class="my-1">
                    {{ user.username }} - {{ user.type }}
                </p>
                <p v-auto-animate class="my-1">{{ user.email }}
                     <button @click="verifyEmail" v-if="!user.email_verified && !confirmationSent && user.id === currentUserID" class="btn text-danger">Email nepotvrđen! Klikni ovdje za potvrdu!</button>
                     <span class="text-success" v-if="confirmationSent"> Email za potvrdu email adrese poslan je u tvoj sandučić!</span>
                </p>
                <p class="my-1">{{ user.bio }}</p>
            </div>
            <div v-if="isMyProfile || isAuthUserAdmin " class="card-edit">
                <button class="btn btn-primary card-edit__button" @click="()=>isEditing=true">Uredi profil</button>
                <button v-if="this.user.username !== 'admin'" class="btn btn-outline-danger card-edit__button" @click="()=>isConfirming=true">Obriši profil</button>
            </div>
        </div>
    </div>
    <edit-user v-if="isEditing" :user="user" :onClose="()=> isEditing = false" />
        <ConfirmationModal
            v-if="isConfirming"
            title="Izbriši račun"
            message="Jesi li siguran/na da želiš izbrisati račun?"
            :onConfirm="confirmDeleteUser"
            :onCancel="cancelDeleteUser"
        />

</template>

<script>
import { useUserStore } from '@/stores/user.store';
import { getAuthData, isAuthUserAdmin } from '@/services/authService';
import editUser from '@/components/app/editUser.vue';
import ConfirmationModal from '@/components/app/ConfirmationModal.vue';


const props = {
    user: {
        type: Object,
        required: true,
    },
};

export default {
    name: 'showProfile',
    props,
    data() {
        return {
            currentUserID: getAuthData().id,
            confirmationSent: false,
            userStore: useUserStore(),
            isEditing: false,
            isMyProfile: this.user.id === this.currentUserID,
            isAuthUserAdmin: isAuthUserAdmin(),
            isConfirming: false,
        };
    },
    components: {
        editUser,
        ConfirmationModal
    },
    methods: {
        async verifyEmail() {
            
            const emailSent = await this.userStore.confirmEmail(this.user.email);
            if (emailSent) {
                this.confirmationSent = true;
            }   
            
        },
        async confirmDeleteUser() {
            await this.userStore.deleteUser(this.user.id);

            this.isConfirming = false;
        },
        cancelDeleteUser() {
            this.isConfirming = false;
        },
    },
};
</script>

<style scoped>
.card-body {
    padding: 2rem;
}
.profile-pic {
    width: 9rem;
    height: 9rem;
    min-width: 9rem;
    min-height: 9rem;
}
.card-edit {
    height: 140px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;
    gap: 15px;
}
</style>
