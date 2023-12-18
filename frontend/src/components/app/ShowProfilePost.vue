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
                    v-if="isCurrentUser"
                    class="h-fit d-flex justify-content-end gap-1"
                >
                    <IconButton
                        actionType="edit"
                        :onClick="openEditingProfilePost"
                    />
                    <IconButton
                        actionType="delete"
                        :onClick="openDeletingProfilePost"
                    />
                </div>
            </div>
        </div>

        <EditProfilePost
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
import { useProfilePostStore } from '@/stores/profilePostStore';

import EditProfilePost from '@/components/app/EditProfilePost.vue';
import ConfirmationModal from '@/components/app/ConfirmationModal.vue';
import IconButton from '@/components/app/IconButton.vue';

const props = {
    user: {
        type: Object,
        required: true,
    },
    profilePost: {
        type: Object,
        required: true,
    },
    isCurrentUser: {
        type: Boolean,
        default: true,
    },
};

export default {
    name: 'showProfilePost',
    props,
    components: {
        EditProfilePost,
        ConfirmationModal,
        IconButton,
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
