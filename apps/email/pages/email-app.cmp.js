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
            <email-list @reRender="renderQuery" v-if="emails" :emails="emailsToShow" />
        </div>
        <email-add v-if="isNewEmail" @closeMsg="closeEmail"/>
    </div>
    `,
    data(){
        return { 
           emails: null,
           filterBy: {},
           isNewEmail:false,
           criteria: {
            status: 'inbox',
            // txt: '', // no need to support complex text search
            isRead: null, 
            isStared: null, 
            lables: [] 
           }
        }
    },
    created(){
      emailService.query(this.criteria)
        .then(emails => {
            this.emails = emails
        })
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        newEmailRender(val){
            console.log(val);
            this.isNewEmail = true;
        },
        closeEmail(){
            this.isNewEmail = false
        },
        filterCreteria(criteria){
            this.criteria = criteria
            console.log(this.criteria);
            emailService.query(this.criteria)
            .then(emails => {
                this.emails = emails
            })
        },
        renderQuery(){
            console.log(this.criteria);
            emailService.query(this.criteria)
            .then(emails => {
                this.emails = emails
            })
        }
        },
       
    computed: {
        emailsToShow() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.emails.filter(email => (regex.test(email.subject)|| regex.test(email.from) || regex.test(email.body)))
        },
    },
    components: {
    emailFilter,
    emailNavbar,
    emailList,
    emailAdd

    
    }
}