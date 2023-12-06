<template>
    <footer>
        <div class="d-flex justify-content-center">
            <div class="d-flex">
                <div
                    v-for="({ icon, href }, index) in socials"
                    :key="index"
                    class="footer-item"
                >
                    <a :href="href"><i :class="icon"></i></a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import socialUrls from '@/utils/socialUrls.js';

export default {
    data() {
        const icons = [
            'fa-solid fa-envelope',
            'fa-brands fa-discord',
            'fa-brands fa-instagram',
            'fa-brands fa-linkedin',
            'fa-brands fa-youtube',
            'fa-brands fa-github',
        ];

        const hrefs = [
            socialUrls.mail.mailHref,
            socialUrls.discord,
            socialUrls.instagram,
            socialUrls.linkedin,
            socialUrls.youtube,
            socialUrls.github,
        ];

        const socials = [];
        for (let i = 0; i < icons.length; i++) {
            socials.push({
                icon: icons[i],
                href: hrefs[i],
            });
        }

        return {
            socials,
        };
    },
    name: 'SouFooter',
};
</script>

<style lang="scss" scoped>
body {
    background-color: black;
}
a {
    color: black;
}
footer {
    background-color: var(--web-primary-color);
}
.footer-item {
    padding: 0.5em;
    font-size: 1.5em;
}

.footer-item a {
    text-decoration: none;
    color: white;
}
</style>
