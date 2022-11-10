import { emailService } from '../services/email.service.js'

import emailFilter from "../cmps/email-filter.cmp.js";
import emailAdd from "../cmps/email-add.cmp.js";
import emailNavbar from '../cmps/email-navbar.cmp.js'
import emailList from '../cmps/email-list.cmp.js'

export default {
    template: `
    <div className="flex">
        <email-navbar @filter="filterCreteria" @newEmail="newEmailRender" />
        <div className="flex-col" >
            <email-filter @filter="setFilter" />
            <email-list @drafted="drafted" @removed="removed" @replied="reply" v-if="emails" :emails="emailsToShow" />
        </div>
        <email-add :from="from" v-if="isNewEmail" @closeMsg="closeEmail"/>
    </div>
    `,
    data() {
        return {
            emails: null,
            filterBy: {},
            from: null,
            isNewEmail: false,
            criteria: {
                status: 'inbox',
                // txt: '', // no need to support complex text search
                isRead: null,
                isStared: null,
                lables: []
            }
        }
    },
    created() {
        emailService.query(this.criteria)
            .then(emails => {
                this.emails = emails
            })
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        newEmailRender(val) {
            console.log(val);
            this.isNewEmail = true;
        },
        reply(from) {
            console.log(from);
            this.isNewEmail = true;
            this.from = from
        },
        closeEmail() {
            this.isNewEmail = false
            this.from = null
        },
        filterCreteria(criteria) {
            this.criteria = criteria
            emailService.query(this.criteria)
                .then(emails => {
                    this.emails = emails
                })
        },
        renderQuery() {
            emailService.query(this.criteria)
                .then(emails => {
                    this.emails = emails
                })
        },
        removed(emailId){
            console.log(emailId);
           const idx =  this.emails.findIndex(email => email.id === emailId)
           this.emails.splice(idx,1)
        },
      drafted(emailId){
        const idx =  this.emails.findIndex(email => email.id === emailId)
        this.emails.splice(idx,1)
      }
    },

    computed: {
        emailsToShow() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.emails.filter(email => (regex.test(email.subject) || regex.test(email.from) || regex.test(email.body)))
        },
    },
    components: {
        emailFilter,
        emailNavbar,
        emailList,
        emailAdd


    }
}