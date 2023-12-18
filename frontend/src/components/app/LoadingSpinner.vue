<template>
    <div class="d-flex align-items-center justify-content-center flex-grow-1">
        <div class="spinner"></div>
    </div>
</template>

<script>
export default {
    name: 'LoadingSpinner',
};
</script>

<style scoped>
.spinner {
    border: 0.25rem solid transparent;
    border-top: 0.25rem solid var(--primary-color);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(130deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
  