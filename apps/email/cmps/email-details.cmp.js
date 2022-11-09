export default{
    props:['email'],
    template:`
    <section className="details-section">
        <div className="subject">
            <h2>{{email.subject}}</h2>
            <div className="btns">
                <button><i class="fa fa-mail-reply" style="font-size:24px"></i></i></button>
                <button><i class="fa fa-trash-o" style="font-size:28px"></i></button>
            </div>
        </div>
        <div className="body">
            <h3>{{ email.body }}</h3>
        </div>
        <div className="from">
            <p> From: {{ email.from }}</p>
        </div>
    </section>
    `,
}