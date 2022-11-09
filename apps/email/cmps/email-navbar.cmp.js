export default{
    template:`
    <section @hover="addDelete" className="navbar-section">
        <button class="new-email-btn">New email</button>
        <h1 class="income">Income mail</h1>
        <h1 class="income">Sent</h1>
        <h1 class="income">Garbage</h1>
        <h1 class="income">Marked</h1>
        <h1 class="income">Drafts</h1>
    </section>
    `,
    computed: {
        addDelete(){
            
        }
    },
}