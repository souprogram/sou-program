<template>
    <div>
        <form @submit.prevent="createTeam(competitionId)">
            <label>Dodaj tim</label>
            <input
                v-model="newTeamName"
                class="form-control"
                type="text"
                placeholder="Upiši naziv tima..."
                required
            />
            <button type="submit" class="btn btn-primary mt-2 mb-2">
                Dodaj
            </button>
        </form>
    </div>
</template>

<script>
import { useStoreCompetition } from '@/stores/competition.store'

export default {
    name: 'addTeam',
    props: {
        competitionId: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const storeCompetition = useStoreCompetition()

        return {
            competitionId: props.competitionId,
            newTeamName: '',
            storeCompetition,
        }
    },
    methods: {
        async createTeam(competitionId) {
            const teamData = {
                name: this.newTeamName,
                competition_id: competitionId,
            }

            await this.storeCompetition.createTeam(teamData)
            this.newTeamName = ''
        },
    },
}
</script>
