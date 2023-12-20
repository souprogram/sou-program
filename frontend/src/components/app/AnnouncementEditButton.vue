<template>
    <div>
        <IconButton actionType="edit" @click="openModal" />

        <FormModal
            v-if="isModalActive"
            title="Uredi obavijest"
            :onClose="closeModal"
            :onConfirm="updateAnnouncement"
            :disabled="!isFormValid"
        >
            <div class="form-group">
                <label for="text">Opis</label>
                <textarea
                    id="text"
                    class="form-control"
                    v-model.trim="announcementText"
                    rows="9"
                    required
                ></textarea>
            </div>
        </FormModal>
    </div>
</template>

<script>
import { useAnnouncementStore } from '@/stores/announcementStore';

import IconButton from '@/components/app/IconButton.vue';
import FormModal from '@/components/app/FormModal.vue';

const props = {
    announcement: {
        type: Object,
        required: true,
    },
};

export default {
    name: 'AnnouncementEditButton',
    props,
    components: {
        IconButton,
        FormModal,
    },
    data() {
        return {
            isModalActive: false,
            announcementText: this.announcement.text,
        };
    },
    computed: {
        announcementStore() {
            return useAnnouncementStore();
        },
        isFormValid() {
            return !!this.announcementText;
        },
    },
    methods: {
        openModal() {
            this.isModalActive = true;
        },
        closeModal() {
            this.isModalActive = false;
        },
        async updateAnnouncement() {
            await this.announcementStore.updateAnnouncement({
                id: this.announcement.id,
                text: this.announcementText,
            });
        },
    },
};
</script>

<style scoped>
</style>
