<template>
    <div>
        <div class="card border-0">
            <div class="d-flex justify-content-between align-items-center">
                <h1>Galerija</h1>
                <button class="btn btn-primary" @click="openAddGallery">
                    Dodaj galeriju
                </button>
            </div>
        </div>
        <div class="row" v-if="!showFullGallery">
            <div class="col">
                <ShowGallery
                    v-for="gallery in galleries"
                    :key="gallery.id"
                    :galleryData="gallery"
                />
                <div
                    class="d-flex justify-content-center"
                    v-if="galleries.length === 0"
                >
                    <h1 class="mt-5">Nema galerija...</h1>
                </div>
            </div>
            <div class="col" v-if="addGallery || editGallery">
                <AddGallery :closeAdd="closeAdd" v-if="addGallery" />
                <EditGallery
                    :galleryID="editGalleryID"
                    :closeEdit="closeEdit"
                    v-if="editGallery"
                />
            </div>
        </div>
        <div class="row" v-if="showFullGallery">
            <div class="col">
                <ShowFullGallery
                    :galleryID="showFullGalleryID"
                    :closeShow="closeShow"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { useGalleryStore } from '@/stores/galleryStore';
import eventBus from '@/eventBus';

import ShowGallery from '@/components/app/ShowGallery.vue';
import AddGallery from '@/components/app/AddGallery.vue';
import EditGallery from '@/components/app/EditGallery.vue';
import ShowFullGallery from '@/components/app/ShowFullGallery.vue';

export default {
    name: 'GalleryView',
    data() {
        return {
            galleryStore: useGalleryStore(),
            galleries: [],
            addGallery: false,
            editGallery: false,
            editGalleryID: null,
            showFullGallery: false,
            showFullGalleryID: null,
        };
    },
    components: {
        ShowGallery,
        AddGallery,
        EditGallery,
        ShowFullGallery,
    },
    async created() {
        this.galleries = await this.galleryStore.fetchGallery();

        this.openEditGallery();
        this.openShowFullGallery();
    },
    methods: {
        closeAdd() {
            this.addGallery = false;
        },
        closeEdit() {
            this.editGallery = false;
        },
        closeShow() {
            this.showFullGallery = false;
        },
        rightColActiveCheck() {
            this.addGallery = false;
            this.editGallery = false;
            this.showFullGallery = false;
        },
        openAddGallery() {
            this.rightColActiveCheck();
            this.addGallery = true;
        },
        openEditGallery() {
            eventBus.on('editGallery', (editObj) => {
                this.rightColActiveCheck();
                this.editGalleryID = editObj.editGalleryID;
                this.$nextTick(() => {
                    this.editGallery = editObj.editGallery;
                });
            });
        },
        openShowFullGallery() {
            eventBus.on('showFullGallery', (editObj) => {
                this.rightColActiveCheck();
                this.showFullGalleryID = editObj.showFullGalleryID;
                this.$nextTick(() => {
                    this.showFullGallery = editObj.showFullGallery;
                });
            });
        },
    },
};
</script>
