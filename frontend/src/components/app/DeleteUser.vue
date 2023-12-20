<template>
    <div>
        <IconButton actionType="delete" @click="openModal" />

        <ConfirmationModal
            v-if="isModalActive"
            title="Izbriši korisnika"
            message="Jesi li siguran/na da želiš izbrisati korisnika?"
            :onConfirm="deleteUser"
            :onCancel="closeModal"
        />
    </div>
</template>

<script>
import ConfirmationModal from '@/components/app/ConfirmationModal.vue';
import IconButton from '@/components/app/IconButton.vue';

import { useUserStore } from '@/stores/userStore';

export default {
    name: 'DeleteUser',
    components: {
        ConfirmationModal,
        IconButton,
    },
    props: {
        userID: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isModalActive: false,
        };
    },
    computed: {
        userStore() {
            return useUserStore();
        },
    },
    methods: {
        openModal() {
            this.isModalActive = true;
        },
        closeModal() {
            this.isModalActive = false;
        },
        async deleteUser() {
            await this.userStore.deleteUser(this.userID);
            this.closeModal();
        },
    },
};
</script>
