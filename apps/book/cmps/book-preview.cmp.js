export default {
    props: ['book'],
    template: `
        <section class="book-preview">
            <img :src="imgUrl" alt="" />
            <h2>{{ book.title }}</h2>
        </section>
    `,
    computed: {
        imgUrl() { 
            if(!this.book.thumbnail) return '../img/notFound.jpg'
            return this.book.thumbnail
        },
    },
}