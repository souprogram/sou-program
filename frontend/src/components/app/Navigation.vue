<template>
    <div class="nav-container text-dark">
        <div class="card text-center d-flex flex-column my-0 my-md-3">
            <div class="p-3 nav-heading">
                <img
                    class="menu-icon rounded-circle mx-auto"
                    src="@/assets/sp-icon.png"
                />
                <h5 class="card-title mt-2 d-none d-md-block">
                    {{ username }}
                </h5>
            </div>
            <nav class="nav d-flex flex-column flex-grow-1">
                <router-link
                    to="/newsfeed"
                    class="nav-link"
                    :class="{ 'nav-link-active': isRouteActive('/newsfeed') }"
                    data-text="Naslovnica"
                    @click="toggleNav"
                >
                    <i class="material-icons">article</i>
                </router-link>
                <router-link
                    to="/my-profile"
                    class="nav-link"
                    :class="{ 'nav-link-active': isRouteActive('/my-profile') }"
                    data-text="Profil"
                    @click="toggleNav"
                >
                    <i class="material-icons">person</i>
                </router-link>
                <router-link
                    to="/search"
                    class="nav-link"
                    :class="{
                        'nav-link-active':
                            isRouteActive('/search') ||
                            isRouteActive('/user-profile'),
                    }"
                    data-text="Stalkaonica"
                    @click="toggleNav"
                >
                    <i class="material-icons">people</i>
                </router-link>
            </nav>
            <div class="nav-bottom">
                <router-link
                    to="/resources"
                    class="nav-link px-3 py-2"
                    :class="{ 'nav-link-active': isRouteActive('/resources') }"
                    data-text="Resursi"
                    @click="toggleNav"
                >
                    <i class="material-icons">info</i>
                </router-link>
                <button
                    class="btn btn-link nav-link px-3 py-2 text-danger"
                    data-text="Odjavi me"
                    @click="handleLogout"
                >
                    <i class="material-icons">logout</i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user.store';
import { logout, getAuthData } from '@/services/authService';

const props = {
    toggleNav: {
        type: Function,
        required: true,
    },
};

export default {
    name: 'Navigation',
    props,
    data: function () {
        return {
            username: '',
        };
    },
    async created() {
        const userStore = useUserStore();
        await userStore.fetchUsers();
        const currentUser = userStore.getUserByID(getAuthData().id);

        this.username = currentUser.username;
    },
    methods: {
        isRouteActive(routeName) {
            return this.$route.path.startsWith(routeName);
        },
        async handleLogout() {
            const loggedOut = await logout();

            if (!loggedOut) {
                this.$router.push('/error');
                return;
            }

            this.$router.push('/login');
        },
    },
};
</script>

<style lang="scss" scoped>
.nav-container {
    display: block;
    height: 100vh;
    transform: translateX(-110%);
    transition: transform 0.3s ease-in-out;
    position: sticky;
    top: 0;
    overflow-y: auto;
    margin-left: 0;
    z-index: 1;
    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.175);
}

.nav-heading {
    padding-top: 3vw;
}

.slide-in {
    transform: translateX(0);
}

.nav-image {
    width: 4rem;
    height: 4rem;
    min-width: 4rem;
    min-height: 4rem;
}

.card {
    height: 100vh;
    // border: solid 1px lightgray;
    border-radius: 0;
    display: flex;
    flex-direction: column;
}

.nav {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.nav-bottom {
    margin-top: auto;
    display: flex;
    flex-direction: column;
}

.nav-link {
    display: flex;
    align-items: center;
    color: var(--black-color);
    height: 3rem;

    &[data-text='Odjavi me'] {
        border-radius: 0;
    }

    &:hover {
        background-color: var(--primary-color);
        color: white !important;
    }

    &:hover[data-text='Odjavi me'] {
        background-color: var(--red-color);
        color: white !important;
    }

    &::after {
        display: none;
        content: attr(data-text); // Display the text content
        margin-left: 0.5rem;
    }
}

.nav-link-active {
    background-color: var(--primary-bg-color);
}

.material-icons {
    width: 100%;
}

.menu-icon {
    visibility: hidden;
}

@media (min-width: 768px) {
    .nav-container {
        position: static;
        transform: translateX(0);
        width: 18rem;
        margin-left: 1rem;
        box-shadow: none;
    }

    .card {
        height: calc(100vh - 2rem);
        border: none;
        border-radius: 0.5rem;
    }

    .nav-image {
        width: 100px;
        height: 100px;
    }

    .nav-link::after {
        display: block;
    }

    .nav-link[data-text='Odjavi me'] {
        border-radius: 0 0 0.5rem 0.5rem;
    }

    .material-icons {
        width: auto;
    }

    .menu-icon {
        visibility: visible;
        width: 7rem;
        height: 7rem;
        min-width: 7rem;
        min-height: 7rem;
    }
}
</style>
