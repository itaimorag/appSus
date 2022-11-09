
import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteList from '../cmps/note-list.cmp.js'


export default {
    template: `
    <section class="note-app">
            <h1>hello</h1>
            <note-filter @filter="setFilter"/>
        <note-list 
            @remove="removeNote" 
            :cars="carsToShow"/>
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
        
        },
       
    computed: {
       
    },
    components: {
        noteList,
        noteFilter
    }
}