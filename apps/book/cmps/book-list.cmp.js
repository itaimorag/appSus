import bookPreview from './book-preview.cmp.js'

export default {
    props:['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" @click="selected(book.id)"  :key="book.id">
                    <book-preview :book="book"/>
                    <section class="actions">
                        <button className="delete-btn" @click.stop="remove(book.id)">Delete</button>
                    </section>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(bookId){
            if(confirm('Are you sure you want to delete this book?'))   this.$emit('remove', bookId)
         
        },
        selected(bookId){
            this.$emit('selected', bookId)
            this.$router.push(`/bookApp/${bookId}`)

        }
    },
    computed: {

    },
    components: {
        bookPreview,
    }
}