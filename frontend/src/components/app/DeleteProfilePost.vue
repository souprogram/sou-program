<template>
    <div>
        <IconButton actionType="delete" @click="openModal" />

        <ConfirmationModal
            v-if="isModalActive"
            title="Izbriši profilnu objavu"
            message="Jesi li siguran/na da želiš izbrisati profilnu objavu?"
            :onConfirm="deleteProfilePost"
            :onCancel="closeModal"
        />
    </div>
</template>

<script>
import ConfirmationModal from '@/components/app/ConfirmationModal.vue';
import IconButton from '@/components/app/IconButton.vue';

import { useProfilePostStore } from '@/stores/profilePostStore';

export default {
    name: 'DeleteProfilePost',
    components: {
        ConfirmationModal,
        IconButton,
    },
    props: {
        profilePostID: {
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
        profilePostStore() {
            return useProfilePostStore();
        },
    },
    methods: {
        openModal() {
            this.isModalActive = true;
        },
        closeModal() {
            this.isModalActive = false;
        },
        async deleteProfilePost() {
            await this.profilePostStore.deleteProfilePost(this.profilePostID);
            this.closeModal();
        },
    },
};
</script>
