<template>
    <div>
        <div class="card">
            <div class="row">
                <div class="competition-info">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h5 class="competition-name">
                                {{ competitionData.name }} -
                                {{
                                    dateService.formatDate_(
                                        competitionData.start_date
                                    )
                                }}
                            </h5>
                            <p class="card-text">
                                {{ competitionData.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="mt-0 mb-0" />
            <div class="teams-section row mb-2">
                <div v-if="competitionData.teams.length > 0">
                    <div
                        class="flex mt-2"
                        v-for="team in competitionData.teams"
                        :key="team.id"
                    >
                        <div class="me-2">{{ team.name }}:</div>
                        <div
                            v-if="team.team_members.length > 0"
                            class="team-members"
                        >
                            <span
                                v-for="member in team.team_members"
                                :key="member.id"
                                class="bg-blue"
                            >
                                {{ member.username }}
                            </span>
                        </div>
                        <div v-else class="no-members text-muted">
                            Nema članova tima...
                        </div>
                    </div>
                </div>
                <p v-else class="text-muted mt-1">Nema timova...</p>
            </div>
            <div v-if="isDemos" class="card-footer p-2 text-end">
                <button
                    @click="deleteCompetition(competitionData.id)"
                    class="delete-btn btn btn-primary"
                >
                    Izbriši
                </button>
                <button
                    class="edit-btn btn btn-primary"
                    @click="openEditCompetition"
                >
                    Uredi
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useStoreCompetition } from '@/stores/competition.store';
import editCompetition from './EditCompetition.vue';
import eventBus from '@/eventBus';

import dateService from '@/services/dateService';
import userTypeEnum from '@/enums/userTypeEnum';

export default {
    name: 'showCompetition',
    data() {
        return {
            isDemos: userTypeEnum.DEMOS === localStorage.getItem('type'),
            editingTeamId: null,
        };
    },
    components: {
        editCompetition,
    },
    props: {
        competitionData: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const storeCompetition = useStoreCompetition();
        return { storeCompetition };
    },
    computed: {
        editingTeamData() {
            return (
                this.competitionData.teams.find(
                    (team) => team.id === this.editingTeamId
                ) || null
            );
        },
    },
    methods: {
        async deleteCompetition(idCompetition) {
            const isConfirmed = window.confirm(
                'Jeste li sigurni da želite izbrisati natjecanje?'
            );

            if (isConfirmed) {
                await this.storeCompetition.deleteCompetition(idCompetition);
            }
        },
        openEditCompetition() {
            const editCompetition = true;
            const editCompetitionID = this.competitionData.id;
            const editObj = {
                editCompetition,
                editCompetitionID,
            };
            eventBus.emit('editCompetition', editObj);
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    margin-top: 1vw;
}
.row {
    display: flex;
    padding: 2vw;
    align-items: center;
}
.competition-info {
    width: 100%;
}
.competition-name {
    text-align: left;
    color: #212529;
}
.delete-btn {
    margin-right: 1vw;
}
.bg-blue {
    background-color: #d2e7ff;
    padding: 0.3em 0.6em;
    border-radius: 99px;
    line-height: 1.3;
}
.team-members {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.no-members {
    flex: 2;
}
.card-footer {
    padding: 0.7vw;
    background-color: white;
}
</style>
