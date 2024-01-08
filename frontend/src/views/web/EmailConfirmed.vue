<template>
    <div
        v-if="username"
        class="w-full d-flex flex-column justify-content-center align-items-center"
    >
        <h1 class="fs-2">Hej {{ username }}, tvoj email je potvrđen! &#128512;</h1>
        <p>Admin je obavješten o tvojoj registraciji. Javiti ćemo ti se na email sa statusom registracije u najkraćem mogućem roku!</p>
        <button class="btn btn-primary mt-3" @click="goHome">
            Početna stranica
        </button>
    </div>
    <div
        v-else
        class="w-full d-flex flex-column justify-content-center align-items-center"
    >
        <h1 class="fs-2">Učitavanje...</h1>
    </div>
</template>

<script>
export default {
    name: 'EmailConfirmed',
    data() {
        return {
            username: '',
        }
    },
    mounted() {
        this.confirmEmail();
    },
    methods: {
        goHome() {
            this.$router.push({ name: 'HomeView' });
        },
        async confirmEmail() {
            try {
                const token = this.$route.params.token;
                const response = await fetch(`${process.env.VUE_APP_URL}/confirm/${token}`, {
                    method: 'POST',
                })
    
                if (!response.ok) {
                    this.$router.push({ name: 'Error' })
                    return
                }
                
                const data = await response.json();
                this.username = data.username;
            }
            catch (err) {
                this.$router.push({ name: 'Error' })
            }
        },
    }
};
</script>
