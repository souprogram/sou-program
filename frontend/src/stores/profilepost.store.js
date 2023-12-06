import { defineStore } from 'pinia';
import backendApiService from '@/services/backendApiService';
import dateService from '@/services/dateService';

export const useProfilePostStore = defineStore('profilePost', {
    state: () => ({
        profilePosts: [],
        totalPages: 0,
    }),
    actions: {
        async fetchProfilePosts(authorID, pageCount) {
            const res = await backendApiService.get({
                url: `/profile-posts/?page=${pageCount}&author_id=${authorID}`,
            });

            if (!res.ok) {
                this.$router.push('/error');
                return;
            }

            const resObj = await res.json();

            this.profilePosts = await Promise.all(
                resObj.data.profilePosts.map(async (profilePost) => ({
                    ...profilePost,
                    posted_at: dateService.getRelativeTime(
                        profilePost.created_at
                    ),
                }))
            );

            this.totalPages = resObj.data.totalPages;

            return this.profilePosts;
        },
        async createProfilePost(profilePost) {
            const res = await backendApiService.post({
                url: '/profile-posts',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profilePost),
            });

            this.$router.push(res.ok ? '/success' : '/error');
        },
        async updateProfilePost(profilePost) {
            const res = await backendApiService.patch({
                url: `/profile-posts/${profilePost.id}`,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profilePost),
            });

            this.$router.push(res.ok ? '/success' : '/error');
        },
        async deleteProfilePost(profilePostID) {
            const res = await backendApiService.delete({
                url: `/profile-posts/${profilePostID}`,
            });

            this.$router.push(res.ok ? '/success' : '/error');
        },
    },
});
