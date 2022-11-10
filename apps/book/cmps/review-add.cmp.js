export default {
    template: `
        <section class="review-page">
            <form class="review-form" action="">
               <h1>Add review</h1>
            <label htmlFor="">
                Full name
                <input ref="input" v-model="this.review.fullName" autofocus type="text" placeholder="full name"/>
            </label>
            <select v-model="this.review.rating" name="rating" id="cars">
            <option  value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
            </select>
            <label htmlFor="">
                Read at: 
                <input v-model="this.review.date" type="date" />
            </label>
            <label htmlFor="">

                Free text:
                <textarea v-model="this.review.text" name="free-text" id="" cols="30" rows="8"></textarea>
            </label>
            <button class="save-btn" @click.prevent="saveReview" >Save review</button>
            <button class="exit-btn" @click.prevent="$emit('close')">X</button>
        </form>
        </section>
    `,
    data(){
        return{
            review:{
            }
        }
    },
    methods: {
        saveReview(){
            this.$emit('review', this.review, this.$route.params.id)
        },
    },
}