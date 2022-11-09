import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    remove,
    save,
    get,
    getEmptyNote,
    putReview,
    getNextNoteId,
}

_createNotes()


function getNextNoteId(noteId) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            var idx = notes.findIndex(note => note.id === noteId)
            return {
                nextId: (idx === notes.length - 1) ? notes[0].id : notes[idx + 1].id,
                prevId: (idx === 0) ? notes[notes.length - 1].id : notes[idx - 1].id
            }
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function query() {
    return storageService.query(NOTE_KEY)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function putReview(review, noteId) {
    return get(noteId).then(note => {
        if (!note.reviews) note.reviews = []
        note.reviews.push(review)
        return storageService.put(NOTE_KEY, note)
    })
}

function save(note) {
    console.log(note);
    if (note.id) return storageService.put(NOTE_KEY, note)
    else return storageService.post(NOTE_KEY, note)
}


function getEmptyNote() {
    return { id: '', title: '' }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                }
            },
            {
                id: "n102",
                type: "note-img",
                isPinned: false,
                info: {
                    url: "http://coding-academy.org/books-photos/20.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n103",
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n103",
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 },
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Driving liscence", doneAt: null }
                    ]
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            
        ]
        utilService.saveToStorage(NOTE_KEY, notes)

    }

    return notes
}



