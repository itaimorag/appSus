
import noteTxt from './note-preview-text.cmp.js'
import noteImg from './note-preview-img.cmp.js'
import noteTodos from './note-preview-todos.cmp.js'
import noteVideo from './note-preview-video.cmp.js'


export default {
    props: ['note'],
    template: `
        <section v-if="!note.isPinned" class="note-preview"> 
                        <component :is="note.type"
                            :class="note.type"
                            :note="note">
                        </component>       
                </section>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
    },
}