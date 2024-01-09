import { defineStore } from 'pinia';
import { getAuthHeaders } from '@/services/authService';
import backendApiService from '@/services/backendApiService';

export const useGalleryStore = defineStore('gallery', {
    state: () => ({
        gallery: [],
    }),
    getters: {
        getGalleryById: (state) => (galleryID) => {
            const gallery = state.gallery.find((gallery) => {
                return gallery.id === Number(galleryID);
            });
            return gallery;
        },
    },
    actions: {
        async fetchGalleryItem(galleryID) {
            const res = await backendApiService.get({
                url: `/gallery-item/${galleryID}`,
            });

            if (!res.ok) {
                window.location.href = '/error';
                return;
            }

            const resObj = await res.json();

            return resObj.data;
        },
        async fetchGallery() {
            const res = await backendApiService.get({
                url: '/gallery',
            });

            if (!res.ok) {
                window.location.href = '/error';
                return;
            }

            const resObj = await res.json();
            let galleries = resObj.data;

            for (const gallery of galleries) {
                const galleryItems = await this.fetchGalleryItem(gallery.id);
                const imageKeys = galleryItems.map(
                    (galleryItem) => galleryItem.picture_key
                );
                gallery.images = imageKeys;
            }

            this.gallery = galleries;
            return galleries;
        },
        async deleteGallery(idGallery) {
            const res = await backendApiService.delete({
                url: '/gallery',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: idGallery }),
            });

            window.location.href = res.ok ? '/success' : '/error';
        },
        async googleUploadImages(googleImageData) {
            const username = localStorage.getItem('username');
            let galleryItemIDs = [];

            const images = googleImageData.images;

            for (const image of images) {
                const folderName = googleImageData.folderName;
                const imageName =
                    username +
                    '-' +
                    Date.now() +
                    '-' +
                    Math.floor(Math.random() * 101);

                const res = await backendApiService.post({
                    url: `/images/${folderName}/${imageName}`,
                    headers: { 'Content-Type': 'text/plain' },
                    body: image,
                });

                if (!res.ok) {
                    window.location.href = '/error';
                    return;
                }

                const resObj = await res.json();
                galleryItemIDs.push(resObj.data);
            }

            return galleryItemIDs;
        },
        async createGalleryItem(galleryID, galleryItemIDs) {
            const res = await backendApiService.post({
                url: `/gallery-item/${galleryID}`,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ galleryItemIDs }),
            });

            if (!res.ok) {
                window.location.href = '/error';
            }
        },
        async createGallery(galleryData) {
            const galleryItemIDs = await this.googleUploadImages(
                galleryData.galleryItemData
            );

            if (galleryItemIDs.length === 0) {
                window.location.href = '/error';
                return;
            }

            const res = await backendApiService.post({
                url: '/gallery',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(galleryData.galleryData),
            });

            if (!res.ok) {
                window.location.href = '/error';
                return;
            }

            const galleryObj = await res.json();
            const galleryID = galleryObj.data.galleryID.id;

            await this.createGalleryItem(galleryID, galleryItemIDs);

            window.location.href = '/success';
        },
        async getImage(imageID) {
            const res = await backendApiService.get({
                url: `/images/${imageID}`,
            });

            if (!res.ok) {
                window.location.href = '/error';
                return;
            }

            const resObj = await res.json();
            return resObj.data;
        },
        async updateGallery(updateData) {
            const res = await backendApiService.patch({
                url: '/update-gallery',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData),
            });

            window.location.href = res.ok ? '/success' : '/error';
        },
    },
});
