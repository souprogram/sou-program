import { useGalleryStore } from '@/stores/galleryStore';

export default {
    async getImageSrc(imageID) {
        if (!imageID) {
            return '';
        }
        const galleryStore = useGalleryStore();
        const imageBase64 = await galleryStore.getImage(imageID);
        return imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : '';
    },
};
