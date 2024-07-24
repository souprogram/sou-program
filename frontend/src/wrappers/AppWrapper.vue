<template>
    <div @click="closeNav">
        <div class="menu-footer position-sticky shadow-sm w-100 p-3">
            <div class="d-flex h-100">
                <img
                    class="menu-icon rounded-circle cursor-pointer align-self-center"
                    :src="require('@/assets/sp-icon.png')"
                    @click.stop="toggleNav"
                />
            </div>
        </div>
        <div class="h-full d-flex">
            <div class="nav-wrapper">
                <Navigation
                    class="position-fixed"
                    :class="{ 'slide-in': isNavOpened }"
                    :toggleNav="toggleNav"
                    @click.stop
                />
            </div>
            <div class="w-100 p-3 main-content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '@/components/app/Navigation.vue';
import { useUserStore } from '@/stores/user.store';
import { onlineUsers, setOnlineStatus, ws } from '@/services/webSocketService';
import { getAuthData } from '@/services/authService';

export default {
    name: 'AppWrapper',
    components: {
        Navigation,
    },
    data: () => ({
        isNavOpened: false,
        userStore: useUserStore(),
        user: getAuthData(),
    }),
   
    methods: {
        toggleNav() {
            this.isNavOpened = !this.isNavOpened;
        },
        closeNav() {
            this.isNavOpened = false;
        },
    },
    mounted() {
        setOnlineStatus(ws,'online', this.user);
    },
    unmounted() {
        setOnlineStatus(ws,'offline', this.user);
    },
};
</script>

<style lang="scss">
:root {
    --primary-color: #66ccff;
    --primary-color-light: #88ddff;
    --primary-bg-color: #f5f5f5;
    --white-color: #ffffff;
    --black-color: #212529;
    --black-outline-color: #515a66;
    --red-color: #dc3545;
    --menu-bg: #22729a;
    --dark-gray: #32292f;
    --green-color: #28a745;
    --gray-color: #6c757d;
}

html,
body {
    background-color: var(--primary-bg-color);
}

.btn-primary {
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
    color: var(--white-color);

    &:focus,
    &:hover {
        background-color: var(--primary-color-light);
        border-color: var(--primary-color-light);
    }

    &:active {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
    }

    &:disabled {
        opacity: 0.7;
        background-color: var(--primary-color);
        border-color: var(--primary-color);
    }
}

.btn-secondary {
    background-color: var(--black-color);
    border: 1px solid var(--black-color);
    color: var(--white-color);

    &:focus,
    &:hover,
    &:active {
        background-color: var(--black-color);
        border-color: var(--black-color);
    }
}

.btn-delete {
    color: var(--red-color);

    &:focus {
        border: 1px solid var(--red-color);
    }

    &:hover {
        opacity: 1;
    }
}

.btn-edit {
    &:focus {
        border: 1px solid var(--black-color);
    }

    &:hover {
        opacity: 1;
    }
}

.h-full {
    min-height: 100vh;
}

.h-fit {
    height: fit-content;
}

.card {
    border: none;
    padding: 0;
}

.menu-footer {
    background-color: var(--white-color);
    top: 0;
    display: none;
    z-index: 3;

    @media (max-width: 768px) {
        display: block;
    }
}

.cursor-pointer {
    cursor: pointer;
}

.nav-wrapper {
    z-index: 2;
    left: 0;

    @media (min-width: 769px) {
        position: static;
        margin-top: 1rem;
    }
}

.main-content {
    @media (min-width: 769px) {
        padding: 1rem !important;
        margin-left: 19rem;
    }
}

.icon {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
    min-height: 3rem;
}

.menu-icon {
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
}
.pointer {
    cursor: pointer;
}
</style>
