import { emailService } from '../services/email.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js';


export default {
    props: ['email'],
    emits: ['replied'],
    template: `
    <section className="details-section">
        <div className="subject">
            <h2>{{email.subject}}</h2>
            <div className="btns">
                <button @click="transferData"><i class="fa fa-sticky-note-o" style="font-size:24px"></i></button>
                <button @click="reply"><i class="fa fa-mail-reply" style="font-size:24px"></i></button>
                <button @click="trashEmail(email)"><i class="fa fa-trash-o" style="font-size:28px"></i></button>
            </div>
        </div>
        <div className="body">
            <h4>{{ email.body }}</h4>
        </div>
        <div className="time">
            <p> Sent at: {{ formattedTime }}</p>
        </div>
        <div className="from">
            <p> From: {{ email.from }}</p>
        </div>
    </section>
    `,
    methods: {
        trashEmail(email) {
            if (email.status !== 'trash') {
                email.status = 'trash'
                emailService.save(email)
                this.$emit('removed', email.id)
            }
            else {
                confirm('Are you sure you want to delete?')
                emailService.remove(email.id)
                this.$emit('removed', email.id)
                showSuccessMsg('Item removed')
            }
        },
        transferData(){
            const { body , subject } = this.email
            const note = {body, subject}
            const stringify = JSON.stringify(note)
             this.$router.push("/noteApp/" + stringify)   
        },

        reply() {
            this.$emit('replied', this.email.from)
        }
    },
    computed: {
        formattedTime(){
            console.log('hi');
           return new Date(this.email.sentAt)
        },

    },

}