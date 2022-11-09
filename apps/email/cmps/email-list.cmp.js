import emailPreview from './email-preview.cmp.js'


export default {
    props: ['emails'],
    template: `
<section class="email-list">
    <ul>
        <li v-for="email in emails" :key="email.id">
            <email-preview @renderMsg="onRenderMsg" :email="email"></email-preview>
        </li>
    </ul>
</section>
`,
    data() {
        return {
            isOpenEmail: false,
        }
    },
    methods: {
        onRenderMsg(email){
            this.selectedEmail = email
            console.log(email);
        },
    },
    components: {
        emailPreview,
    },
}