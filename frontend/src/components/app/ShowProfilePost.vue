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
                    <EditProfilePost :profilePost="profilePost" />
                    <DeleteProfilePost :profilePostID="profilePost.id" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditProfilePost from '@/components/app/EditProfilePost.vue';
import DeleteProfilePost from '@/components/app/DeleteProfilePost.vue';

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
    name: 'ShowProfilePost',
    props,
    components: {
        EditProfilePost,
        DeleteProfilePost,
    },
};
</script>
