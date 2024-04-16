import {
    deleteAuthData,
    fetchAuthData,
    getAuthData,
} from '@/services/authService';
import { keys, storage } from '@/services/storageService';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'WebWrapper',
        component: () => import('@/wrappers/WebWrapper.vue'),
        meta: {
            authRequired: false,
        },
        children: [
            {
                path: '',
                name: 'HomeView',
                meta: { title: 'Početna' },
                component: () => import('@/views/web/HomeView.vue'),
            },
            // {
            //     path: 'login',
            //     name: 'LoginView',
            //     meta: { title: 'Prijava' },
            //     component: () => import('@/views/web/LoginView.vue'),
            // },
            // {
            //     path: 'contact',
            //     name: 'ContactView',
            //     meta: { title: 'Kontakt' },
            //     component: () => import('@/views/web/ContactView'),
            // },
            // {
            //     path: 'educators',
            //     name: 'EducatorsView',
            //     meta: { title: 'Šou lab' },
            //     component: () => import('@/views/web/EducatorsView'),
            // },
            // {
            //     path: 'podcast',
            //     name: 'PodcastView',
            //     meta: { title: 'Šou podkast' },
            //     component: () => import('@/views/web/PodcastView'),
            // },
        ],
    },
    // {
    //     path: '/',
    //     name: 'AppWrapper',
    //     component: () => import('@/wrappers/AppWrapper.vue'),
    //     meta: {
    //         authRequired: true,
    //     },
    //     children: [
    //         {
    //             path: 'newsfeed',
    //             name: 'NewsfeedView',
    //             component: () => import('@/views/app/NewsfeedView.vue'),
    //         },
    //         {
    //             path: 'search',
    //             name: 'SearchView',
    //             component: () => import('@/views/app/SearchView.vue'),
    //         },
    //         {
    //             path: 'my-profile',
    //             name: 'MyProfileView',
    //             component: () => import('@/views/app/MyProfileView.vue'),
    //         },
    //         {
    //             path: 'user-profile/:id',
    //             name: 'UserProfileView',
    //             component: () => import('@/views/app/UserProfileView.vue'),
    //         },
    //         {
    //             path: 'gallery',
    //             name: 'GalleryView',
    //             component: () => import('@/views/app/GalleryView.vue'),
    //         },
    //         {
    //             path: 'competitions',
    //             name: 'CompetitionView',
    //             component: () => import('@/views/app/CompetitionView.vue'),
    //         },
    //         {
    //             path: 'resources',
    //             name: 'ResourcesView',
    //             component: () => import('@/views/app/ResourcesView.vue'),
    //         },
    //     ],
    // },
    // {
    //     path: '/',
    //     name: 'MsgWrapper',
    //     component: () => import('@/wrappers/MsgWrapper.vue'),
    //     children: [
    //         {
    //             path: 'error',
    //             name: 'Error',
    //             component: () => import('@/views/app/Error.vue'),
    //         },
    //         {
    //             path: 'success',
    //             name: 'Success',
    //             component: () => import('@/views/app/Success.vue'),
    //         },
    //     ],
    // },
    {
        path: '/:catchAll(.*)',
        name: 'WebWrapper all routes',
        redirect: '/',
        meta: {
            authRequired: false,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(_to, _from, _savedPosition) {
        return {
            top: -1,
        };
    },
});

router.beforeEach(async (to, _from, next) => {
    const shouldRefresh = storage.get(keys.SHOULD_REFRESH) === 'true';
    if (shouldRefresh) {
        storage.delete(keys.SHOULD_REFRESH);
        location.reload();
    }

    const user = getAuthData();
    const isUserLoggedIn = user !== null;

    if (isUserLoggedIn) {
        if (Date.now() > user.expires) {
            await fetchAuthData();
        }
    }

    if (!isUserLoggedIn && to.meta.authRequired) {
        return next({ name: 'LoginView' });
    } else if (isUserLoggedIn && to.name === 'LoginView') {
        return next({ name: 'NewsfeedView' });
    }

    return next();
});

const DEFAULT_TITLE = 'Šou program';

router.afterEach((to, _from) => {
    document.title = to.meta.title
        ? `${DEFAULT_TITLE} | ${to.meta.title}`
        : DEFAULT_TITLE;
});

export default router;
