export default {
    template: `
    <section @hover="addDelete" className="navbar-section">
        <button @click="renderNewEmail" class="new-email-btn">New email</button>
        <button @click="changeCriteria('status', 'inbox')" class="income">Income mail</button>
        <button @click="changeCriteria('status', 'sent')" class="income">Sent <i class="fa fa-send-o"></i></button>
        <button @click="changeCriteria('status', 'trash')" class="income">Garbage <i class="fa fa-trash-o"></i></button>
        <button class="income">Marked <i class="fa fa-bookmark-o"></i></button>
        <button @click="changeCriteria('status', 'draft')" class="income">Drafts <i class="fa fa-archive"></i></button>
    </section>
    `,
    data() {
        return {
            isNewEmail: false,
            criteria: {
                status: '',
                // txt: '', // no need to support complex text search
                isRead: null, 
                isStared: null, 
                lables: [] 
               }
        }
    },
    methods: {
        renderNewEmail() {
            this.$emit('newEmail', true)
        },
        changeCriteria(key,val){
            this.criteria = {[key]:val}
            this.$emit('filter', this.criteria)
            console.log(this.criteria);

        }

    },
    computed: {
        addDelete() {

        }
    },
}