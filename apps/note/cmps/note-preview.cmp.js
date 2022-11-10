import noteTxt from './note-preview-text.cmp.js'
import noteImg from './note-preview-img.cmp.js'
import noteTodos from './note-preview-todos.cmp.js'
import noteVideo from './note-preview-video.cmp.js'


export default {
    props: ['note'],
    template: `
        <section @mouseover="hover = true" @mouseleave="hover = false" class="note-preview">     
                        <component :is="note.type"
                            :class="note.type"
                            :note="note"
                            >
                        </component>   
                        <div class="action-note-container" >
                        <section v-if="hover" class="actions-note-item">
                            <button @click="remove(note.id)"><i class="fa fa-trash-o"></i></button>
                            <div @click="pin(note)" class="pin-button">
                                <i class="fa fa-star-o" v-if="!note.isPinned"></i>
                                <span class="golden-star" v-else>⭐</span>                       
                            </div>
                            <button @click="duplicate(note)"><i class="fa fa-clone"></i></button>
                            <label class="label-color-item">
                                <i class="fa fa-paint-brush"></i>
                                <input v-model="color" type="color" class="input-color-item" @input="changeColor(note.id)"/>                            
                            </label>
                        </section>
                    </div>                    
                </section>
    `,
    data() {
        return {
            color: '#f16a81',
            hover:false,
        }
    },
    methods: {
        pin(note) {
            this.$emit('pin', note)
        },
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        changeColor(noteId) {
            this.$emit('changeColor', noteId, this.color)
        },
        duplicate(note) {
            this.$emit('duplicate', note)
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
    },
}