<template>
    <div class="card">
        <div class="card-body d-flex gap-3">
            <div>
                <router-link
                    v-if="announcement.author"
                    :to="'/user-profile/' + announcement.author.id"
                    class="text-dark d-block icon rounded-circle"
                >
                    <img
                        class="icon rounded-circle"
                        :src="announcement.author.profilePictureSrc"
                    />
                </router-link>
                <img
                    v-else
                    class="icon rounded-circle"
                    :src="require('@/assets/sp-icon.png')"
                />
            </div>
            <div class="flex-grow-1">
                <div class="d-flex flex-wrap gap-1">
                    <h6 class="card-title mb-0 d-inline author-full-name">
                        {{
                            announcement.author
                                ? announcement.author.fullName
                                : 'Deleted user'
                        }}
                    </h6>
                    <small class="text-muted posted-at">
                        <span class="dot">•</span>
                        {{ announcement.posted_at }}
                        ago
                    </small>
                </div>
                <p
                    v-html="announcementTextWithLineBreaks"
                    class="card-text mt-1"
                ></p>
            </div>
            <div
                v-if="isAuthUserDemos"
                class="h-fit d-flex justify-content-end gap-1"
            >
                <AnnouncementEditButton :announcement="announcement" />
                <AnnouncementDeleteButton :announcementID="announcement.id" />
            </div>
        </div>
    </div>
</template>

<script>
import AnnouncementEditButton from '@/components/app/AnnouncementEditButton.vue';
import AnnouncementDeleteButton from '@/components/app/AnnouncementDeleteButton.vue';

import { isAuthUserDemos } from '@/services/authService';

export default {
    name: 'AnnouncementCard',
    components: {
        AnnouncementEditButton,
        AnnouncementDeleteButton,
    },
    props: {
        announcement: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        this.checkLine();
    },
    updated() {
        this.checkLine();
    },
    computed: {
        isAuthUserDemos() {
            return isAuthUserDemos();
        },
        announcementTextWithLineBreaks() {
            return this.announcement.text.replace(/\n/g, '<br>');
        },
    },
    methods: {
        checkLine() {
            const authorFullNames =
                document.getElementsByClassName('author-full-name');
            const postedAts = document.getElementsByClassName('posted-at');
            const dots = document.getElementsByClassName('dot');

            for (let i = 0; i < authorFullNames.length; i++) {
                const authorRect = authorFullNames[i].getBoundingClientRect();
                const postedAtRect = postedAts[i].getBoundingClientRect();

                if (authorRect.bottom <= postedAtRect.top) {
                    dots[i].classList.add('d-none');
                } else {
                    dots[i].classList.remove('d-none');
                }
            }
        },
    },
};
</script>

