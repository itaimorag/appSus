import emailDetails from './email-details.cmp.js'
import { emailService } from '../services/email.service.js'

export default {
    props: ['email'],
    template: `
    <section @click="emailSelect(email)" :class="checkIfRead(email)" class="email-preview">
        <button v-if="!email.isStared" @click.stop="starEmail(true)"><i class="fa fa-star-o"></i></button>
        <button v-if="email.isStared" @click.stop="starEmail(false)"><i class="fa fa-star"></i></button>
            <p class="bolded">From: {{substringSender}}</p>
            <p class="bolded">To: {{substringReceiver}}</p>
        <p class="bold">{{ email.subject }}</p>
        <p class="body">{{ substringBody }}</p>
        <p >{{formattedSeenAt}}</p>
    </section>
    <email-details @removed="" @replied="reply" :email="selectedEmail" v-if="isEmailOpen" />
    `,
    data() {
        return {
            selectedEmail: null,
            isEmailOpen:false,
        }
    },
    methods: {
        emailSelect(email) {
            email.isRead = true
            this.selectedEmail = email
            this.isEmailOpen = !this.isEmailOpen
            emailService.save(email)
        },
        checkIfRead(email){
            if(!email.isRead) return 'unread'
            return 'read'
        },
        reply(from){
            console.log(from);
            this.$emit('replied', from)
        },
        starEmail(val){
            this.email.isStared = val
            emailService.save(this.email)
        }
    },
    computed: {
        substringSender() {
            console.log(this.email.from, );
            if(this.email.from === emailService.getLoggedInUser().email) return 'You'
            let string = this.email.from
            let split = string.split("@");
            let value = split[0];
            return value
        },
        substringReceiver() {
            console.log(this.email.to, );
            if(this.email.to === emailService.getLoggedInUser().email) return 'You'
            let string = this.email.to
            let split = string.split("@");
            let value = split[0];
            return value
        },
        formattedSeenAt() {
            let currDay = new Date().getDay()
            let seen = this.email.sentAt
            let datedFormat = new Date(seen)
            if (datedFormat.getDay() !== currDay) return datedFormat.getDay() + '/' + (datedFormat.getMonth() + 1)
            else return datedFormat.getHours() + ":" + datedFormat.getMinutes()

        },

        substringBody(){
            if(this.email.body.length >= 50)  return this.email.body.slice(0,50) + '...'
           else return this.email.body
        }
    },

    components: {
        emailDetails,

    },
}

