import emailPreview from './email-preview.cmp.js'


export default {
    emits:['replied', 'removed', 'drafted'],
    props: ['emails'],
    template: `
<section class="email-list">
    <ul>
        <li v-for="email in emails" :key="email.id">
            <email-preview @drafted="drafted" @removed="removed" @Replied="reply" :email="email"></email-preview>
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
        reply(from){
            this.$emit('replied', from)
        },
        removed(emailId){
            this.$emit('removed', emailId)
        },
        drafted(emailId){
            this.$emit('drafted', emailId)
        }
    },
    components: {
        emailPreview,
    },
}