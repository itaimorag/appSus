export const surveyService = {
    getById
}

function getById() {
    return Promise.resolve(survey)
}

var survey =
{
  
    cmps: [
        {
            type: 'textBox',
            info: {
                label: 'Your full name:'
            }
        },
        {
            type: 'textBox',
            info: {
                label: 'Robot Type:',
                opts: ['CleanDude', 'FeedMeBob', 'misterPleasure']
            }
        },
        {
            type: 'textBox',
            info: {
                label: 'Human Type:',
                opts: ['Muki', 'Puki']
            }
        },
        {
            type: 'selectBox',
            info: {
                label: 'How was it:',
                opts: ['Great', 'Fine', 'Crap', 'Worst Ever']
            }
        },

        {
            type: 'linearScale',
            info: {
                label: 'Quality:',
                max: 5
            }
        },
        {
            type: 'photoTuner',
            info: {
                label: 'Tune your photo:',
                // imgUrl: 'https://res.cloudinary.com/daahi2yaz/image/upload/v1557175588/Robots/Crypto-robots.jpg'
                // imgUrl: 'https://res.cloudinary.com/daahi2yaz/image/upload/v1547889015/Robots/spotmini-975475584.jpg'
                imgUrl: 'https://res.cloudinary.com/daahi2yaz/image/upload/v1555521791/Robots/maxresdefault.jpg'
                // imgUrl: 'https://res.cloudinary.com/demo/image/upload/lady.jpg'
            }
        },

    ]
}