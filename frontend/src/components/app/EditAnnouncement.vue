<template>
    <div>
        <FormModal
            title="Uredi obavijest"
            :onClose="onClose"
            :onConfirm="updateAnnouncement"
            :disabled="!announcementText"
        >
            <div class="form-group">
                <label for="text">Opis</label>
                <textarea
                    id="text"
                    v-model.trim="announcementText"
                    class="form-control"
                    rows="9"
                    required
                ></textarea>
            </div>
        </FormModal>
    </div>
</template>

<script>
import { useAnnouncementStore } from '@/stores/announcementStore';

import FormModal from '@/components/app/FormModal.vue';

const props = {
    announcement: {
        type: Object,
        required: true,
    },
    onClose: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'editAnnouncement',
    props,
    components: {
        FormModal,
    },
    data() {
        return {
            announcementText: this.announcement.text,
            announcementStore: useAnnouncementStore(),
        };
    },
    methods: {
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
