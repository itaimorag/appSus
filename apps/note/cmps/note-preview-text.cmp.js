export default {
    props: ['note'],
    template: `
    <section class="note-template">
        <h2>{{ note.info.txt }}</h2>
    </section>
`,

};