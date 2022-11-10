export default {
    template: `
        <section className="book-filter">
            <input 
                @input="filter"
                v-model="filterBy.title" 
                type="text" 
                placeholder="Search">
                <input type="range" 
                @change="filter"
                v-model="filterBy.price" 
                min="0"
                max="200"
                name="" id="" />
                <span>Max price: {{filterBy.price}}</span>
                <router-link class="add-book-btn" to="/bookApp/add">Add new book</router-link>
            </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                price: 200,
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    }
}