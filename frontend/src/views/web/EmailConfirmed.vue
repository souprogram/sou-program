<template>
    <div
        v-if="error"
        class="w-full d-flex flex-column justify-content-center align-items-center"
    >
        <h1 class="text-center">
            <span class="fs-1">Hej {{ name || username }}!</span> <br />
            <span class="fs-1">Email <span class="text-primary">{{ email }}</span> je već potvrđen!</span>
            &#128512;
        </h1>

        <button class="btn btn-primary mt-3" @click="goHome">
            Početna stranica
        </button>
    </div>
    <div
        v-else-if="username"
        class="w-full d-flex flex-column justify-content-center align-items-center"
    >
        <h1 class="fs-2 text-center">Hej {{ name || username }}, tvoj email je potvrđen! &#128512;</h1>
        <p class="text-center" v-if="status === 'pending'">
            Admin je obavješten o tvojoj registraciji. Javiti ćemo ti se na
            email sa statusom registracije u najkraćem mogućem roku!
        </p>
        <p v-else>Vidimo se u Šou programu!</p>
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
            status: '',
            error: '',
            username: '',
            name: '',
            email: '',
        };
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
                const token = this.$route.query.accessToken;
                const response = await fetch(
                    `${process.env.VUE_APP_API_URL}/registration/confirm?accessToken=${token}`,
                    {
                        method: 'GET',
                    }
                );
                const data = await response.json();

                // status 400 neće biti smatran kao error i neće se uhvatiti u catch bloku
                if (!response.ok) {
                    if (response.status === 400) {
                        this.error = data.message;
                    } else {
                        this.error = 'Greška prilikom potvrde emaila!';
                    }
                }

                this.username = data.data.username;
                this.name = data.data.name;
                this.email = data.data.email;
                this.status = data.data.status;
            } catch (err) {
                this.$router.push({ name: 'Error' });
            }
        },
    },
};
</script>
