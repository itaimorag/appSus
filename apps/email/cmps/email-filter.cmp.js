export default{
    template:`
    <section class="email-filter">
        <input
        @input="filter"
        v-model="filterBy.title"
         type="text" 
         placeholder=" &#xF002; Search a mail" />
    </section>
    `,
        data() {
            return {
                filterBy: {
                    title: '',
                }
            }
        },
        methods: {
            filter() {
                this.$emit('filter', this.filterBy)
            }
        }
}