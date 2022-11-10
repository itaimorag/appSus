export default {
    template: `
    <section @hover="addDelete" className="navbar-section">
        <button @click="renderNewEmail" class="new-email-btn"><i class="fa fa-pencil" style="font-size:18px"></i>New email</button>
        <button @click="changeCriteria('status', 'inbox')" class="income"><i class="fa fa-envelope-o"></i> Income mail</button>
        <button @click="changeCriteria('isStared', 'true')" class="income"><i class="fa fa-star-o"></i> Stared</button>
        <button @click="changeCriteria('status', 'sent')" class="income"> <i class="fa fa-send-o"></i> Sent</button>
        <button @click="changeCriteria('status', 'trash')" class="income"><i class="fa fa-trash-o"></i> Garbage </button>
        <button @click="changeCriteria('status', 'draft')" class="income"> <i class="fa fa-archive"> </i> Drafts</button>
    </section>
    `,
    data() {
        return {
            isNewEmail: false,
            criteria: {
                status: '',
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
        changeCriteria(key, val) {
            this.criteria = { [key]: val }
            this.$emit('filter', this.criteria)

        }

    },
    computed: {
        addDelete() {

        }
    },
}