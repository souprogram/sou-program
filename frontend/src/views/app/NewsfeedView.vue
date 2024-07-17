<template>
    <div class="d-flex flex-column gap-2 h-100">
        <div class="card">
            <div class="card-body">
                <h1>Naslovnica</h1>
            </div>
        </div>

        <add-announcement
            v-if="isAuthUserDemos && currentUser"
            :userProfilePictureSrc="currentUser.profilePictureSrc"
        />

        <h1
            class="mt-5 mx-auto"
            v-if="announcements.length === 0 && !isLoading"
        >
            Nema obavijesti...
        </h1>

        <show-announcement
            v-for="announcement in announcements"
            :key="announcement.id"
            :announcement="announcement"
        />

        <div
            class="d-flex align-items-center justify-content-center flex-grow-1"
            v-if="isLoading"
        >
            <LoadingSpinner />
        </div>
    </div>
</template>

<script>
import LoadingSpinner from '@/components/app/LoadingSpinner.vue';
import addAnnouncement from '@/components/app/addAnnouncement.vue';
import showAnnouncement from '@/components/app/showAnnouncement.vue';
import { getAuthData, isAuthUserDemos } from '@/services/authService';
import { useAnnouncementStore } from '@/stores/announcement.store';
import { useUserStore } from '@/stores/user.store';

export default {
    name: 'NewsfeedView',
    components: {
        addAnnouncement,
        showAnnouncement,
        LoadingSpinner,
    },
    data: () => ({
        pageCount: 0,
        isLoading: false,
        currentUser: {},
        isAuthUserDemos: isAuthUserDemos(),
        announcements: [],
        announcementStore: useAnnouncementStore(),
        userStore: useUserStore(),
    }),
    async created() {
        this.isLoading = true;

        await this.userStore.fetchUsers();
        this.currentUser = this.userStore.getUserByID(getAuthData().id);
        await this.loadMoreAnnouncements();

        this.isLoading = false;
    },
    mounted() {
        this.handleScroll();
    },
    methods: {
        handleScroll() {
            window.onscroll = async () => {
                const OFFSET = 100;
                const bottomOfWindow =
                    document.documentElement.scrollTop + window.innerHeight >=
                    document.documentElement.offsetHeight - OFFSET;

                const isOverFinalPage =
                    this.pageCount > this.announcementStore.totalPages;

                if (bottomOfWindow && !this.isLoading && !isOverFinalPage) {
                    this.isLoading = true;
                    await this.loadMoreAnnouncements();
                    this.isLoading = false;
                }
            };
        },
        async getAnnouncementsWithAuthor(announcements) {
            return await Promise.all(
                announcements?.map(async (announcement) => ({
                    ...announcement,
                    author: await this.userStore.getUserByID(
                        announcement.author_id
                    ),
                }))
            );
        },
        async loadMoreAnnouncements() {
            this.pageCount++;

            const moreAnnouncements =
                await this.announcementStore.fetchAnnouncements(this.pageCount);

            const moreAnnouncementsWithAuthor =
                await this.getAnnouncementsWithAuthor(moreAnnouncements);

            this.announcements.push(...moreAnnouncementsWithAuthor);
        },
    },
};
</script>
