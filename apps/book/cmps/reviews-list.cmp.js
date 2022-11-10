import { showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    props:['reviews'],
    template: `
        <section className="book-reviews">
           <table>
            <thead>
                <tr>
                    <th>Full name</th>
                    <th>Rating</th>
                    <th>Publish date</th>
                    <th>Review</th>
                </tr>
            </thead>
            
            <tr v-for="review in reviews">
                <td>{{ review.fullName}}</td>
                <td>{{ review.rating}}</td>
                <td>{{ review.date}}</td>
                <td>{{ review.text}}</td>
            </tr>
           </table>
           <button class="back-btn" @click="routeBack">Back</button>
           </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        routeBack(){
            this.$emit('backed', false)
            showSuccessMsg('Car saved (Car id')
        }
    },
    computed:{

    },
}
