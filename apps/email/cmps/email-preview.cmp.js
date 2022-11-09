export default{
    props:['email'],
    template:`
    <section class="email-preview">
        <h3>{{substringSender}}</h3>
        <h4>{{ email.subject }}</h4>
        <p>{{ email.body}}</p>
        <!-- <h2>{{email}}</h2> -->
    </section>
    `,
    data(){
        return {
        }
    },
    computed:{
        substringSender(){
            let string = this.email.from
            let split = string.split("@");
            let value = split[0];
            return value
        }
    }
    
}