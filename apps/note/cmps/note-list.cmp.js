export default {
    props:['cars'],
    template: `
        <section class="car-list">
            <ul>
                <li v-for="car in cars" :key="car.id">
                    <car-preview :car="car"/>
                    <section class="actions">
                        <!-- <button @click="showDetails(car)">Details</button> -->
                        <router-link :to="'/car/' + car.id">Details</router-link> |
                        <router-link :to="'/car/edit/' + car.id">Edit</router-link> |
                        <button @click="remove(car.id)">x</button>
                    </section>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(carId){
            this.$emit('remove', carId)
        },
    },
    components: {
        carPreview,
    }
}