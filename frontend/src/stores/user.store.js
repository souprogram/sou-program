import { getAuthData, isAuthUserDemos } from '@/services/authService';
import backendApiService from '@/services/backendApiService';
import imageService from '@/services/imageService';
import { defineStore } from 'pinia';

const formatUserData = async (user) => {
    let profilePictureSrc = await imageService.getImageSrc(
        user.profile_picture_key
    );
    if (!profilePictureSrc) {
        profilePictureSrc = require('@/assets/sp-icon.png');
    }

    return {
        ...user,
        fullName: `${user.name} ${user.surname}`,
        profilePictureSrc,
    };
};

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
    }),
    getters: {
        getUserByID: (state) => (userID) => {
            return state.users.find((user) => user.id === userID);
        },
        getSearchedUsersByUsername: (state) => (searchedUsername) => {
            const searchLowerCase = searchedUsername.toLowerCase();
            const currentUser = state.getUserByID(getAuthData().id);

            return state.users.filter((user) => {
                const fullNameLowerCase = user.fullName.toLowerCase();
                const reversedFullNameLowerCase =
                    `${user.surname} ${user.name}`.toLowerCase();

                return (
                    (isAuthUserDemos() || user !== currentUser) &&
                    (fullNameLowerCase.includes(searchLowerCase) ||
                        reversedFullNameLowerCase.includes(searchLowerCase))
                );
            });
        },
        getFilteredUsersByType: (state) => (userType) => {
            if (userType === 'all') {
                return state.users;
            }
            return state.users.filter((user) => user.type === userType);
        }
    },
    actions: {
        async fetchUsers() {
            const res = await backendApiService.get({
                url: '/users',
            });

            if (!res.ok) {
                this.$router.push('/error');
                return;
            }

            const resObj = await res.json();
            this.users = await Promise.all(
                resObj.data.users.map(formatUserData)
            );

            return this.users;
        },
        async createUser(user) {
            const res = await backendApiService.post({
                url: '/users',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            this.$router.push(res.ok ? '/success' : '/error');
        },
        async updateUser(user) {
            const res = await backendApiService.patch({
                url: `/users/${user.id}`,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            this.$router.push(res.ok ? '/success' : '/error');
        },
        async deleteUser(userID) {
            const res = await backendApiService.delete({
                url: `/users/${userID}`,
            });

            this.$router.push(res.ok ? '/success' : '/error');
        },
        async confirmEmail(email) {
            const res = await backendApiService.post({
                url: `/registration/email-confirmation?email=${email}`,
            });

            return res.ok ? true : false;
        },
    },
});
