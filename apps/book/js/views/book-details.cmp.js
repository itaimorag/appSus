import { booksService } from "../../services/books-service.js"

import reviewAdd from '../../cmps/review-add.cmp.js'
import reviewList from '../../cmps/reviews-list.cmp.js'

export default {
    template: `
        <section v-if="book" class="details-conatiner" >
            <div v-if="!renderReviews">   
                <div className="book-details">
                    <h1>{{ book.title }}</h1>
                    <h3 className="author" v-for="author in book.authors">{{ author }}</h3>
                    <h3 className="publis-date">{{ book.publishedDate }}</h3>
                    <img :src="imgUrl" alt="">
                    <p>Description: {{ book.description }}</p>
                    <h4>Page Count: -{{ book.pageCount }}-  {{ pageCount }}</h4>
                    <h3>{{publishCondition}}</h3>
                    <h3 :class="priceColor">Price: {{priceFormat}}</h3>
                    <img className="sale" v-if="book.listPrice.isOnSale" src="../../img/sale.png" alt="" />
                    <router-link class="back-link" to="/bookApp">Back</router-link>
                    <button class="add-review-btn" @click="isReview = true">Add⭐</button>
                    <button v-if="book.reviews.length > 0" class="watch-review-btn" @click="renderReviews = true">Watch⭐</button>
                </div>
                <review-add  @close="closed" v-if="isReview"  @review="saveReview"></review-add>
            </div>
            <router-link :to="'/bookApp/' + neighBooks.nextId">Next book</router-link>
            <router-link :to="'/bookApp/' + neighBooks.prevId">Prev book</router-link>
            <review-list @backed="closed" :reviews="book.reviews" v-if="renderReviews" />
        </section>
    `,
    data() {
        return {
            book: null,
            isReview: false,
            renderReviews: false,
            neighBooks:{},

        }
    },
    created() {
        this.loadBook()

    },
    methods: {
        loadBook() {
            booksService.get(this.bookId)
                .then(book => {
                    this.book = book
                    booksService.getNextBookId(book.id)
                        .then(neighBooks => {
                            this.neighBooks = neighBooks
                        })
                })
        },
        closed() {
            console.log('ok');
            this.isReview = false
            this.renderReviews = false
        },
        saveReview(rev, id) {
            booksService.putReview(rev, id).then(book => this.book = book)
            this.isReview = false
        },
    },
    computed: {
        imgUrl() {
            return `${this.book.thumbnail}`
        },
        pageCount() {
            if (this.book.pageCount > 500) return 'Long reading'
            else if (this.book.pageCount > 200) return 'Decent reading'
            else if (this.book.pageCount < 100) return 'Light reading'
        },
        priceFormat() {
            const options = {
                style: 'currency',
                currency: this.book.listPrice.currencyCode
            }
            const formatter = new Intl.NumberFormat(
                this.book.language,
                options
            )
            return formatter.format(this.book.listPrice.amount)
        },
        publishCondition() {
            const date = new Date
            const year = date.getUTCFullYear()
            if (year - this.book.publishedDate > 10) return 'Veteran Book!!'
            else return 'New!!'
        },
        priceColor() {
            if (+this.book.listPrice.amount > 150) return 'red'
            if (+this.book.listPrice.amount < 20) return 'green'

        },
        bookId() {
            return this.$route.params.id
        },
    },
    watch: {
        bookId() {
            this.loadBook()
        }
    },
    components: {
        reviewAdd,
        reviewList,
        // List of components that have been imported into this file
    },
}