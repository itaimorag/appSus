import { emailService } from "../services/email.service.js";
import { showSuccessMsg } from '../../../services/event-bus.service.js';



export default {
    props: ['from', 'noteEmail'],
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

            <label for="files"><i class="fa fa-image" style="font-size:18px"></i>
            <input type="file" id="files" class="hidden"/>
            </label>
            <label for="files"><i class="fa fa-file-excel-o" style="font-size:18px"></i>
            <input type="file" id="files" class="hidden"/>
            </label>
                <button @click="sendEmail"><i class="fa fa-send send-btn" style="font-size:24px"></i></button>
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
        if (this.noteEmail) {
            if (this.noteEmail.subject) this.writtenEmail.subject = this.noteEmail.subject
            this.writtenEmail.body = this.noteEmail.body
            this.$router.push('/emailApp')
        }

    },
    methods: {
        sendEmail() {
            if (this.noteEmail.id) this.noteEmail.id = this.writtenEmail.id
            if (this.from) this.writtenEmail.to = this.from
            emailService.save(this.writtenEmail)
            showSuccessMsg('Your email was sent')
            this.$emit('closeMsg')
        },
        openEmojis() {
            const button = document.querySelector('.emoji-button');
            const picker = new EmojiButton()
            picker.togglePicker(button)
        }

    },
}