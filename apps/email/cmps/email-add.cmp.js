export default{
    template:`
        <section className="add-email">
            <div className="new-email">
                <h3>New Email</h3>
            </div>
            <div className="to">
                To:
                <input type="text" placeholder="Enter email" />
            </div>
            <div className="subject">
                Subject:
                <input type="text" placeholder="Enter email" />
            </div>
               <textarea name="" id="" cols="30" rows="10"></textarea>
                <button @click="$emit('closeMsg')">X</button>

        </section>
    `
}