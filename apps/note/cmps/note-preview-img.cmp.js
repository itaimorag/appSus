export default {
    props: ['note'],
    template: `
    <section class="note-template">
        <img class="note-img" :src="note.info.url">
    </section>
`,

};