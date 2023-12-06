<template>
    <router-view />
</template>

<script>
export default {
    mounted() {
        const loadingContainer = document.getElementById('loading-container');
        if (loadingContainer) {
            loadingContainer.style.display = 'none';
        }
    },
};
</script>

<style lang="scss">
#app {
    font-family: 'Poppins', sans-serif;
}
</style>
