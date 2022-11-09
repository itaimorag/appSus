export default {
    template: `
        <section className="add-email">
            <div className="new-email">
                <h3>New Email</h3>
            </div>
            <div className="to">
                <h4>To:</h4>
                <input type="text" placeholder="Enter email" />
            </div>
            <div className="subject">
               <h4>Subject:</h4>
                <input type="text" placeholder="Enter email" />
            </div>
            <div className="content">
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
                <button @click="$emit('closeMsg')">X</button>

        </section>
    `
}