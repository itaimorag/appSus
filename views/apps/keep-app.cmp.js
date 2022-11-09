export default {
    template: `
    <section class="car-app">
        <!-- <car-filter @filter="setFilter"/> -->
        <!-- <router-link to="/car/edit">Add a car</router-link> -->
        <!-- <car-list 
            @remove="removeCar" 
            :cars="carsToShow"/> -->
            <h1>hello</h1>
    </section>
    `,
    data(){
        return { 
            cars: [],
            filterBy: {
                vendor : '',
                minSpeed: 0
            },
        }
    },
    created(){
      
    },
    methods: {
        
        },
       
    computed: {
       
    },
    components: {
    
    }
}