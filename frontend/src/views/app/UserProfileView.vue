<template>
    <div class="d-flex flex-column gap-2 h-100">
        <show-profile :user="user" v-if="!isLoading" />

        <div class="card" v-if="!profilePosts.length && !isLoading">
            <div class="card-body text-center">
                <h4>Nema objava 😢</h4>
            </div>
        </div>

        <show-profile-post
            v-for="profilePost in profilePosts"
            :key="profilePost.id"
            :user="user"
            :profilePost="profilePost"
            :canEdit="false"
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
import { useUserStore } from '@/stores/user.store';
import { useProfilePostStore } from '@/stores/profilepost.store';

import LoadingSpinner from '@/components/app/LoadingSpinner.vue';

import showProfile from '@/components/app/showProfile.vue';
import showProfilePost from '@/components/app/showProfilePost.vue';

export default {
    name: 'UserProfileView',
    components: {
        showProfile,
        showProfilePost,
        LoadingSpinner,
    },
    data: () => ({
        pageCount: 0,
        isLoading: false,
        userID: 0,
        user: {},
        profilePosts: [],
        userStore: useUserStore(),
        profilePostStore: useProfilePostStore(),
    }),
    async created() {
        this.isLoading = true;

        await this.userStore.fetchUsers();

        this.userID = this.$route.params.id;
        this.user = this.userStore.getUserByID(this.userID);

        await this.loadMoreProfilePosts();

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
                    this.pageCount > this.profilePostStore.totalPages;

                if (bottomOfWindow && !this.isLoading && !isOverFinalPage) {
                    this.isLoading = true;
                    await this.loadMoreProfilePosts();
                    this.isLoading = false;
                }
            };
        },
        async loadMoreProfilePosts() {
            this.pageCount++;

            const moreProfilePosts =
                await this.profilePostStore.fetchProfilePosts(
                    this.userID,
                    this.pageCount
                );

            this.profilePosts.push(...moreProfilePosts);
        },
    },
};
</script>
