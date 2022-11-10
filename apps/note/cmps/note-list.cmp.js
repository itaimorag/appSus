import notePreview from './note-preview.cmp.js'
// import notePreviewNotpinned from './note-preview-notPinned.cmp.js'




export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul class="notes-list-ul">
                <li v-for="note in notes" :key="note.id" class="note" :style="{backgroundColor:note.style.backgroundColor}">
                    <note-preview :note="note" @pin="pin" @remove="remove" @changeColor="changeColor" @duplicate="duplicate"/>           
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        pin(note) {
            this.$emit('pin', note)
        },
        changeColor(noteId,color) {
            this.$emit('changeColor', noteId, color)
        },
        duplicate(note) {
            this.$emit('duplicate', note)
        }
    },
    computed: {
    },
    components: {
        notePreview,
    }
}