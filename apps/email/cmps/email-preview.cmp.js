export default{
    props:['email'],
    template:`
    <section class="email-preview">
            <p class="bolded">{{substringSender}}</p>
        <p class="bold">{{ email.subject }}</p>
        <p>{{ email.body}}</p>
        <p>{{formattedSeenAt}}</p>
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
        },
        formattedSeenAt(){
            let currDay = new Date().getDay()
            let seen = this.email.sentAt
            let datedFormat = new Date(seen)
            if(datedFormat.getDay() !== currDay) return datedFormat.getDay() + '/' + (datedFormat.getMonth()+1)
            else return datedFormat.getHours() + ":" + datedFormat.getMinutes()

        }
    }
    
}