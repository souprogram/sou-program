import { defineStore } from 'pinia'
import backendApiService from '@/services/backendApiService'

export const useStoreCompetition = defineStore('storeCompetition', {
    state: () => ({
        competition: [],
    }),
    getters: {
        getCompetitionById: (state) => (id) => {
            return state.competition.find(
                (competition) => competition.id === id
            )
        },
        getTeamById: (state) => (id) => {
            for (const competition of state.competition) {
                const foundTeam = competition.teams.find(
                    (team) => team.id === id
                )
                if (foundTeam) {
                    return foundTeam
                }
            }
            return null
        },
    },
    actions: {
        async fetchCompetition() {
            const res = await backendApiService.get({
                url: '/competition',
            })

            if (!res.ok) {
                window.location.href = '/error'
                return
            }

            const resObj = await res.json()
            this.competition = resObj.data

            return resObj.data
        },
        async deleteCompetition(idCompetition) {
            const res = await backendApiService.delete({
                url: `/competition/${idCompetition}`,
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
        async createCompetition(competitionData) {
            const res = await backendApiService.post({
                url: '/competition',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(competitionData),
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
        async updateCompetition(updateData) {
            const res = await backendApiService.patch({
                url: '/competition',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData),
            })

            if (!res.ok) {
                window.location.href = '/error'
                return
            }
            window.location.href = '/success'
        },
        async updateTeam(updateData) {
            const res = await backendApiService.patch({
                url: `/competition/team/${updateData.id}`,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: updateData.name }),
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
        async createTeam(teamData) {
            const res = await backendApiService.post({
                url: '/competition/team',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teamData),
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
        async deleteTeam(teamId) {
            const res = await backendApiService.delete({
                url: `/competition/team/${teamId}`,
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
        async deleteMember(memberId) {
            const res = await backendApiService.delete({
                url: `/competition/team/member/${memberId}`,
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
        async createMember(memberData) {
            const res = await backendApiService.post({
                url: `/competition/team/member`,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(memberData),
            })

            window.location.href = res.ok ? '/success' : '/error'
        },
    },
})
