<template>
    <div>
        <div class="row">
            <div class="col">
                <h1>
                    We have project managers, branding, web art directors and
                    heads of production
                </h1>
            </div>
        </div>

        <!-- Podcast -->
        <div class="row podcast-container g-0">
            <div class="col-12 col-md-2 col-xl-3 text-muted">Podcast</div>
            <div class="col-12 col-md-10 col-xl-9">
                <h6 class="m-0">
                    As a fully remote agency of more than 50 creative
                    professionals, our team consists of: brand, graphic, web and
                    motion designers, illustrators, copywriters, webflow
                </h6>

                <div class="row teams g-0">
                    <div class="col-12 col-lg-6 mt-0 mt-sm-4 mt-md-5 mt-lg-0">
                        <div class="row">
                            <div class="col text-muted">01</div>
                        </div>
                        <div class="row mt-0 mt-lg-4">
                            <div class="col">
                                <h4>Voditelj</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mobile-justify">
                                As a fully remote agency of more than 50
                                creative professionals, our team consists of:
                                brand, graphic, web and motion designers,
                                illustrators, cqeoqe qioeiiqio eioqi eoqeio qieo
                                iqoeioqieoiqeo iqoe iqoe iopywriters,
                                webflow–deve ewei woeiowe iwoe iowi esslopers,
                                producers and project managers, branding, web
                                art directors and heads of production.
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 mt-0 mt-sm-4 mt-md-5 mt-lg-0">
                        <div class="row">
                            <div class="col text-muted">02</div>
                        </div>
                        <div class="row mt-0 mt-lg-4">
                            <div class="col">
                                <h4>Tehničar</h4>
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
                    <div class="col-12 col-lg-6 mt-0 mt-sm-4 mt-md-5">
                        <div class="row">
                            <div class="col text-muted">03</div>
                        </div>
                        <div class="row mt-0 mt-lg-4">
                            <div class="col">
                                <h4>Postprodukcija</h4>
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
                    <div class="col-12 col-lg-6 mt-0 mt-sm-4 mt-md-5">
                        <div class="row">
                            <div class="col text-muted">04</div>
                        </div>
                        <div class="row mt-0 mt-lg-4">
                            <div class="col">
                                <h4>Grafičar</h4>
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
import EducatorCalendar from '@/components/web/EducatorCalendar.vue';
import EmailLink from '@/components/web/EmailLink.vue';

export default {
    name: 'Educators',
    components: {
        EducatorCalendar,
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
.join-container {
    margin: 128px 32px 0px 32px;
}

.podcast-container {
    margin: 0px 32px 128px 32px;
}

h1,
.podcast-container,
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
    .join-container {
        margin: 80px 0px 0px 0px;
    }
    .podcast-container {
        margin: 0px 0px 80px 0px;
    }

    .teams {
        margin-top: 50px;
    }
}

@media (max-width: 768px) {
    h1 {
        padding-left: 0px !important;
        padding-right: 0px !important;
    }
    .teams {
        margin: 20px 0px 0px 0px;
    }
    .teams > * {
        padding: 0.5em;
    }
    .join-container {
        margin-bottom: 0px;
    }
}

@media (max-width: 480px) {
    .join-container {
        margin: 50px 0px 0px 0px;
    }
    .podcast-container {
        margin: 0px 0px 50px 0px;
    }

    .teams {
        margin-top: 20px;
    }
    .teams > *:nth-child(2n + 1) {
        padding: 1em 0em 0em 0em;
    }
    .teams > *:nth-child(2n) {
        padding: 1.5em 0em 0em 0em;
    }
    .join-container {
        margin-bottom: 0px;
    }
}
</style>
