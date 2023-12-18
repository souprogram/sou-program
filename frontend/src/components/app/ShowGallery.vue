<template>
    <div>
        <div class="card">
            <div class="row">
                <div
                    class="first-col card-body col-md-3 d-flex justify-content-center align-items-center"
                >
                    <img
                        v-if="image"
                        class="main-pic rounded-circle"
                        :src="image"
                    />
                    <img
                        v-if="!image"
                        class="main-pic rounded-circle"
                        src="@/assets/sp-icon.png"
                    />
                </div>
                <div
                    class="second-col col-md-9 d-flex align-items-center text-start"
                >
                    <div class="card-right card-body text-start">
                        <h3 class="card-title d-inline m-0">
                            {{ galleryData.title }}
                        </h3>
                        <p class="card-text mt-2">
                            {{ galleryData.text }}
                        </p>
                        <p>
                            {{ authorUsername }}
                            <span class="text-muted">
                                •
                                {{
                                    dateService.formatDate(
                                        galleryData.timestamp
                                    )
                                }}
                                ago
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="card-footer text-end">
                <button
                    v-if="isDemos"
                    @click="deleteGallery(galleryData.id)"
                    class="delete-btn btn btn-primary"
                >
                    Izbriši
                </button>
                <button
                    v-if="isDemos"
                    class="edit-btn btn btn-primary"
                    @click="openEditGallery"
                >
                    Uredi
                </button>
                <button
                    class="show-btn btn btn-primary"
                    @click="openShowFullGallery"
                >
                    Prikaži
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useGalleryStore } from '@/stores/galleryStore';
import { useUserStore } from '@/stores/userStore';
import eventBus from '@/eventBus';

import dateService from '@/services/dateService';

import userTypeEnum from '@/enums/userTypeEnum';

export default {
    name: 'showGallery',
    data() {
        return {
            isDemos: userTypeEnum.DEMOS === localStorage.getItem('type'),
            image: '',
            authorUsername: null,
        };
    },
    props: {
        galleryData: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const galleryStore = useGalleryStore();
        const userStore = useUserStore();

        return { galleryStore, userStore };
    },
    async created() {
        await this.displayImage(this.galleryData.images[0]);
        await this.getAuthorUsername(this.galleryData.author_id);
    },
    methods: {
        async deleteGallery(idGallery) {
            const isConfirmed = window.confirm(
                'Jeste li sigurni da želite izbrisati galeriju?'
            );

            if (isConfirmed) {
                await this.galleryStore.deleteGallery(idGallery);
            }
        },
        async displayImage(imageID) {
            const image = await this.galleryStore.googleDisplayImage(imageID);
            this.image = `data:image/jpeg;base64,${image}`;
        },
        async getAuthorUsername(userID) {
            await this.userStore.fetchUser();
            const user = await this.userStore.getUserById(userID);
            this.authorUsername = user.username;
        },
        openEditGallery() {
            const editGallery = true;
            const editGalleryID = this.galleryData.id;
            const editObj = {
                editGallery,
                editGalleryID,
            };
            eventBus.emit('editGallery', editObj);
        },
        openShowFullGallery() {
            const showFullGallery = true;
            const showFullGalleryID = this.galleryData.id;
            const editObj = {
                showFullGallery,
                showFullGalleryID,
            };
            eventBus.emit('showFullGallery', editObj);
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 0;
    margin-top: 1vw;
}
.row {
    padding: 1vw;
}
.first-col {
    width: 40%;
}
.main-pic {
    width: 10vw;
    height: 10vw;
}
.second-col {
    width: 60%;
    padding-left: 0;
}
.card-right {
    padding-left: 0;
}
.card-footer {
    padding: 0.7vw;
    background-color: white;
}
.delete-btn {
    margin-right: 1vw;
}
.edit-btn {
    margin-right: 1vw;
}
</style>
