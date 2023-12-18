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
                    @click="() => (isAddingUser = true)"
                >
                    Dodaj korisnika
                </button>
            </div>
        </div>

        <div class="card">
            <input
                name="search"
                type="text"
                class="form-control"
                placeholder="Upiši ime || prezime korisnika..."
                v-model="searchTerm"
            />
        </div>

        <ShowUser v-for="user in filteredUsers" :key="user.id" :user="user" />

        <div class="card" v-if="!filteredUsers.length && !userStore.isLoading">
            <div class="card-body text-center">
                <h4>Korisnik nije pronađen 😢</h4>
            </div>
        </div>

        <LoadingSpinner v-if="userStore.isLoading" />

        <AddUser
            v-if="isAuthUserDemos && isAddingUser"
            :onClose="() => (isAddingUser = false)"
        />
    </div>
</template>

<script>
import LoadingSpinner from '@/components/app/LoadingSpinner.vue';
import AddUser from '@/components/app/AddUser.vue';
import ShowUser from '@/components/app/ShowUser.vue';
import { isAuthUserDemos } from '@/services/authService';
import { useUserStore } from '@/stores/user.store';

export default {
    name: 'SearchView',
    components: {
        ShowUser,
        AddUser,
        LoadingSpinner,
    },
    data: () => ({
        isAddingUser: false,
        searchTerm: '',
        isAuthUserDemos: isAuthUserDemos(),
    }),
    async mounted() {
        await this.userStore.fetchUsers();
    },
    computed: {
        userStore() {
            return useUserStore();
        },
        filteredUsers() {
            return this.userStore.getSearchedUsersByFullName(this.searchTerm);
        },
    },
};
</script>
