<template>
    <div class="d-flex flex-column gap-2 h-100">
        <div class="card">
            <div
                class="card-body d-flex justify-content-between align-items-center"
            >
                <h1>Stalkaonica</h1>
                <div v-if="isAuthUserDemos" @click="showPendingUsers"  class="pointer d-flex justify-content-center align-items-center ">
                    <span class="text-danger">Korisnici na čekanju:</span>
                    <div class="pending-users ms-2 shadow-sm"><span>{{ pendingUsersNumber }}</span></div>
                </div>
                <button
                    v-if="isAuthUserDemos"
                    class="btn btn-primary"
                    @click="openAddingUser"
                >
                    Dodaj korisnika
                </button>
            </div>
        </div>

        <div class="search-bar">
            <Search
                :onSearch="searchedUsersByUsername"
                placeholder="Upiši ime || prezime korisnika..."
                class="search"
            />
            <FilterUsers :filter-data="filterTypeOptions" class="filter" v-model="filterType"/>
            <FilterUsers v-if="isAuthUserDemos" :filter-data="filterStatusOptions" class="filter" v-model="filterStatus"/>
        </div>

        <div v-auto-animate>
            <showUser v-for="user in filteredUsers" :key="user.id" :user="user" />
        </div>

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

        <transition class="z-100" name="fade">
            <add-user
                v-if="isAuthUserDemos && isAddingUser"
                :onClose="closeAddingUser"
            />
        </transition>
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
    data(){
        return {
            isLoading: false,
            users: [],
            isAddingUser: false,
            userStore: useUserStore(),
            isAuthUserDemos: isAuthUserDemos(),
            filterType: 'all',
            filterStatus: 'all',
            filterTypeOptions: {
                all: 'Svi korisnici',
                demonstrator: 'Demonstratori',
                student: 'Studenti',
            },
            filterStatusOptions: {
                all: 'Svi statusi',
                pending: 'Na čekanju',
                active: 'Aktivni',
                inactive: 'Neaktivni',
            },
            searchResults: [],
        }
    },
    async created() {
        this.isLoading = true;

        this.users = await this.userStore.fetchUsers();
        this.searchedUsersByUsername('');
        const id = this.$route.query.id;
        if (id) {
            this.searchUserById(id);
        }

        this.isLoading = false;
    },
    computed: {
        pendingUsersNumber() {
            return this.userStore.users.filter((user) => user.status === 'pending').length;
        },
        filteredUsers() {
            return this.searchResults.filter((user) => {
                const typeCondition = this.filterType === 'all' || user.type === this.filterType;
                const statusCondition = this.filterStatus === 'all' || user.status === this.filterStatus;
                return typeCondition && statusCondition;
            });
        },
    },
    methods: {
        openAddingUser() {
            this.isAddingUser = true;
        },
        closeAddingUser() {
            this.isAddingUser = false;
        },
        searchUserById(searchedId) {
            const searchedUser = this.userStore.getUserByID(searchedId);
            this.users = searchedUser ? [searchedUser] : [];
        },
        searchedUsersByUsername(searchedUsername) {
            this.searchResults = this.userStore.getSearchedUsersByUsername(searchedUsername);
            
        },
        showPendingUsers() {
            this.filterStatus = 'pending';
            this.filterType = 'all'; 
            this.searchedUsersByUsername('');
        }
    },
};
</script>
<style>
.search-bar {
    display: flex;
    gap: 0.5rem;
}
@media (max-width: 768px) {
    .search-bar {
        flex-direction: column;
    }
}
.filter {
    width: 100%;
}
.search {
    width: 100%;
}
.pending-users {
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: yellow;
    display: flex;
    justify-content: center;
    align-items: center;
}




</style>