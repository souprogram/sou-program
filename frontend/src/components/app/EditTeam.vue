<template>
    <div class="mb-2">
        <form @submit.prevent="updateTeam">
            <div class="card">
                <div class="row">
                    <div class="d-flex align-items-center text-start">
                        <div class="card-right card-body text-start">
                            <label for="name">Naziv tima</label>
                            <input
                                v-model="teamName"
                                class="form-control"
                                type="text"
                                placeholder="Team Name"
                                required
                                id="name"
                            />
                            <ul>
                                <li
                                    v-for="member in teamData.team_members"
                                    :key="member.id"
                                >
                                    <div class="team-user">
                                        <span>
                                            {{ member.username }}
                                        </span>
                                        <i
                                            class="material-icons close-icon"
                                            @click="removeMember(member.id)"
                                            >close</i
                                        >
                                    </div>
                                </li>
                            </ul>
                            <label for="name">Dodaj člana tima</label>
                            <select
                                v-model="selectedUserId"
                                class="form-control"
                            >
                                <option disabled value="">
                                    Odaberi člana tima
                                </option>
                                <option
                                    v-for="user in allUsers"
                                    :key="user.id"
                                    :value="user.id"
                                >
                                    {{ user.username }}
                                </option>
                            </select>
                            <button
                                class="btn btn-primary mt-2"
                                @click="addMember"
                            >
                                Dodaj
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button type="submit" class="btn btn-primary">
                        Uredi tim
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useStoreCompetition } from '@/stores/competition.store';
import { useUserStore } from '@/stores/user.store';

export default {
    name: 'EditTeam',
    props: {
        teamData: {
            type: Object,
            required: true,
        },
        closeEdit: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            storeCompetition: useStoreCompetition(),
            userStore: useUserStore(),
            teamName: this.teamData.name,
            selectedUserId: '', // To store the selected user's ID
            allUsers: [], // To store all the users
        };
    },
    async mounted() {
        this.allUsers = await this.userStore.fetchUser();
    },
    methods: {
        closeEdit() {
            this.closeEdit();
        },
        async updateTeam() {
            const updateData = {
                id: this.teamData.id,
                name: this.teamName,
            };

            if (this.teamName.trim() !== '') {
                await this.storeCompetition.updateTeam(updateData);
            }
        },
        async addMember() {
            if (this.selectedUserId) {
                try {
                    await this.storeCompetition.createMember({
                        team_id: this.teamData.id,
                        member_id: this.selectedUserId,
                    });
                } catch (error) {
                    console.error('Failed to create member:', error);
                }
                this.selectedUserId = '';
            }
        },
        async removeMember(memberId) {
            await this.storeCompetition.deleteMember(memberId);
        },
    },
};
</script>

<!-- Add your styles here -->
<style scoped>
.card {
    border: none;
    padding: 0;
    background-color: #f3f2f2;
    margin-top: 1vw;
}
.row {
    padding: 1vw;
}
.card-right {
    padding-left: 0;
}
.card-footer {
    padding: 0.7vw;
    background-color: #f3f2f2;
}
.team-user {
    margin-top: 0.5vw;
    display: flex;
    align-items: center;
}
.close-icon {
    cursor: pointer;
    color: #dc3545;
}
</style>
