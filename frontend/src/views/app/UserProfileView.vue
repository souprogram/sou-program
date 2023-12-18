<template>
    <div class="d-flex flex-column gap-2 h-100">
        <ShowProfile :user="user" v-if="!isLoading" />

        <div class="card" v-if="!profilePosts.length && !isLoading">
            <div class="card-body text-center">
                <h4>Nema objava 😢</h4>
            </div>
        </div>

        <ShowProfilePost
            v-for="profilePost in profilePosts"
            :key="profilePost.id"
            :user="user"
            :profilePost="profilePost"
            :isCurrentUser="false"
        />

        <LoadingSpinner v-if="isLoading" />
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { useProfilePostStore } from '@/stores/profilePostStore';

import ShowProfile from '@/components/app/ShowProfile.vue';
import ShowProfilePost from '@/components/app/ShowProfilePost.vue';
import LoadingSpinner from '@/components/app/LoadingSpinner.vue';

export default {
    name: 'UserProfileView',
    components: {
        ShowProfile,
        ShowProfilePost,
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
