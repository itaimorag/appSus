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
    saveAll,
    makeRandomColor,
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

function saveAll(notes){
    utilService.saveToStorage(NOTE_KEY, notes)
}

function save(note) {
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
                isPinned: false,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: makeRandomColor()
                }

            },
            {
                id: "n102",
                type: "note-img",
                isPinned: false,
                info: {
                    url: "http://coding-academy.org/books-photos/20.jpg",
                    title: "Akarnae"
                },
                style: {
                    backgroundColor: makeRandomColor()
                }
            },
            {
                id: "n103",
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null,isComplete:false },
                        { txt: "Coding power", doneAt: 187111111,isComplete:false }
                    ]
                },
                style: {
                    backgroundColor: makeRandomColor()
                }
            },
            {
                id: "n111",
                type: "note-img",
                isPinned: false,
                info: {
                    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
                    title: "For Bigger Blazes"
                },
                style: {
                    backgroundColor: makeRandomColor()
                }
            },
            {
                id: "n113",
                type: "note-video",
                isPinned: false,
                info: {
                    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                    title: "Elephants Dream"
                },
                style: {
                    backgroundColor: makeRandomColor()
                }
            },
            {
                id: "n106",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Hello Wrold!"
                },
                style: {
                    backgroundColor: makeRandomColor()
                }

            },
            {
                id: "n107",
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null,isComplete:false },
                        { txt: "Coding power", doneAt: 187111111,isComplete:false }
                    ]
                },
                style: {
                    backgroundColor: makeRandomColor()
                }
            },
            {
                id: "n109",
                type: "note-img",
                isPinned: false,
                info: {
                    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
                    title: "Big Buck Bunny"
                },
                style: {
                    backgroundColor: makeRandomColor()
                }
            },
            {
                id: "n104",
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Shopping list",
                    todos: [
                        { txt: "bannana", doneAt: null },
                        { txt: "book", doneAt: 187111111 },
                        { txt: "headphones", doneAt: null },
                        { txt: "t-shirt", doneAt: null }
                    ]
                },
                style: {
                    backgroundColor: makeRandomColor()
                }
            },
            {
                id: "n108",
                type: "note-todos",
                isPinned: false,
                info: {
                    label: "Shopping",
                    todos: [
                        { txt: "bag", doneAt: null },
                        { txt: "pencil", doneAt: 187111111 },
                        { txt: "pen", doneAt: null },
                        { txt: "pokemon ball", doneAt: null }
                    ]
                },
                style: {
                    backgroundColor: makeRandomColor()
                }
            },
            {
                id: "n110",
                type: "note-video",
                isPinned: false,
                info: {
                    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: makeRandomColor()
                }
            },
            
        ]
        utilService.saveToStorage(NOTE_KEY, notes)

    }

    return notes
}

function makeRandomColor(){
let color=['#826AED','#C879FF','#FFB7FF','#3BF4FB','#CAFF8A']
         let idx=  utilService.getRandomInt(0,4)
         return color[idx]
}


