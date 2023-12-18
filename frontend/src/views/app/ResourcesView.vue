<template>
    <div class="d-flex flex-column gap-2">
        <div class="card">
            <div class="card-body">
                <h1>Resursi</h1>
            </div>
        </div>

        <div class="card">
            <div class="card-body text-center">
                <h2>Dobro došao/la u Šou program,</h2>
                <h2>još jednu studentsku udrugu. 🙂</h2>
                <div class="d-flex justify-content-center">
                    <div class="d-flex gap-3 fs-2">
                        <div
                            v-for="({ icon, href }, index) in socials"
                            :key="index"
                        >
                            <a class="text-dark" :href="href"
                                ><i :class="icon"></i
                            ></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <input
                name="search"
                type="text"
                class="form-control"
                placeholder="Upiši naziv radionice..."
                v-model="searchTerm"
            />
        </div>

        <div class="card" v-if="!filteredWorkshops.length">
            <div class="card-body text-center">
                <h4>Tražena radionica nije pronađena 😢</h4>
            </div>
        </div>

        <div
            class="card"
            v-for="(workshop, index) in filteredWorkshops"
            :key="index"
        >
            <div class="card-body">
                <h4>{{ workshop.name }}</h4>
                <div class="d-flex flex-wrap gap-3">
                    <div
                        class="resource-item"
                        v-for="(resource, index) in workshop.resources"
                        :key="index"
                    >
                        <h6>{{ resource.name }}</h6>
                        <ul>
                            <li
                                v-for="(link, index) in resource.links"
                                :key="index"
                            >
                                <a class="text-dark" :href="link.url">
                                    {{ link.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/app/Search.vue';
import socialUrls from '@/utils/socialUrls.js';
import workshops from '@/utils/resources.js';

export default {
    name: 'ResourcesView',
    components: {
        Search,
    },
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
            searchTerm: '',
            workshops,
        };
    },
    computed: {
        filteredWorkshops() {
            return this.workshops.filter((workshop) => {
                return workshop.name
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase());
            });
        },
    },
};
</script>

<style scoped>
.resource-item {
    flex-basis: 100%;
}

@media (min-width: 992px) {
    .resource-item {
        flex-basis: calc(50% - 0.5rem);
    }
}
</style>
