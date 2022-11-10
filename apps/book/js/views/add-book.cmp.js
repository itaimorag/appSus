import { booksService } from "../../services/books-service.js"

export default {
    template: `
    <section class="add-new-book">
        <div className="add-component">
            <h1>Search a book to add</h1>
            <input v-model="value" @change="search" type="text" placeholder="search here..." />
            <ul>
                <section v-for="book in books">
                    <div className="selection">
                        <li >{{ book.volumeInfo.title }}</li>
                        <button @click="saveBook(book)">+</button>
                    </div>
                    <hr />
                </section>
            </ul>
        </div>
    </section>
    `,
    data() {
        return {
            value: '',
            books: [],
        }
    },
    methods: {
        search() {
            booksService.getGoogleBooks(this.value).then(books => this.books = books.items)
        },
        saveBook(book) {
            booksService.addGoogleBook(book)
        }
    },

}

