<template>
    <div class="d-flex flex-column gap-2 h-100">
        <show-profile :user="currentUser" />
        <add-profile-post :profilePictureSrc="currentUser.profilePictureSrc" />

        <div class="card" v-if="!profilePosts.length && !isLoading">
            <div class="card-body text-center">
                <h4>Nema objava 😢</h4>
            </div>
        </div>

        <show-profile-post
            v-for="profilePost in profilePosts"
            :key="profilePost.id"
            :user="currentUser"
            :profilePost="profilePost"
        />

        <LoadingSpinner v-if="isLoading" />
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user.store';
import { useProfilePostStore } from '@/stores/profilepost.store';

import LoadingSpinner from '@/components/app/LoadingSpinner.vue';

import { getAuthData } from '@/services/authService';

import showProfile from '@/components/app/ShowProfile.vue';
import addProfilePost from '@/components/app/AddProfilePost.vue';
import showProfilePost from '@/components/app/ShowProfilePost.vue';

export default {
    name: 'MyProfileView',
    components: {
        showProfile,
        addProfilePost,
        showProfilePost,
        LoadingSpinner,
    },
    data: function () {
        return {
            pageCount: 0,
            isLoading: false,
            currentUser: {},
            profilePosts: [],
            userStore: useUserStore(),
            profilePostStore: useProfilePostStore(),
        };
    },
    async created() {
        this.isLoading = true;

        await this.userStore.fetchUsers();
        this.currentUser = this.userStore.getUserByID(getAuthData().id);

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
                    this.currentUser.id,
                    this.pageCount
                );

            this.profilePosts.push(...moreProfilePosts);
        },
    },
};
</script>
