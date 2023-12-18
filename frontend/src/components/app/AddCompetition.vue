<template>
    <div>
        <form @submit.prevent="postCompetition">
            <div class="card">
                <div class="row">
                    <h3 class="headline">Dodaj natjecanje</h3>

                    <div class="form-group">
                        <label for="name">Naziv natjecanja</label>
                        <input
                            v-model="newCompetitionName"
                            type="text"
                            class="form-control"
                            id="name"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="startDate">Početak natjecanja</label>
                        <input
                            v-model="newCompetitionStartDate"
                            type="date"
                            class="form-control"
                            id="startDate"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="description">Opis natjecanja</label>
                        <textarea
                            v-model="newCompetitionDescription"
                            class="form-control"
                            id="description"
                        ></textarea>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <a class="escape-btn btn btn-primary" @click="closeAdd">
                        Odustani
                    </a>
                    <button type="submit" class="btn btn-primary">Dodaj</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreCompetition } from '@/stores/competition.store'
import { ref } from 'vue'

export default {
    name: 'addCompetition',
    props: {
        closeAdd: {
            type: Function,
            required: true,
        },
    },
    setup() {
        const storeCompetition = useStoreCompetition()

        const newCompetitionName = ref('')
        const newCompetitionStartDate = ref('')
        const newCompetitionDescription = ref('')

        const postCompetition = async () => {
            const newCompetitionData = {
                name: newCompetitionName.value,
                start_date: newCompetitionStartDate.value,
                description: newCompetitionDescription.value,
            }
            await storeCompetition.createCompetition(newCompetitionData)
        }

        return {
            storeCompetition,
            postCompetition,
            newCompetitionName,
            newCompetitionStartDate,
            newCompetitionDescription,
        }
    },
    methods: {
        closeAdd() {
            this.closeAdd()
        },
    },
}
</script>

<style scoped>
.card {
    border: none;
    padding: 0;
    margin-top: 1vw;
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
    background-color: white;
}
.escape-btn {
    margin-right: 1vw;
}
</style>
