import { emailService } from '../services/email.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js';


export default {
    props: ['email'],
    emits:['replied'],
    template: `
    <section className="details-section">
        <div className="subject">
            <h2>{{email.subject}}</h2>
            <div className="btns">
                <button @click="reply"><i class="fa fa-mail-reply" style="font-size:24px"></i></button>
                <button @click="trashEmail(email)"><i class="fa fa-trash-o" style="font-size:28px"></i></button>
            </div>
        </div>
        <div className="body">
            <h4>{{ email.body }}</h4>
        </div>
        <div className="from">
            <p> From: {{ email.from }}</p>
        </div>
    </section>
    `,
    methods: {
        trashEmail(email) {
            if (email.status) {
                emailService.remove(email.id)
                .then(email=>{
                    this.$emit('removed', email.id)
                })
                
            }
            else email.status = 'trash'
            showSuccessMsg('Item removed')
            emailService.save(email)
            // this.$emit('reRender')
        },
        reply(){
            this.$emit('replied', this.email.from)
        }
    },
}