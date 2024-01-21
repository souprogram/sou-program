<template>
    <div class="d-flex flex-column gap-2 h-100">
        <div class="card">
            <div
                class="card-body d-flex justify-content-between align-items-center"
            >
                <h1>Stalkaonica</h1>
                <button
                    v-if="isAuthUserDemos"
                    class="btn btn-primary"
                    @click="openAddingUser"
                >
                    Dodaj korisnika
                </button>
            </div>
        </div>

        <div class="d-flex flex-wrap">
            <Search
                :onSearch="searchedUsersByUsername"
                placeholder="Upiši ime || prezime korisnika..."
                class="col-12 col-md-6 me-md-2"
            />
            <FilterUsers class="col-12 col-md-6" />
        </div>

        <showUser v-for="user in users" :key="user.id" :user="user" />

        <div class="card" v-if="!users.length && !isLoading">
            <div class="card-body text-center">
                <h4>Korisnik nije pronađen 😢</h4>
            </div>
        </div>

        <div
            v-if="isLoading"
            class="d-flex align-items-center justify-content-center flex-grow-1"
        >
            <LoadingSpinner />
        </div>

        <add-user
            v-if="isAuthUserDemos && isAddingUser"
            :onClose="closeAddingUser"
        />
    </div>
</template>

<script>
import LoadingSpinner from '@/components/app/LoadingSpinner.vue';
import Search from '@/components/app/Search.vue';
import addUser from '@/components/app/addUser.vue';
import showUser from '@/components/app/showUser.vue';
import FilterUsers from '@/components/app/FilterUsers.vue';
import { isAuthUserDemos } from '@/services/authService';
import { useUserStore } from '@/stores/user.store';

export default {
    name: 'SearchView',
    components: {
        Search,
        showUser,
        addUser,
        LoadingSpinner,
        FilterUsers,
    },
    data: () => ({
        isLoading: false,
        users: [],
        isAddingUser: false,
        userStore: useUserStore(),
        isAuthUserDemos: isAuthUserDemos(),
    }),
    async created() {
        this.isLoading = true;

        this.users = await this.userStore.fetchUsers();
        this.searchedUsersByUsername('');

        this.isLoading = false;
    },
    methods: {
        openAddingUser() {
            this.isAddingUser = true;
        },
        closeAddingUser() {
            this.isAddingUser = false;
        },
        searchedUsersByUsername(searchedUsername) {
            this.users =
                this.userStore.getSearchedUsersByUsername(searchedUsername);
        },
    },
};
</script>
