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
        <email-add :noteEmail="getnoteEmail" :from="from" v-if="isNewEmail" @closeMsg="closeEmail"/>
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
            },
            noteEmail:null
        }
    },
    created() {
        emailService.query(this.criteria)
            .then(emails => {
                this.emails = emails
            })
            
        if (this.$route.params.obj){
            this.loadEmail()    
            this.isNewEmail=true
        }
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
      },
      loadEmail() {
        console.log("loading");
        console.log(this.$route.params.obj);
        const email = JSON.parse(this.$route.params.obj);
        console.log(email);
        switch(email.type) {
            case 'text':
                var newEmail ={body:email.text}
              break;
            case 'todos':
                var newEmail ={subject:email.text,body:email.todos.txt} 
              break;
              case 'imgVideo':
                var newEmail ={subject:email.text,body:email.url} 
                break;
          }
          
          this.noteEmail=newEmail
          console.log(`this.noteEmail = `, this.noteEmail)
    },
    },

    computed: {
        emailsToShow() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.emails.filter(email => (regex.test(email.subject) || regex.test(email.from) || regex.test(email.body)))
        },
        getnoteEmail(){
            console.log(`foo = `, this.noteEmail)
            return this.noteEmail
        }
    },
    components: {
        emailFilter,
        emailNavbar,
        emailList,
        emailAdd


    }
}