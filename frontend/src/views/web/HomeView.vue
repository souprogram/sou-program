<template>
    <div>
        <!-- Title -->
        <div class="row">
            <div class="col">
                <h1 class="title">
                    Work in progress | Work in progress | Work in progress
                </h1>
                <div class="fs-5 pb-5 d-flex gap-4 ">
                    <router-link class="text-primary" to="/login">Login</router-link>
                    <router-link class="text-primary" to="/registration">Register</router-link>
                </div>
            </div>
        </div>

        <!-- Images-->
        <div class="row">
            <div class="col-12 col-md-6">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Aspect-ratio-16x9.svg/2560px-Aspect-ratio-16x9.svg.png"
                />
            </div>
            <div class="col-12 col-md-6">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Aspect-ratio-16x9.svg/2560px-Aspect-ratio-16x9.svg.png"
                />
            </div>
        </div>

        <!-- Who are we -->
        <div class="row about-container g-0">
            <div class="col-12 col-md-2 col-xl-3 text-muted">Tko Smo Mi</div>
            <div class="col-12 col-md-10 col-xl-9">
                <div class="row">
                    <div class="col">
                        <h2>
                            We have completed over 150 projects for digital
                            companies from all over the world — from Australia
                            to California, from Sweden to South Africa.
                        </h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h6 class="mobile-justify">
                            As a fully remote agency of more than 50 creative
                            professionals, our team consists of: brand, graphic,
                            web and motion designers, illustrators, copywriters,
                            webflow-developers, producers and project managers,
                            branding, web art directors and heads of production.
                            And we are also proud of our 42 awards from Awwwards
                            and Behance.
                        </h6>
                    </div>
                </div>
            </div>
        </div>

        <!-- Image -->
        <div class="row">
            <div class="col">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Aspect-ratio-16x9.svg/2560px-Aspect-ratio-16x9.svg.png"
                />
            </div>
        </div>

        <!-- Teams -->
        <div class="row teams-container g-0">
            <div class="col-12 col-md-2 col-xl-3 text-muted">Timovi</div>
            <div class="col-12 col-md-10 col-xl-9">
                <div class="row">
                    <div class="col">
                        <h2>
                            We have completed over 150 projects for digital
                            companies from all over the world — from Australia
                            to California, from Sweden to South Africa.
                        </h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h6 class="mobile-justify">
                            As a fully remote agency of more than 50 creative
                            professionals, our team consists of: brand, graphic,
                            web and motion designers, illustrators, copywriters,
                            webflow–developers, producers and project managers,
                            branding, web art directors and heads of production.
                            And we are also proud of our 42 awards from Awwwards
                            and Behance.
                        </h6>
                    </div>
                </div>

                <div class="row teams g-0">
                    <div class="col-12 col-lg-6">
                        <div class="row">
                            <div class="col text-muted">01</div>
                        </div>
                        <div class="row mt-0 mt-lg-4">
                            <div class="col">
                                <h4>
                                    <router-link :to="'educators'"
                                        >Edukatori
                                    </router-link>
                                </h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mobile-justify">
                                For starters, we become immersed in your product
                                in order to realize who you are and what you
                                offer to your audience. Our team looks for a
                                deep understanding of your values and clearly
                                grasps the goals you pursue.
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-lg-6 mt-0 mt-sm-4 mt-md-5 mt-lg-0">
                        <div class="row">
                            <div class="col text-muted">02</div>
                        </div>
                        <div class="row mt-0 mt-lg-4">
                            <div class="col">
                                <h4>
                                    <router-link :to="'podcast'">
                                        Podcast
                                    </router-link>
                                </h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mobile-justify">
                                As a fully remote agency of more than 50
                                creative professionals, our team consists of:
                                brand, graphic, web and motion designers,
                                illustrators, copywriters, webflow–developers,
                                producers and project managers, branding, web
                                art directors and heads of production.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Image -->
        <div class="row">
            <div class="col">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Aspect-ratio-16x9.svg/2560px-Aspect-ratio-16x9.svg.png"
                />
            </div>
        </div>

        <!-- CTA Join us -->
        <div class="row join-container g-0">
            <div class="col-12 col-md-2 col-xl-3 text-muted">Pridruži se</div>
            <div class="col-12 col-md-10 col-xl-9">
                <div class="row">
                    <div class="col">
                        <h4>
                            We have completed over 150 projects for digital
                            companies from.
                            <router-link :to="'contact'">
                                Kontakt forma
                            </router-link>
                        </h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h6>As a fully remote agency of more <EmailLink /></h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmailLink from '@/components/web/EmailLink.vue';
import router from '@/router';

export default {
    name: 'Home',
    components: {
        EmailLink,
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
img {
    width: 100%;
}

.about-container {
    margin: 128px 32px 64px 32px;
}
.join-container {
    margin: 128px 32px 0px 32px;
}
.teams-container {
    margin: 128px 32px;
}

h1,
.about-container,
.teams-container,
.join-container {
    max-width: 1200px;
}

.teams {
    margin-top: 88px;
}

.teams > * {
    padding-right: 100px;
}

@media (max-width: 1200px) {
    .teams > * {
        padding-right: 80px;
    }
}

@media (max-width: 1024px) {
    .about-container {
        margin: 80px 0px 40px 0px;
    }
    .join-container {
        margin: 80px 0px 0px 0px;
    }
    .teams-container {
        margin: 80px 0px;
    }
}

@media (max-width: 768px) {
    .teams {
        margin: 50px 0px;
    }
    .teams > * {
        padding: 0.5em;
    }
    .mobile-justify {
        text-align: justify;
        text-justify: inter-word;
    }
    .join-container {
        margin-bottom: 0px;
    }
}

@media (max-width: 480px) {
    .about-container {
        margin: 50px 0px 20px 0px;
    }
    .join-container {
        margin: 50px 0px 0px 0px;
    }
    .teams-container {
        margin: 50px 0px;
    }

    .teams {
        margin-top: 20px;
    }
    .teams > *:nth-child(1) {
        padding: 1em 0em 0em 0em;
    }
    .teams > *:nth-child(2) {
        padding: 1.5em 0em 0em 0em;
    }
    .mobile-justify {
        text-align: justify;
        text-justify: inter-word;
    }
    .join-container {
        margin-bottom: 0px;
    }
}
</style>
