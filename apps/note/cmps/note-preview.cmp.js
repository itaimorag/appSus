import noteTxt from './note-preview-text.cmp.js'
import noteImg from './note-preview-img.cmp.js'
import noteTodos from './note-preview-todos.cmp.js'
import noteVideo from './note-preview-video.cmp.js'


export default {
    props: ['note','hover'],
    template: `
        <section class="note-preview">     
                        <component :is="note.type"
                            :class="note.type"
                            :note="note"
                            :hover="hover"
                            >
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