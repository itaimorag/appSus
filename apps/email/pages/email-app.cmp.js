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
            <email-list @openDraft="openDraft" @drafted="drafted" @removed="removed" @replied="reply" v-if="emails" :emails="emailsToShow" />
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
        openDraft(email){
            this.isNewEmail = true;
            this.noteEmail = email
            console.log(email);
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        newEmailRender(val) {
            this.isNewEmail = true;
        },
        reply(from) {
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
           const idx =  this.emails.findIndex(email => email.id === emailId)
           this.emails.splice(idx,1)
        },
      drafted(emailId){
        const idx =  this.emails.findIndex(email => email.id === emailId)
        this.emails.splice(idx,1)
      },
      loadEmail() {
        const email = JSON.parse(this.$route.params.obj);
        switch(email.type) {
            case 'text':
                if(email.text.includes(':')){
                    var idxDots=email.text.split('').findIndex((letter) => letter === ':')
                    var emailSubject=email.text.substring(0,idxDots)
                    var emailBody=email.text.substring(idxDots+1,email.text.length)
                    var newEmail ={body:emailBody,subject:emailSubject}
                }
                else var newEmail ={body:email.text}
              break;
            case 'todos':
                var todoList='todos : '
                for(var i=0;i<email.todos.length;i++){
                    if(i===email.todos.length-1) todoList+=email.todos[i].txt+'.'
                    else todoList+=email.todos[i].txt+', '
                }
                var newEmail ={subject:email.text,body:todoList} 
              break;
              case 'imgVideo':
                var newEmail ={subject:email.text,body:email.url.replaceAll('*','/')} 
                break;
          }
          this.noteEmail=newEmail
    },
    },

    computed: {
        emailsToShow() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.emails.filter(email => (regex.test(email.subject) || regex.test(email.from) || regex.test(email.body)))
        },
        getnoteEmail(){
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