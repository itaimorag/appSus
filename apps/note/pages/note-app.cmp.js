
import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

// import noteFilter from '../cmps/note-filter.cmp.js'
import noteList from '../cmps/note-list.cmp.js'


export default {
    template: `
    <section class="note-app-page">
            <!-- <note-filter @filter="setFilter"/> -->
        <note-list 
        @remove="removeNote"
        @pin="pinNote"
        :notes="notesToShow"/>
    </section>
    `,
    data(){
        return { 
           notes:[],
           filterBy: {
            text : '',
        },

        }
    },
    created(){
      noteService.query()
            .then(notes => {
                this.notes = notes
            })
    },
    methods: {
        removeNote(noteId){
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    showSuccessMsg(`note ${noteId} deleted`)
                })
                .catch(err =>{
                    console.log('OOPS', err)
                    showErrorMsg('Cannot remove note')
                })
        },
        pinNote(noteId){
            noteService.get(noteId)
            .then(() => {
                const idx = this.notes.findIndex(note => note.id === noteId)
                this.notes[idx].isPinned=!this.notes[idx].isPinned
                noteService.save(noteId)
            })
        }
        },
       
    computed: {
        notesToShow(){
            return this.notes
        },
    },
    components: {
        noteList,
        // noteFilter
    }
}