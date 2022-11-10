import { emailService } from "../services/email.service.js";

export default {
    props: ['from'],
    template: `
        <section className="add-email">
            <div className="new-email">
                <h3>New Email</h3>
            </div>
            <div className="to">
                <h4>To:  </h4>
                <h4 v-if="from">   {{from}}</h4>
                <input v-if="!from" v-model="writtenEmail.to" type="text" placeholder="example@gmail.com" />
            </div>
            <div className="subject">
               <h4>Subject:</h4>
                <input v-model="writtenEmail.subject" type="text" placeholder="Enter subject" />
            </div>
            <div className="content">
                <textarea v-model="writtenEmail.body" name="" id="" cols="30" 
                placeholder="Enter youre email content here" rows="10"></textarea>
            </div>
            <div className="buttons">
                <button class="line"><i class="fa fa-file-image-o" style="font-size:18px"></i></button>
                <button class="line"><i class="fa fa-file-excel-o" style="font-size:18px"></i></button>
                <button class="line"><i class="fa fa-image" style="font-size:18px"></i></button>
                <button @click="sendEmail"><i class="fa fa-send" style="font-size:24px"></i></button>
            </div>
                <button class="close-btn" @click="$emit('closeMsg')">X</button>

        </section>
    `,
    data() {
        return {
            writtenEmail: {
                to: '',
                subject: '',
                body: '',
                from: "user@appsus.com",
                sentAt: Date.now(),
                isRead: false
            }
        }
    },
    created() {
        // console.log(this.from);
    },
    methods: {
        sendEmail() {
            console.log(this.from);
            if (this.from) this.writtenEmail.to = this.from
            emailService.save(this.writtenEmail)
            console.log(this.writtenEmail);
            this.$emit('closeMsg')
        }

    },
}