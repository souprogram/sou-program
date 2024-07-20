import { defineStore } from 'pinia';
import backendApiService from '@/services/backendApiService';
import dateService from '@/services/dateService';

export const useAnnouncementStore = defineStore('announcement', {
    state: () => ({
        announcements: [],
        totalPages: 0,
    }),
    actions: {
        async fetchAnnouncements(pageCount) {
            const res = await backendApiService.get({
                url: `/announcements?page=${pageCount}`,
            });

            if (!res.ok) {
                this.$router.push('/error');
                return;
            }

            const resObj = await res.json();

            this.announcements = resObj?.data?.announcements?.map(
                (announcement) => ({
                    ...announcement,
                    posted_at: dateService.getRelativeTime(
                        announcement.created_at
                    ),
                    text_line_breaks: announcement.text.replace(/\n/g, '<br>'),
                })
            ) || [];

            this.totalPages = resObj.data.totalPages;

            return this.announcements;
        },
        async createAnnouncement(announcement) {
            const res = await backendApiService.post({
                url: '/announcements',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(announcement),
            });

            this.$router.push(res.ok ? '/success' : '/error');
        },
        async updateAnnouncement(announcement) {
            const res = await backendApiService.patch({
                url: `/announcements/${announcement.id}`,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(announcement),
            });

            this.$router.push(res.ok ? '/success' : '/error');
        },
        async deleteAnnouncement(announcementID) {
            const res = await backendApiService.delete({
                url: `/announcements/${announcementID}`,
            });

            this.$router.push(res.ok ? '/success' : '/error');
        },
    },
});
