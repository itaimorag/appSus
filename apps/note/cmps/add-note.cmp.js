import { noteService } from '../services/note.service.js'

export default {
    emits:['addNote'],
    template: `
    <section class="add-note">
        <section class="add-note-inputs">
            <input v-if="cmpType==='note-txt'" v-model="textValue" type="text" placeholder="Write eveything you want"/>
            <input v-if="cmpType==='note-video'" v-model="textValue" type="text" placeholder="Enter video url"/>
            <input v-if="cmpType==='note-video'" v-model="titleValue" type="text" placeholder="Enter video title"/>
            <input v-if="cmpType==='note-img'" v-model="textValue" type="text" placeholder="Enter image url"/>
            <input v-if="cmpType==='note-img'" v-model="titleValue" type="text" placeholder="Enter image title"/>
            <input v-if="cmpType==='note-todos'" v-model="textValue" type="text" placeholder="Write 1 todo"/>
            <input v-if="cmpType==='note-todos'" v-model="titleValue" type="text" placeholder="Write todo title"/>
            <button @click="addNote" title="Save" class="save-add-note"><i class="fa fa-check-square"></i></button>
        </section>
        <section class="add-note-buttons">
            <button @click="changeCmpType('note-video')" title="Video"><i class="fa fa-video-camera"></i></button>
        <button @click="changeCmpType('note-img')" title="Image"><i class="fa fa-image"></i></button>
        <button @click="changeCmpType('note-txt')" title="Text"><i class="fa fa-pencil-square-o"></i></button>
        <button @click="changeCmpType('note-todos')" title="Todos"><i class="fa fa-navicon"></i></button>
        </section>
    </section>
    `,
    data() {
        return {
            cmpType: 'note-txt',
            newNote: null,
            textValue: '',
            titleValue: '',
        }
    },
    methods: {
        changeCmpType(cmpType) {
            this.cmpType = cmpType
        },
        addNote() {
            switch (this.cmpType) {
                case 'note-txt':
                    this.newNote = {
                        id: null,
                        type: 'note-txt',
                        isPinned: false,
                        info: {
                            txt: this.textValue
                        },
                        style: {
                            backgroundColor: "#f16a81"
                        }
                    }
                    break;
                case 'note-todos':
                    this.newNote = {
                        id: null,
                        type: 'note-todos',
                        isPinned: false,
                        info: {
                            label: this.titleValue,
                            todos: [
                                { txt: this.textValue, doneAt: null },
                            ]
                        },
                        style: {
                            backgroundColor: "#f16a81"
                        }
                    }
                    break;
                case 'note-img':
                    this.newNote = {
                        id: null,
                        type: 'note-img',
                        isPinned: false,
                        info: {
                            title: this.titleValue,
                            url: this.textValue
                        },
                        style: {
                            backgroundColor: "#f16a81"
                        }
                    }
                    break;
                case 'note-video':
                    this.newNote = {
                        id: null,
                        type: 'note-video',
                        isPinned: false,
                        info: {
                            title: this.titleValue,
                            url: this.textValue
                        },
                        style: {
                            backgroundColor: "#f16a81"
                        }
                    }
                    break;
            }
            this.$emit('addNote', this.newNote)
            this.textValue=''
            this.titleValue=''
        }
    },
    computed: {

    },
}