<template>
    <b-container fluid>
        <b-row v-if="this.summary">
            <b-col lg="4" class="mt-3 mb-3" v-for="(sum, name) in this.summary[0]" :key="name" >
                <b-card bg-variant="dark" text-variant="white"  class="text-center" :title="$t('statisticsTable.' + name)">
                    <b-card-text>{{ sum }}</b-card-text>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="6" class="mt-3 mb-3">
                    <b-input-group size="sm">
                        <b-form-input
                            id="filter-input"
                            v-model="filter"
                            type="search"
                            placeholder="Type to Search"
                        ></b-form-input>

                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
            </b-col>
        </b-row>
        <b-table
                 striped
                 hover
                 :items="this.statistics"
                 :fields="fields"
                 :filter="filter"
        >
        </b-table>
    </b-container>
</template>
<script>
import {mapGetters} from "vuex";

export default {
    name: 'statistics',
    data() {
        return {
            languages: ['ka', 'en'],
            filter: null,
            fields: [
                {
                    key: this.$root.$t('statisticsTable.name_lan'),
                    sortable: false,
                    label: this.$root.$t('statisticsTable.name'),
                },
                {
                    key: 'code',
                    label: this.$root.$t('statisticsTable.code'),
                },
                {
                    key: 'recovered',
                    sortable: true,
                    label: this.$root.$t('statisticsTable.recovered'),
                },
                {
                    key: 'death',
                    sortable: true,
                    label: this.$root.$t('statisticsTable.death'),
                },
                {
                    key: 'confirmed',
                    sortable: true,
                    label: this.$root.$t('statisticsTable.confirmed'),
                },
            ],
        }
    },
    computed: {
        ...mapGetters({
            statistics: 'Statistics/getStatistics',
            summary: 'Statistics/getSummary',
        }),
    },
    mounted() {
        this.$store.dispatch('Statistics/getStatisticsAction')
        this.$store.dispatch('Statistics/getSummaryAction')
    }
}
</script>
