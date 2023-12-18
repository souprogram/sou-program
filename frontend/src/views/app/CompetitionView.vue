<template>
    <div>
        <div class="card border-0">
            <div class="d-flex justify-content-between align-items-center">
                <h1>Natjecanja</h1>
                <button
                    v-if="isDemos"
                    class="btn btn-primary"
                    @click="openAddCompetition"
                >
                    Dodaj natjecanje
                </button>
            </div>
        </div>
        <div class="row">
            <div
                :class="'col' + (addCompetition || editCompetition ? '-6' : '')"
            >
                <show-competition
                    v-for="competition in competitions"
                    :key="competition.id"
                    :competitionData="competition"
                />
                <div
                    class="d-flex justify-content-center"
                    v-if="competitions.length === 0"
                >
                    <h1 class="mt-5">Nema natjecanja...</h1>
                </div>
            </div>
            <div class="col-6" v-if="addCompetition || editCompetition">
                <add-competition :closeAdd="closeAdd" v-if="addCompetition" />
                <edit-competition
                    :competitionID="editCompetitionID"
                    :closeEdit="closeEdit"
                    v-if="editCompetition"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { useStoreCompetition } from '@/stores/competition.store';
import eventBus from '@/eventBus';

import showCompetition from '@/components/app/ShowCompetition.vue';
import AddCompetition from '@/components/app/AddCompetition.vue';
import EditCompetition from '@/components/app/EditCompetition.vue';

import userTypeEnum from '@/enums/userTypeEnum';

export default {
    name: 'CompetitionView',
    data() {
        return {
            storeCompetition: useStoreCompetition(),
            isDemos: userTypeEnum.DEMOS === localStorage.getItem('type'),
            competitions: [],
            addCompetition: false,
            editCompetition: false,
            editCompetitionID: null,
        };
    },
    components: {
        showCompetition,
        AddCompetition,
        EditCompetition,
    },
    async created() {
        this.competitions = await this.storeCompetition.fetchCompetition();
        this.openEditCompetition();
    },
    methods: {
        closeAdd() {
            this.addCompetition = false;
        },
        closeEdit() {
            this.editCompetition = false;
        },
        rightColActiveCheck() {
            this.addCompetition = false;
            this.editCompetition = false;
        },
        openAddCompetition() {
            this.rightColActiveCheck();
            this.addCompetition = true;
        },
        openEditCompetition() {
            eventBus.on('editCompetition', (editObj) => {
                this.rightColActiveCheck();
                this.editCompetitionID = editObj.editCompetitionID;
                this.$nextTick(() => {
                    this.editCompetition = editObj.editCompetition;
                });
            });
        },
    },
};
</script>
