

export default {
    template: `
        <section class="app-hamburger">
                <router-link class="grid-item" to="/">Home</router-link>
                <router-link class="grid-item" to="/about">About</router-link>
                <router-link class="grid-item" to="/noteApp">Keep <img src="./imgs/keeps.png"/></router-link>
                <router-link class="grid-item" to="/emailApp">Email <img src="./imgs/gmail.png"/></router-link>
                <router-link class="grid-item" to="/bookApp">Books Shop <img src="./imgs/book-shop.png"/></router-link>
        
        </section>
    `,
    data() {
        return {
           
        }
    },
    methods: {
       
    },
}