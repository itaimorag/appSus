import { emailService } from '../services/email.service.js'

import emailFilter from "../cmps/email-filter.cmp.js";
import emailNavbar from '../cmps/email-navbar.cmp.js'
import emailList from '../cmps/email-list.cmp.js'

export default {
    template: `
    <div className="flex">
        <email-navbar />
        <div className="flex-col debug" >
            <email-filter></email-filter>
            <email-list :emails="emails"></email-list>
        </div>
    </div>
    `,
    data(){
        return { 
           emails: null
        }
    },
    created(){
      emailService.query()
        .then(emails => {
            this.emails = emails
        })
    },
    methods: {
        
        },
       
    computed: {
       
    },
    components: {
    emailFilter,
    emailNavbar,
    emailList,

    
    }
}