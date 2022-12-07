<template>
    <b-container fluid>
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
        <b-modal id="add_car" title="ახალი მანქანა" centered
                 no-close-on-backdrop>

            <div>
                    <b-form-group
                        label-cols-lg="3"
                        @submit="addCar"
                        class="mb-0"
                    >
                        <b-form-group
                            label="მანქანის მოდელი"
                            label-for="nested-model"
                            label-cols-sm="12"
                            label-align-sm="right"
                        >
                            <b-form-input v-model="model" id="nested-name"></b-form-input>
                        </b-form-group>

                        <b-form-group
                            label="მანქანის ნომერი:"
                            label-for="plate_number"
                            label-cols-sm="12"
                            label-align-sm="right"
                        >
                            <b-form-input v-model="plate_number" id="nested-id"></b-form-input>
                        </b-form-group>

                        <b-form-group
                            label="ფასი"
                            label-for="nested-price"
                            label-cols-sm="12"
                            label-align-sm="right"
                        >
                            <b-form-input v-model="price" id="nested-price"></b-form-input>
                        </b-form-group>

                        <b-form-group
                            label="მეპატრონე"
                            label-for="nested-phone"
                            label-cols-sm="12"
                            label-align-sm="right"

                        >
                            <b-form-select v-model="car_owner">
                                <b-form-select-option v-for="(client, index) in this.owners" :value="client.id">
                                    {{ client.full_name }} </b-form-select-option>

                            </b-form-select>
                        </b-form-group>

                    </b-form-group>
            </div>
            <template #modal-footer="{ ok }">
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button size="sm" variant="success" @click="addCar()">
                    დამატება
                </b-button>
            </template>
        </b-modal>
        <b-modal id="add_owner" title="ახალი მომხმარებელი" centered
                 no-close-on-backdrop>

            <div>
                <b-card bg-variant="light">
                    <b-form-group
                        label-cols-lg="3"
                        @submit="addOwner()"
                        class="mb-0"
                    >
                        <b-form-group
                            label="სახელი და გვარი:"
                            label-for="nested-name"
                            label-cols-sm="12"
                            label-align-sm="right"
                        >
                            <b-form-input v-model="name" id="nested-name"></b-form-input>
                        </b-form-group>

                        <b-form-group
                            label="პირადი ნომერი:"
                            label-for="nested-id"
                            label-cols-sm="12"
                            label-align-sm="right"
                        >
                            <b-form-input v-model="ID" id="nested-id"></b-form-input>
                        </b-form-group>

                        <b-form-group
                            label="ელექტრონული ფოსტა"
                            label-for="nested-mail"
                            label-cols-sm="12"
                            label-align-sm="right"
                        >
                            <b-form-input v-model="mail" id="nested-mail"></b-form-input>
                        </b-form-group>

                        <b-form-group
                            label="ტელეფონის ნომერი:"
                            label-for="nested-phone"
                            label-cols-sm="12"
                            label-align-sm="right"

                        >
                            <b-form-input v-model="phone" id="nested-phone"></b-form-input>
                        </b-form-group>

                        <b-form-group
                            label="რეიტინგი:"
                            label-cols-sm="12"
                            label-align-sm="right"
                            class="mb-0"
                            v-slot="{ ariaDescribedby }"
                        >
                            <b-form-radio-group
                                class="pt-2"
                                v-model="rate"
                                :options="['კარგი', 'ცუდი', 'ბოროტი']"
                                :aria-describedby="ariaDescribedby"
                            ></b-form-radio-group>
                        </b-form-group>

                    </b-form-group>
                </b-card>
            </div>
            <template #modal-footer="{ ok }">
                <!-- Emulate built in modal footer ok and cancel button actions -->
                <b-button size="sm" variant="success" @click="addOwner()">
                    დამატება
                </b-button>
            </template>
        </b-modal>
    </b-container>
</template>
<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
    name: 'statistics',
    data() {
        return {
            filter: null,
            fields: [
                {
                    key: 'model',
                    sortable: false,
                    label: 'model',
                },
                {
                    key: 'phone_number',
                    sortable: false,
                    label: 'Phone Number',
                },
                {
                    key: 'plate_number',
                    sortable: false,
                    label: 'Plate Number',
                },
                {
                    key: 'personal_number',
                    sortable: false,
                    label: 'Personal Number',
                },
                {
                    key: 'mail',
                    sortable: false,
                    label: 'Mail',
                },
                {
                    key: 'price',
                    sortable: true,
                    label: 'Price',
                },
            ],
            name: null,
            ID: null,
            phone: null,
            mail: null,
            rate: null,
            price: null,
            plate_number: null,
            model: null,
            car_owner: null,
        }
    },
    methods: {
         addOwner() {
             const self = this
             axios.post(process.env.VUE_APP_API_URL + "/api/add_owner", {
                 'ID' : self.ID,
                 'phone' : self.phone,
                 'mail' : self.mail,
                 'rate' : self.rate,
                 'name' : self.name

             })
             this.$bvModal.hide('add_owner')
             this.$store.dispatch('Statistics/getOwnersAction')
         },
        addCar() {
            const self = this
            axios.post(process.env.VUE_APP_API_URL + "/api/add_car", {
                'car_owner' : self.car_owner,
                'model' : self.model,
                'plate_number' : self.plate_number,
                'price' : self.price

            })
            this.$bvModal.hide('add_car')
            this.$store.dispatch('Statistics/getStatisticsAction')
        }

    },
    computed: {
        ...mapGetters({
            statistics: 'Statistics/getStatistics',
            summary: 'Statistics/getSummary',
            owners: 'Statistics/getOwners',
        }),
    },
    mounted() {
        this.$store.dispatch('Statistics/getStatisticsAction')
        this.$store.dispatch('Statistics/getOwnersAction')
    }
}
</script>
