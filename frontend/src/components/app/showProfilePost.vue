<template>
    <div>
        <div class="card">
            <div class="card-body d-flex gap-3">
                <div>
                    <img
                        class="icon rounded-circle"
                        :src="
                            user.profilePictureSrc ||
                            require('@/assets/sp-icon.png')
                        "
                    />
                </div>
                <div class="flex-grow-1">
                    <h6 class="card-title d-inline m-0">
                        {{ user.fullName }}
                    </h6>
                    <small class="text-muted">
                        •
                        {{ profilePost.posted_at }} ago
                    </small>
                    <p class="card-text mt-1">{{ profilePost.text }}</p>
                </div>

                <div
                    v-if="canEdit"
                    class="h-fit d-flex justify-content-end gap-1"
                >
                    <button
                        class="btn btn-edit"
                        @click="openEditingProfilePost"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button
                        class="btn btn-delete"
                        @click="openDeletingProfilePost"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>

        <edit-profile-post
            v-if="isEditing"
            :profilePost="profilePost"
            :onClose="closeEditingProfilePost"
        />

        <ConfirmationModal
            v-if="isConfirming"
            title="Izbriši profilnu objavu"
            message="Jesi li siguran/na da želiš izbrisati profilnu objavu?"
            :onConfirm="confirmDeleteProfilePost"
            :onCancel="cancelDeleteProfilePost"
        />
    </div>
</template>

<script>
import { useProfilePostStore } from '@/stores/profilepost.store';

import editProfilePost from '@/components/app/editProfilePost.vue';
import ConfirmationModal from '@/components/app/ConfirmationModal.vue';

const props = {
    user: {
        type: Object,
        required: true,
    },
    profilePost: {
        type: Object,
        required: true,
    },
    canEdit: {
        type: Boolean,
        default: true,
    },
};

export default {
    name: 'showProfilePost',
    props,
    components: {
        editProfilePost,
        ConfirmationModal,
    },
    data() {
        return {
            profilePostStore: useProfilePostStore(),
            isConfirming: false,
            isEditing: false,
        };
    },
    methods: {
        openDeletingProfilePost() {
            this.isConfirming = true;
        },
        async confirmDeleteProfilePost() {
            await this.profilePostStore.deleteProfilePost(this.profilePost.id);
            this.isConfirming = false;
        },
        cancelDeleteProfilePost() {
            this.isConfirming = false;
        },
        openEditingProfilePost() {
            this.isEditing = true;
        },
        closeEditingProfilePost() {
            this.isEditing = false;
        },
    },
};
</script>
