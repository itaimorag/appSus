

export default {
    template: `
        <section class="app-hamburger">
                <router-link class="grid-item" to="/">Home</router-link>
                <router-link class="grid-item" to="/about">About</router-link>
                <router-link class="grid-item" to="/noteApp">Keep <img src="../imgs/keep3.JPG" /></router-link>
                <router-link class="grid-item" to="/emailApp">Email <img src="../imgs/gmail.JPG" /></router-link>
                <router-link class="grid-item" to="/bookApp">Books Shop <img src="../imgs/bookshop.JPG" /></router-link>
        
        </section>
    `,
    data() {
        return {
           
        }
    },
    methods: {
       
    },
}