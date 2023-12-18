div
<template>
    <div>
        <form @submit.prevent="editCompetition">
            <div class="card">
                <div class="row">
                    <h3 class="headline">Uredi natjecanje</h3>
                    <div class="form-group text-start">
                        <label for="name">Naziv natjecanja</label>
                        <input
                            v-model="newCompetitionName"
                            type="text"
                            class="form-control"
                            id="name"
                            required
                        />
                    </div>
                    <div class="form-group text-start">
                        <label for="startDate">Početak natjecanja</label>
                        <input
                            v-model="newCompetitionStartDate"
                            type="date"
                            class="form-control"
                            id="startDate"
                            required
                        />
                    </div>
                    <div class="form-group text-start">
                        <label for="description">Opis natjecanja</label>
                        <textarea
                            v-model="newCompetitionDescription"
                            class="form-control"
                            id="description"
                        ></textarea>
                    </div>
                    <div>
                        <add-team :competitionId="competitionID" />
                    </div>
                    <div v-for="team in competitionData.teams" :key="team.id">
                        <edit-team :teamData="team" />
                    </div>
                </div>
                <div class="card-footer text-end">
                    <a class="escape-btn btn btn-primary" @click="closeEdit"
                        >Odustani</a
                    >
                    <button type="submit" class="btn btn-primary">Uredi</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreCompetition } from '@/stores/competition.store';
import addTeam from './AddTeam.vue';
import editTeam from './EditTeam.vue';
import { ref } from 'vue';

export default {
    name: 'editCompetition',
    props: {
        competitionID: {
            type: Number,
            required: true,
        },
        closeEdit: {
            type: Function,
            required: true,
        },
    },
    components: {
        addTeam,
        editTeam,
    },
    setup(props) {
        const storeCompetition = useStoreCompetition();
        storeCompetition.fetchCompetition();

        const competitionID = props.competitionID;
        const competitionData =
            storeCompetition.getCompetitionById(competitionID);

        const newCompetitionName = ref(competitionData.name);
        const newCompetitionDescription = ref(competitionData.description);
        const newCompetitionStartDate = ref(
            competitionData.start_date.split('T')[0]
        );

        return {
            competitionID,
            storeCompetition,
            newCompetitionName,
            newCompetitionDescription,
            newCompetitionStartDate,
            competitionData,
        };
    },
    methods: {
        closeEdit() {
            this.closeEdit();
        },
        openEditTeam(teamId) {
            this.editingTeamId = teamId;
        },
        deleteTeam(teamId) {
            this.storeCompetition.deleteTeam(teamId);
        },
        async editCompetition() {
            const id = this.competitionData.id;

            const updateData = {
                id: id,
                name: this.newCompetitionName,
                description: this.newCompetitionDescription,
                start_date: this.newCompetitionStartDate,
            };

            await this.storeCompetition.updateCompetition(updateData);
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    padding: 0;
    margin-top: 1vw;
    background-color: #eaeaea;
}
.row {
    padding: 1vw;
}
.headline {
    margin-bottom: 1vw;
}
.form-group {
    margin-bottom: 1vw;
}
.card-footer {
    padding: 0.7vw;
    background-color: #eaeaea;
}
.escape-btn {
    margin-right: 1vw;
}
</style>
