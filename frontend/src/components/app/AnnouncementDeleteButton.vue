<template>
    <div>
        <IconButton actionType="delete" @click="openModal" />

        <ConfirmationModal
            v-if="isModalActive"
            title="Izbriši objavu"
            message="Jesi li siguran/na da želiš izbrisati objavu?"
            :onConfirm="deleteAnnouncement"
            :onCancel="closeModal"
        />
    </div>
</template>

<script>
import ConfirmationModal from '@/components/app/ConfirmationModal.vue';
import IconButton from '@/components/app/IconButton.vue';

import { useAnnouncementStore } from '@/stores/announcementStore';

export default {
    name: 'AnnouncementDeleteButton',
    components: {
        ConfirmationModal,
        IconButton,
    },
    props: {
        announcementID: {
            type: String,
            required: true,
        },
    },
    data: function () {
        return {
            isModalActive: false,
        };
    },
    computed: {
        announcementStore() {
            return useAnnouncementStore();
        },
    },
    methods: {
        openModal() {
            this.isModalActive = true;
        },
        closeModal() {
            this.isModalActive = false;
        },
        async deleteAnnouncement() {
            await this.announcementStore.deleteAnnouncement(
                this.announcementID
            );
            this.closeModal();
        },
    },
};
</script>
