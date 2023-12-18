<template>
    <div>
        <form @submit.prevent="postAnnouncement" class="card">
            <div class="card-body d-flex gap-3">
                <div>
                    <img
                        class="icon rounded-circle"
                        :src="
                            userProfilePictureSrc ||
                            require('@/assets/sp-icon.png')
                        "
                    />
                </div>
                <div class="flex-grow-1">
                    <textarea
                        v-model.trim="announcement.text"
                        class="form-control"
                        rows="9"
                        placeholder="Napiši obavijest..."
                        required
                    ></textarea>
                </div>
            </div>
            <div class="card-footer bg-white text-end p-2">
                <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="!announcement.text"
                >
                    Objavi
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { useAnnouncementStore } from '@/stores/announcementStore';

const props = {
    userProfilePictureSrc: {
        type: String,
        required: true,
    },
};

export default {
    name: 'addAnnouncement',
    props,
    data: () => ({
        announcementStore: useAnnouncementStore(),
        announcement: {
            text: '',
        },
    }),
    methods: {
        async postAnnouncement() {
            await this.announcementStore.createAnnouncement(this.announcement);
        },
    },
};
</script>
