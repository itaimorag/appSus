export default{
    template:`
    <section class="email-filter">
        <input
        @input="filter"
        v-model="filterBy.title"
         type="text" 
         placeholder="Search a mail" />
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