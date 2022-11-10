import emailPreview from './email-preview.cmp.js'


export default {
    emits:['replied'],
    props: ['emails'],
    template: `
<section class="email-list">
    <ul>
        <li v-for="email in emails" :key="email.id">
            <email-preview @Replied="reply" :email="email"></email-preview>
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
        }
    },
    components: {
        emailPreview,
    },
}