export default {
    props: ['note'],
    template: `
    <section class="note-template">
        <p>{{note.info.txt}}</p>
    </section>
`,
};