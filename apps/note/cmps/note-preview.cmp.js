export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <div class="note-text-preview" v-if="checkIfText">
                <h2> {{ note.info.txt }} </h2>
            </div>
            <div class="note-img-preview" v-if="checkIfImg">
               <img :src="note.info.url">
            </div>
            <div class="note-todos-preview" v-if="checkIfTodos">
              <h2> {{ note.info.label }} </h2>
              <ul>
                    <li v-for="todo in note.info.todos" :key="note.txt">
                       <p> {{ todo.txt }} </p>
                    </li>
              </ul>
            </div>
            <div class="note-video-preview" v-if="checkIfVideo">
            <iframe :src="note.info.url"></iframe>
            </div>
        </article>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        checkIfText() {
            return this.note.type === 'note-txt'
        },
        checkIfImg() {
            return this.note.type === 'note-img'
        },
        checkIfTodos() {
            return this.note.type === 'note-todos'
        },
        checkIfVideo() {
            return this.note.type === 'note-video'
        }
    },
}