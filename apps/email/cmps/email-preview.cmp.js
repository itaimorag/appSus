import emailDetails from './email-details.cmp.js'

export default {
    props: ['email'],
    template: `
    <section @click="emailSelect(email)" class="email-preview">
            <p class="bolded">{{substringSender}}</p>
        <p class="bold">{{ email.subject }}</p>
        <p>{{ email.body}}</p>
        <p >{{formattedSeenAt}}</p>
    </section>
    <email-details :email="selectedEmail" v-if="isEmailOpen" />
    `,
    data() {
        return {
            selectedEmail: null,
            isEmailOpen:false,
        }
    },
    methods: {
        emailSelect(email) {
            console.log(email);
            this.selectedEmail = email
            this.isEmailOpen = !this.isEmailOpen
        },
    },
    computed: {
        substringSender() {
            let string = this.email.from
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
    },

    components: {
        emailDetails,

    },
}

