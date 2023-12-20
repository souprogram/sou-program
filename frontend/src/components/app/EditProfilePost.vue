<template>
    <div>
        <IconButton actionType="edit" @click="openModal" />

        <FormModal
            v-if="isModalActive"
            title="Uredi profilnu objavu"
            :onClose="closeModal"
            :onConfirm="updateProfilePost"
            :disabled="!profilePostText"
        >
            <div class="form-group">
                <label for="text">Opis</label>
                <textarea
                    id="text"
                    v-model.trim="profilePostText"
                    class="form-control"
                    rows="9"
                    required
                ></textarea>
            </div>
        </FormModal>
    </div>
</template>

<script>
import { useProfilePostStore } from '@/stores/profilePostStore';

import IconButton from '@/components/app/IconButton.vue';
import FormModal from '@/components/app/FormModal.vue';

const props = {
    profilePost: {
        type: Object,
        required: true,
    },
};

export default {
    name: 'EditProfilePost',
    props,
    components: {
        IconButton,
        FormModal,
    },
    data() {
        return {
            isModalActive: false,
            profilePostText: this.profilePost.text,
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
        async updateProfilePost() {
            await this.profilePostStore.updateProfilePost({
                id: this.profilePost.id,
                text: this.profilePostText,
            });
        },
    },
};
</script>
