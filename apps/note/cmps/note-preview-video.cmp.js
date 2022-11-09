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
            let url = 'https://www.youtube.com/embed/' + this.note.info.video
            return url
        }
    }
}