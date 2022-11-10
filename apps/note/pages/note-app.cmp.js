
import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteAdd from '../cmps/add-note.cmp.js'


export default {
    template: `
    <section class="note-app-page">
            <note-filter @filter="filter"/>
            <note-add @addNote="addNote"/>
        <note-list 
        @remove="removeNote"
        @pin="pinNote"
        @changeColor="changeColor"
        :notes="notesToShow"/>
    </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: null,
        }
    },
    created() {
        noteService.query()
            .then(notes => {
                this.notes = notes
            })
    },
    methods: {
        removeNote(noteId) {
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    showSuccessMsg(`note ${noteId} deleted`)
                })
                .catch(err => {
                    console.log('OOPS', err)
                    showErrorMsg('Cannot remove note')
                })
        },
        pinNote(note) {
console.log(`foo = `, this.notes)
            note.isPinned=!note.isPinned
            const idx = this.notes.findIndex(note => note === note)
            this.notes.splice(idx,1)
            console.log(`foo = `, this.notes)
            this.notes.unshift(note)

            console.log(`foo = `, this.notes)
            // noteService.get(noteId)
            //     .then(() => {
            //         const idx = this.notes.findIndex(note => note.id === noteId)
            //         this.notes[idx].isPinned = !this.notes[idx].isPinned

            //         noteService.save(this.notes[idx])
            //     })
            //     .catch(err => {
            //         console.log('OOPS', err)
            //         showErrorMsg('Cannot change pin state')
            //     })
        },
        changeColor(noteId, backgroundColor) {
            noteService.get(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes[idx].style.backgroundColor = backgroundColor
                    noteService.save(this.notes[idx])
                })
        },
        addNote(newNote) {
            console.log(`newNote = `, newNote)
            noteService.save(newNote)
            this.notes.push(newNote)
        },
        filter(filterBy) {
            this.filterBy = filterBy
        }
    },

    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes
            const regex = new RegExp(this.filterBy.text, 'i')
            return this.notes.filter(note => {
                if (note.type === 'note-txt') return regex.test(note.info.txt)
                else if (note.type === 'note-todos') return regex.test(note.info.label)
                else return regex.test(note.info.title)
            })

        },
    },
    components: {
        noteList,
        noteFilter,
        noteAdd
    }
}