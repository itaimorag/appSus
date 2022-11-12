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
                                <i class="fa fa-star-o grey-star" v-if="!note.isPinned"></i>
                                <span class="golden-star" v-else>⭐</span>                       
                            </div>
                            <button @click="duplicate(note)"><i class="fa fa-clone"></i></button>
                            <button @click="transferData"><i class="fa fa-envelope-o"></i></button>
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
            hover: false,
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
        },
        transferData() {
            switch (this.note.type) {
                case 'note-txt':
                    var text = this.note.info.txt
                    var note = { text, type: 'text' }
                    break;
                case 'note-todos':
                    var text = this.note.info.label
                    var todos = this.note.info.todos
                    var note = { text, todos, type: 'todos' }
                    break;
                case 'note-video':
                    var newUrl=this.note.info.url.replaceAll('/', '*')
                    var text = this.note.info.title
                    var url = newUrl
                    var note = { text, url, type: 'imgVideo' }
                    break;
                case 'note-img':
                    var text = this.note.info.title
                    var newUrl=this.note.info.url.replaceAll('/', '*')
                    var url = newUrl
                    var note = { text, url, type: 'imgVideo' }
                    break;
                    // this.note.info.url.substring(7,this.note.info.url.length)
            }
            const stringify = JSON.stringify(note)
            this.$router.push("/emailApp/" + stringify)
        },
    },
    computed: {

    },

    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
    },
}