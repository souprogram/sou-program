<template>
    <div>
        <form @submit.prevent="postGallery">
            <div class="card">
                <div class="row">
                    <h3 class="headline">Dodaj galeriju</h3>

                    <div class="form-group">
                        <label for="title">Naslov</label>
                        <input
                            type="text"
                            v-model="newGalleryTitle"
                            id="title"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="text">Tekst</label>
                        <textarea
                            type="text"
                            v-model="newGalleryText"
                            id="text"
                            class="form-control"
                            required
                        ></textarea>
                    </div>

                    <div class="form-group">
                        <input
                            type="file"
                            multiple
                            @change="handleFiles"
                            id="files"
                            class="picture-input form-control"
                            accept="image/*"
                            required
                        />
                        <div
                            class="selected-images"
                            v-if="selectedImages.length !== 0"
                        >
                            <p><b>Odabrane slike:</b></p>
                            <ul>
                                <li
                                    v-for="image in selectedImages"
                                    :key="image.name"
                                >
                                    {{ image.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <a class="escape-btn btn btn-primary" @click="closeAdd"
                        >Odustani</a
                    >
                    <button type="submit" class="btn btn-primary">Dodaj</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { getAuthData } from '@/services/authService';
import { useGalleryStore } from '@/stores/gallery.store';
import { useUserStore } from '@/stores/user.store';

export default {
    name: 'addGallery',
    props: {
        closeAdd: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            galleryStore: useGalleryStore(),
            userStore: useUserStore(),
            currentUserUsername: getAuthData().username,
            newGalleryTitle: '',
            newGalleryText: '',
            currentUserID: '',
            selectedImages: [],
        };
    },
    mounted() {
        this.getCurrentUser();
    },
    methods: {
        async getCurrentUser() {
            await this.userStore.fetchUser();
            const currentUserData = await this.userStore.getCurrentUser(
                this.currentUserUsername
            );
            this.currentUserID = currentUserData.id;
        },
        handleFiles(event) {
            this.selectedImages.push(...event.target.files);
        },
        closeAdd() {
            this.closeAdd();
        },
        async postGallery() {
            const newGalleryData = {
                galleryData: {
                    title: this.newGalleryTitle,
                    text: this.newGalleryText,
                    author_id: this.currentUserID,
                },
                galleryItemData: {
                    images: this.selectedImages,
                    folderName: 'gallery',
                },
            };
            await this.galleryStore.createGallery(newGalleryData);
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
.headline {
    margin-bottom: 1vw;
}
.form-group {
    margin-bottom: 1vw;
}
.picture-input {
    margin-bottom: 1vw;
}
.selected-images {
    margin-top: 3vw;
}
.card-footer {
    padding: 0.7vw;
    background-color: white;
}
.escape-btn {
    margin-right: 1vw;
}
</style>
