<template>
    <div>
        <form @submit.prevent="postProfilePost">
            <div class="card">
                <div class="align-items-center flex-grow-1 p-3">
                    <textarea
                        v-model.trim="profilePost.text"
                        class="form-control"
                        rows="9"
                        placeholder="Napiši objavu..."
                        required
                    ></textarea>
                </div>
                <div class="card-footer bg-white text-end p-2">
                    <button
                        type="submit"
                        class="btn btn-primary"
                        :disabled="!profilePost.text"
                    >
                        Objavi
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import { useProfilePostStore } from '@/stores/profilepost.store';

const props = {
    profilePictureSrc: {
        type: String,
        required: true,
    },
};

export default {
    name: 'addProfilePost',
    props,
    data: () => ({
        profilePostStore: useProfilePostStore(),
        profilePost: {
            text: '',
        },
    }),
    methods: {
        async postProfilePost() {
            await this.profilePostStore.createProfilePost(this.profilePost);
        },
    },
};
</script>