import { booksService } from "../../services/books-service.js"

import bookPreview from '../../cmps/book-preview.cmp.js'
import bookList from '../../cmps/book-list.cmp.js'
import bookFilter from '../../cmps/book-filter.cmp.js'

export default {
    template: `
    <div className="overflow-section">
        <book-filter @openAddPage="log" @filter="setFilter"></book-filter>
        <book-list  v-if="books" @remove="removeBook" :books="booksToShow"></book-list>
    </div>
    `,
    data() {
        return {
            books: null,
            filterBy: { price: 200 },
            bookReview: null,
        }
    },
    created(){
        booksService.query()
            .then(books => {
                this.books = books
            })
    },
    methods: {
        removeBook(bookId) {
            booksService.remove(bookId)
            const idx = this.books.findIndex(book => book.id === bookId)
            this.books.splice(idx, 1)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },

    },

    computed: {
        booksToShow() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.books.filter(book => (regex.test(book.title)) && book.listPrice.amount < this.filterBy.price)
        },
    },

    components: {
        bookPreview,
        bookList,
        bookFilter
        // List of components that have been imported into this file
    },
}