export default {
    template: `
        <section class="note-filter">
            <label class="text-filter">
                <button @click="filter" class="search-filter-button"><i class="fa fa-search"></i></button>
                <input v-model="filterBy.text" @input="filter"  type="text" placeholder="Search...">
            </label>
            <div class="Keep-filter-icon">
                <h2>Keep </h2>
                <img class="keep-filter-img" src="../imgs/keeps.png" />
            </div>
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