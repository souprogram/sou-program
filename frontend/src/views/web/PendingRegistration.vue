<template>
    <div
        class="w-full d-flex flex-column justify-content-center align-items-center"
    >
        <h1 class="fs-2">Hej {{ this.$route.params.username }}, zahtjev za tvoju registraciju je zaprimljen! &#128512;</h1>
        <p>Molimo te da potvrdiš svoju email adresu klikom na link u e-mailu koji ti je poslan u e-mail sandučić kako bi dovršili proces registracije.</p>
        <button class="btn btn-primary mt-3" @click="goHome">
            Početna stranica
        </button>
    </div>
</template>

<script>
export default {
    name: 'PendingRegistration',
    methods: {
        goHome() {
            this.$router.push({ name: 'HomeView' });
        },
    }
};
</script>
