import notePreview from './note-preview.cmp.js'




export default {
    props:['notes'],
    template: `
        <section class="note-list">
            <ul class="notes-list-ul">
                <li v-for="note in notes" :key="note.id" class="note">
                    <note-preview :note="note"/>
                    <section class="actions-note-item">
                       
                        <button @click="remove(note.id)">x</button>
                        <button @click="pin(note.id)">🧷</button>
                        <label class="label-color-item">
                            <input type="color" class="input-color-item"/>
                            
                        </label>
                    </section>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(noteId){
            this.$emit('remove', noteId)
        },
        pin(noteId){
            this.$emit('pin', noteId)
        },
    },
    components: {
        notePreview,
    }
}