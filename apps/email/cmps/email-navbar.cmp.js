export default{
    template:`
    <section @hover="addDelete" className="navbar-section">
        <button @click="renderNewEmail" class="new-email-btn">New email</button>
        <button class="income">Income mail</button>
        <button class="income">Sent</button>
        <button class="income">Garbage</button>
        <button class="income">Marked</button>
        <button class="income">Drafts</button>
    </section>
    `,
    data(){
        return{
            isNewEmail:false,
        }
    },
    methods:{
        renderNewEmail(){
            this.$emit('newEmail', true)
        }
    },
    computed: {
        addDelete(){
            
        }
    },
}