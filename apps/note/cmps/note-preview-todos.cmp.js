
import { noteService } from '../services/note.service.js'


export default {
    props: ['note'],
    template: `
     <section class="note-template">
     <h2> {{ note.info.label }} </h2>
        <ul v-if="note.info.todos" class="todos-ul">
            <li v-for="(todo, idx) in note.info.todos"
            @click="toggleTodoComplete(idx)"
            class="todo-li">
            <button @click.stop="removeTodo(idx)"
            class="todo-remove-btn">
            <i class="fa fa-trash-o"></i>
            </button>
                {{ todo.txt }}
            </li>
            
        </ul>
        <input @keyup.enter="addTodo" 
            v-model="nextTodo" 
            class="next-todo-input"
            placeholder="+ Click to add todo" >
    </section>
`,
    data() {
        return {
            nextTodo: '',
        };
    },
    methods: {
        addTodo() {
            const todo = {
                txt: this.nextTodo,
                isComplete: false,
            }
            if (!this.note.info.todos) this.note.info.todos = []
            this.note.info.todos.push(todo)
            noteService.save(this.note)
            this.nextTodo = ''
        },

        removeTodo(idx) {
            this.note.info.todos.splice(idx,1)
            noteService.save(this.note)
        },
        toggleTodoComplete(TodoIdx) {
            this.note.info.todos[TodoIdx].isComplete = !this.note.info.todos[TodoIdx].isComplete
            noteService.save(this.note)

        },
       
    },
    computed: {

    },
    components: {
      
        noteService,
    },
    
};