export default {
    props: ['note'],
    template: `
        <section class="note-template">
            <iframe width="100%" :src="videoSrcLink"></iframe>
        </section>
    `,
    methods: {},
    computed: {
        videoSrcLink() {
            return this.note.info.url
        }
    }
}