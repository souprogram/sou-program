<template>
    <div class="card">
        <div
            class="card-body d-flex flex-column flex-sm-row justify-content-center justify-content-sm-start align-items-center gap-5"
        >
            <div>
                <img
                    class="profile-pic rounded-circle"
                    :src="
                        user.profilePictureSrc ||
                        require('@/assets/sp-icon.png')
                    "
                />
            </div>
            <div class="text-center text-sm-start">
                <h1 class="card-title">{{ user.fullName }}</h1>

                <p v-if="user.username && user.type" class="my-1">
                    {{ user.username }} - {{ user.type }}
                </p>
                <p class="my-1">{{ user.email }}</p>
                <p class="my-1">{{ user.bio }}</p>
            </div>
        </div>
    </div>
</template>

<script>
const props = {
    user: {
        type: Object,
        required: true,
    },
};

export default {
    name: 'showProfile',
    props,
};
</script>

<style scoped>
.card-body {
    padding: 2rem;
}
.profile-pic {
    width: 9rem;
    height: 9rem;
    min-width: 9rem;
    min-height: 9rem;
}
</style>
