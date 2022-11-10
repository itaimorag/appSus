export default {
    props: ['note'],
    template: `
    <section class="note-template">
    <audio :controls>
    <source class="note-audio" :src="note.info.src" :type="audio/mpeg">
    </audio>
    </section>
`,

};