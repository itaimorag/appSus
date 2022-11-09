
const cmpText = {
    template: `
    <section class="cmp1">
       <input type="text" placeholder="Write eveything you want"/>
    </section>
    `,
    methods: {
      
    }
}
const cmpTodos = {
    template: `
    <section class="cmp2">
      <input type="text" />
    </section>
    `,
    methods: {
       
    }
}

const cmpImg = {
    template: `
    <section class="cmp3">
        <input type="text" placeholder="Enter image url"/>
    </section>
    `,
    methods: {
      
    }
}

const cmpVideo = {
    template: `
    <section class="cmp4">
        <input type="text" placeholder="Enter video url"/>
    </section>
    `,
    methods: {
       
    }
}

export default {
    template: `
        <component :is="cmpType">
       </component>
                 <button @click="changeCmpType(note-video)">video</button>
                 <button @click="changeCmpType(note-img)">image</button>
                <button @click="changeCmpType(note-txt)">text</button>
                <button @click="changeCmpType(note-todos)">todos</button>
    `,
    data() {
        return {
            cmpType: 'note-txt',
        }
    },
    methods: {
        changeCmpType(cmpType) {
            this.cmpType = cmpType
        }
    },
    computed: {
      
    },
}