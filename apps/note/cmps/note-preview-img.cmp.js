export default {
    props: ['note'],
    template: `
    <section class="note-template">
      <h2>  {{ this.note.info.title }} </h2>
        <img class="note-img" :src="note.info.url">
    </section>
`,

};