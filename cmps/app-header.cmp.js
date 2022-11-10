
import  appHamburger  from './app-hamburger.cmp.js'


export default {
	template: `
        <header class="app-header">
            <h1>AppSus</h1>
            <button @click="changeOpen"><img src="../imgs/dots.png"/></button>
            <app-hamburger @click="changeOpen" v-if="isOpen"/>
        </header>
    `,
    data() {
        return {
            isOpen:false,
        }
    },
    methods: {
        changeOpen(){
            this.isOpen=!this.isOpen
        },
    },
    components: {
        appHamburger,
    }
}
