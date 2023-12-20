<template>
    <div>
        <div class="card">
            <div class="card-body d-flex gap-3">
                <div>
                    <router-link
                        :to="userProfilePath"
                        class="text-dark d-block icon rounded-circle"
                    >
                        <img
                            class="icon rounded-circle"
                            :src="user.profilePictureSrc"
                        />
                    </router-link>
                </div>
                <div class="flex-grow-1">
                    <router-link :to="userProfilePath" class="text-dark">
                        {{ user.fullName }}
                    </router-link>
                    <div class="text-muted">
                        {{ user.username }}
                    </div>
                </div>
                <div
                    v-if="user.id == currentUserID || isAuthUserDemos"
                    class="h-fit d-flex justify-content-end gap-1"
                >
                    <EditUser :user="user" />
                    <DeleteUser
                        v-if="user.id != currentUserID"
                        :userID="user.id"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditUser from '@/components/app/EditUser.vue';
import DeleteUser from '@/components/app/DeleteUser.vue';
import { getAuthData, isAuthUserDemos } from '@/services/authService';

const props = {
    user: {
        type: Object,
        required: true,
    },
};

export default {
    name: 'ShowUser',
    props,
    components: {
        EditUser,
        DeleteUser,
    },
    data: function () {
        return {
            currentUserID: getAuthData().id,
            isAuthUserDemos: isAuthUserDemos(),
        };
    },
    computed: {
        userProfilePath() {
            return `/user-profile/${this.user.id}`;
        },
    },
};
</script>
