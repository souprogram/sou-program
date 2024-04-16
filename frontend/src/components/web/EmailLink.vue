<template>
    <a :href="mailHref">{{ mailTo }}</a>
</template>

<script>
import socialUrls from '@/utils/socialUrls.js';

export default {
    name: 'EmailLink',
    data() {
        return {
            mailTo: socialUrls.mail.mailTo,
            mailHref: socialUrls.mail.mailHref,
        };
    },
};
</script>

<style scoped>
body {
    background-color: black;
}
a {
    color: black;
}
</style>
