<template>
    <div>
        <div class="row">
            <div class="col">
                <h1 id="contact">Kontaktirajte nas na <EmailLink /></h1>
            </div>
        </div>
    </div>
</template>

<script>
import EmailLink from '@/components/web/EmailLink.vue';

export default {
    name: 'Contact',
    components: { EmailLink },
};
</script>

<style scoped>
body {
    background-color: black;
}
a {
    color: black;
}
h1#contact {
    font-size: 5rem;
    line-height: 1.5;
}

@media (max-width: 1400px) {
    h1#contact {
        margin-top: 1em;
        font-size: 4rem;
    }
}

@media (max-width: 1200px) {
    h1#contact {
        margin-top: 2em;
        margin-left: 1em;
        font-size: 3rem;
    }
}

@media (max-width: 1024px) {
    h1#contact {
        font-size: 2.75rem;
    }
}

@media (max-width: 850px) {
    h1#contact {
        margin-top: 3em;
        font-size: 2.25rem;
    }
}

@media (max-width: 650px) {
    h1#contact {
        font-size: 2rem;
    }
}

@media (max-width: 550px) {
    h1#contact {
        font-size: 1.5rem;
    }
}

@media (max-width: 550px) {
    h1#contact {
        font-size: 1.5rem;
    }
}

@media (max-width: 400px) {
    h1#contact {
        margin-top: 2em;
        font-size: 1rem;
    }
}
</style>
