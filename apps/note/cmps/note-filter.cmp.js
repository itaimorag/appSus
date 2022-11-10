export default {
    template: `
        <section class="note-filter">
            <label class="text-filter">
                <button @click="filter" class="search-filter-button"><i class="fa fa-search"></i></button>
                <input v-model="filterBy.text" @input="filter"  type="text" placeholder="Search...">
            </label>
        </section>
    `,
    data() {
        return {
            filterBy: {
                text:'',
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', { ...this.filterBy })
        }
    }
}