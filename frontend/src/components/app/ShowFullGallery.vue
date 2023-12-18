<template>
    <div>
        <div class="card">
            <div class="header">
                <h1>{{ galleryData.title }}</h1>
                <button class="btn btn-primary" @click="closeShow">
                    Zatvori
                </button>
            </div>
            <div class="p-0">
                <p class="card-text mt-2">
                    {{ galleryData.text }}
                </p>
                <p>
                    {{ authorUsername }}
                    <span class="text-muted">
                        •
                        {{ dateService.formatDate(galleryData.timestamp) }} ago
                    </span>
                </p>
            </div>

            <div class="masonry-container">
                <img v-for="image in images" :key="image" :src="image" />
            </div>
        </div>
    </div>
</template>

<script>
import { useGalleryStore } from '@/stores/galleryStore';
import { useUserStore } from '@/stores/userStore';

import dateService from '@/services/dateService';
//import VueMasonry from "vue-masonry";

export default {
    name: 'showFullGallery',
    //components: { VueMasonry },
    data() {
        return {
            authorUsername: null,
            images: [],
        };
    },
    props: {
        galleryID: {
            type: Number,
            required: true,
        },
        closeShow: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        const galleryStore = useGalleryStore();
        galleryStore.fetchGallery();
        const userStore = useUserStore();

        const galleryID = props.galleryID;
        const galleryData = galleryStore.getGalleryById(galleryID);

        return { galleryStore, userStore, galleryData };
    },
    async created() {
        await this.getAuthorUsername(this.galleryData.author_id);
        await this.displayImages();
    },
    methods: {
        async getAuthorUsername(userID) {
            await this.userStore.fetchUser();
            const user = await this.userStore.getUserById(userID);
            this.authorUsername = user.username;
        },
        async displayImages() {
            const imageKeys = this.galleryData.images;

            let imagesData = [];
            for (const key of imageKeys) {
                const imageData = await this.galleryStore.googleDisplayImage(
                    key
                );
                imagesData.push(imageData);
            }

            const images = imagesData.map(
                (imageData) => 'data:image/jpeg;base64,' + imageData
            );
            this.images = images;
        },
        closeShow() {
            this.closeShow();
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 1vw;
    margin-top: 1vw;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.masonry-container > * {
    width: 100%;
}
</style>
