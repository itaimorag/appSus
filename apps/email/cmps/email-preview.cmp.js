import emailDetails from './email-details.cmp.js'
import { emailService } from '../services/email.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js';

export default {
    emits:['replied', 'removed', 'drafted'],
    props: ['email'],
    template: `
    <section @mouseleave="mouseOver(email, false)" @mouseover="mouseOver(email, true)" @click="emailSelect(email)" :class="checkIfRead(email)" class="email-preview">
        <div v-if="!email.isStared" @click.stop="starEmail(true)"><i class="fa fa-star-o"></i></div>
        <div v-if="email.isStared" @click.stop="starEmail(false)"><i class="fa fa-star"></i></div>
            <p class="bolded">{{substringSender}}</p>
            <p class="bolded">To: {{substringReceiver}}</p>
        <p class="bold">{{ email.subject }}</p>
        <p class="body">{{ substringBody }}</p>
        <div v-if="email.isHovered && !email.isRead"  @click.stop="changeIsRead(email, true)"><i class="fa fa-envelope-o"></i></div>
        <div v-if="email.isHovered && email.isRead"  @click.stop="changeIsRead(email, false)"><i class="fa fa-envelope-open-o"></i></div>
        <div v-if="email.isHovered" @click.stop="draftEmail(email, true)"><i class="fa fa-archive"></i></div>
        <div v-if="email.isHovered" @click.stop="trashEmail(email)"><i class="fa fa-trash"></i></div>
        <p v-if="!email.isHovered">{{formattedSentAt}}</p>
    </section>
    <email-details @removed="removed" @replied="reply" :email="selectedEmail" v-if="isEmailOpen" />
    `,
    data() {
        return {
            selectedEmail: null,
            isEmailOpen: false,

        }
    },
    methods: {
        changeIsRead(email, val){
            email.isRead = val
        },
        mouseOver(email, val){
            email.isHovered = val
        },
        draftEmail(email, val) {
            email.isDraft = val
            emailService.save(email)
            showSuccessMsg('Email sent to draft')
            this.$emit('drafted', email.id)
        },
        emailSelect(email) {
            email.isRead = true
            this.selectedEmail = email
            this.isEmailOpen = !this.isEmailOpen
            emailService.save(email)
        },
        checkIfRead(email) {
            if (!email.isRead) return 'unread'
            return 'read'
        },
        reply(from) {
            this.$emit('replied', from)
        },
        starEmail(val) {
            this.email.isStared = val
            emailService.save(this.email)
            if(val)   showSuccessMsg('Email Stared')
            else    showSuccessMsg('Email Unstared')
         
        },
        removed(emaiId){
            this.$emit('removed', emaiId)
        },
        trashEmail(email) {
            if (email.status !== 'trash') {
                email.status = 'trash'
                emailService.save(email)
                this.$emit('removed', email.id)
                showSuccessMsg('Email moved to trash')
            }
            else {
                confirm('Are you sure you want to delete?')
                emailService.remove(email.id)
                this.$emit('removed', email.id)
                showSuccessMsg('Email removed premanently')
            }
        },
    },
    computed: {
        substringSender() {
            if (this.email.from === emailService.getLoggedInUser().email) return 'You'
            let string = this.email.from
            let split = string.split("@");
            let value = split[0];
            return value
        },
        substringReceiver() {
            if (this.email.to === emailService.getLoggedInUser().email) return 'You'
            let string = this.email.to
            let split = string.split("@");
            let value = split[0];
            return value
        },
        formattedSentAt() {
            let currDay = new Date().getDay()
            let currMonth = new Date().getMonth()
            let seen = this.email.sentAt
            let datedFormat = new Date(seen)
            if (datedFormat.getDay() === currDay && datedFormat.getMonth() === currMonth) return datedFormat.getHours() + ":" + datedFormat.getMinutes()

            else  return datedFormat.getDay() + '/' + (datedFormat.getMonth() + 1)

        },

        substringBody() {
            if (this.email.body.length >= 50) return this.email.body.slice(0, 50) + '...'
            else return this.email.body
        }
    },

    components: {
        emailDetails,

    },
}

