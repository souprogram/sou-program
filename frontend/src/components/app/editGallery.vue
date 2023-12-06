<template>
    <div>
        <form @submit.prevent="editGallery">
            <div class="card">
                <div class="row">
                    <h3 class="headline">Uredi galeriju</h3>

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
                </div>
                <div class="card-footer text-end">
                    <a class="escape-btn btn btn-primary" @click="closeEdit"
                        >Odustani</a
                    >
                    <button type="submit" class="btn btn-primary">Uredi</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useGalleryStore } from '@/stores/gallery.store';

export default {
    name: 'editGallery',
    props: {
        galleryID: {
            type: Number,
            required: true,
        },
        closeEdit: {
            type: Function,
            required: true,
        },
    },
    async data() {
        const galleryStore = useGalleryStore();
        await galleryStore.fetchGallery();
        const galleryData = galleryStore.getGalleryById(this.galleryID);

        return {
            galleryStore,
            newGalleryTitle: galleryData.title,
            newGalleryText: galleryData.text,
        };
    },
    methods: {
        closeEdit() {
            this.closeEdit();
        },
        async editGallery() {
            const updateData = {
                id: this.galleryID,
                title: this.newGalleryTitle,
                text: this.newGalleryText,
            };
            await this.galleryStore.updateGallery(updateData);
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 0;
    margin-top: 1vw;
    background-color: #eaeaea;
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
.card-footer {
    padding: 0.7vw;
    background-color: #eaeaea;
}
.escape-btn {
    margin-right: 1vw;
}
</style>
