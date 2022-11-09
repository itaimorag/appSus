export default {
    template: `
        <section class="note-filter">
            <label class="text-filter">
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