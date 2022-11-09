export default {
    template: `
        <section className="add-email">
            <div className="new-email">
                <h3>New Email</h3>
            </div>
            <div className="to">
                <h4>To:</h4>
                <input type="text" placeholder="example@gmail.com" />
            </div>
            <div className="subject">
               <h4>Subject:</h4>
                <input type="text" placeholder="Enter subject" />
            </div>
            <div className="content">
                <textarea name="" id="" cols="30" 
                placeholder="Enter youre email content here" rows="10"></textarea>
            </div>
            <div className="buttons">
                <button class="line"><i class="fa fa-file-image-o" style="font-size:18px"></i></button>
                <button class="line"><i class="fa fa-file-excel-o" style="font-size:18px"></i></button>
                <button class="line"><i class="fa fa-image" style="font-size:18px"></i></button>
                <button><i class="fa fa-send" style="font-size:24px"></i></button>
            </div>
                <button class="close-btn" @click="$emit('closeMsg')">X</button>

        </section>
    `
}