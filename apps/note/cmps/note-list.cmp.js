import notePreview from './note-preview.cmp.js'
// import notePreviewNotpinned from './note-preview-notPinned.cmp.js'




export default {
    props: ['notes'],
    template: `
        <section class="note-list">
            <ul class="notes-list-ul">
                <li @mouseover="hover = true" @mouseleave="hover = false" v-for="note in notes" :key="note.id" class="note" :style="{backgroundColor:note.style.backgroundColor}">
                    <note-preview :note="note" :hover="hoverPos"/>           
                    <div class="action-note-container">
                        <section v-if="hover" class="actions-note-item">
                            <button @click="remove(note.id)"><i class="fa fa-trash-o"></i></button>
                            <div @click="pin(note)" class="pin-button">
                                <i class="fa fa-star-o" v-if="!note.isPinned"></i>
                                <span v-else>⭐</span>                       
                            </div>
                            <button @click="duplicate(note)"><i class="fa fa-clone"></i></button>
                            <label class="label-color-item">
                                <i class="fa fa-paint-brush"></i>
                                <input v-model="color" type="color" class="input-color-item" @input="changeColor(note.id)"/>                            
                            </label>
                        </section>
                    </div>
                </li>
            </ul>



        </section>
    `,
    data() {
        return {
            color: '#f16a81',
            hover: true,
        }
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        pin(note) {
            this.$emit('pin', note)
        },
        changeColor(noteId,) {
            this.$emit('changeColor', noteId, this.color)
        },
        duplicate(note) {
            this.$emit('duplicate', note)
        }
    },
    computed: {
        hoverPos(){
            this.hover
        }
    },
    components: {
        notePreview,
        // notePreviewNotpinned,
    }
}