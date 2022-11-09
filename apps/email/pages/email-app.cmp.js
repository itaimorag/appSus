import { emailService } from '../services/email.service.js'

import emailFilter from "../cmps/email-filter.cmp.js";
import emailAdd from "../cmps/email-add.cmp.js";
import emailNavbar from '../cmps/email-navbar.cmp.js'
import emailList from '../cmps/email-list.cmp.js'

export default {
    template: `
    <div className="flex">
        <email-navbar @newEmail="newEmailRender" />
        <div className="flex-col" >
            <email-filter @filter="setFilter" />
            <email-list v-if="emails" :emails="emailsToShow" />
        </div>
        <email-add v-if="isNewEmail" @closeMsg="closeEmail"/>
    </div>
    `,
    data(){
        return { 
           emails: null,
           filterBy: {},
           isNewEmail:false,
        }
    },
    created(){
      emailService.query()
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