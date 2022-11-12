export default {
    props: ['note'],
    template: `
        <section class="note-template">
            <h2> {{ this.note.info.title }} </h2>
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