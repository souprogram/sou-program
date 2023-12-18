import { getAuthData, isAuthUserDemos } from '@/services/authService';
import backendApiService from '@/services/backendApiService';
import imageService from '@/services/imageService';
import { defineStore } from 'pinia';

const formatUserData = async (user) => {
    const profilePictureSrc = (await imageService.getImageSrc(
        user.profile_picture_key
    ))
        ? profilePictureSrc
        : require('@/assets/sp-icon.png');

    return {
        ...user,
        fullName: `${user.name} ${user.surname}`,
        profilePictureSrc,
    };
};

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        isLoading: false,
    }),
    getters: {
        getUserByID: (state) => (userID) => {
            return state.users.find((user) => user.id === userID);
        },
        getSearchedUsersByFullName: (state) => (searchedUsername) => {
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
    },
    actions: {
        async fetchUsers() {
            this.isLoading = true;

            const res = await backendApiService.get({
                url: '/users',
            });

            if (!res.ok) {
                this.isLoading = false;
                this.$router.push('/error');
                return;
            }

            const resObj = await res.json();
            this.users = await Promise.all(
                resObj.data.users.map(formatUserData)
            );

            this.isLoading = false;
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
    },
});
