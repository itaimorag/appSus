import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_KEY = 'emailDB'
_createEmails()

export const emailService = {
    query,
    remove,
    save,
    get,
    getEmptyEmail,
    getNextEmailId,
    getLoggedInUser,
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function getLoggedInUser(){
    return loggedinUser
}


function getNextEmailId(emailId) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            var idx = emails.findIndex(email => email.id === emailId)
            return {
                nextId: (idx === emails.length - 1) ? emails[0].id : emails[idx + 1].id,
                prevId: (idx === 0) ? emails[emails.length - 1].id : emails[idx - 1].id
            }
        })
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function query(criteria) {
  return  storageService.query(EMAIL_KEY)
        .then(emails => {

            switch (criteria.status) {
                case 'inbox':
                    return emails.filter(email => email.to === loggedinUser.email && email.status !== 'trash')

                case 'sent':
                    return emails.filter(email => email.from === loggedinUser.email && email.status !== 'trash')

                case 'trash':
                    return emails.filter(email => email.status === 'trash')

                case 'draft':
                    return emails.filter(email => email.isDraft === true && email.status !== 'trash')


            }

            if(criteria.isStared) return emails.filter(email => email.isStared)
        })

}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    if (email.id) return storageService.put(EMAIL_KEY, email)
    else return storageService.post(EMAIL_KEY, email)
}


function getEmptyEmail() {
    return { id: '', title: '' }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        console.log('hi');
        emails =
            [
                {
                    id: utilService.makeId(),
                    subject: 'hi you!',
                    body: 'We would like to give you a chance',
                    isRead: true,
                    sentAt: 1551133930594,
                    from: 'buki-nae@momo.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'Where have you been?',
                    body: 'Ive been looking for you, where are you??',
                    isRead: false,
                    sentAt: 1670111035,
                    from: 'yuliaBeker321@momo.com',
                    to: 'user@appsus.com'

                }, {
                    id: utilService.makeId(),
                    subject: 'We havent seen you recently!',
                    body: 'Log in and show us that youre active😀',
                    isRead: false,
                    sentAt: 1197652430,
                    from: 'facebook@momo.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'Miss you!',
                    body: 'Would love to catch up sometimes',
                    isRead: false,
                    sentAt: 1659907863,
                    from: 'momo@momo.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: '!!!',
                    body: 'Game of as rest time eyes with of this it. Add was music merry any truth since going. Happiness she ham but instantly put departure propriety. She amiable all without say spirits shy clothes morning. Frankness in extensive',
                    isRead: false,
                    sentAt: 1652907863,
                    from: 'wheat@momo.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'Join us!',
                    body: 'all without say spirits shy clothes morning. Frankness in extensive',
                    isRead: false,
                    sentAt: 1658647863,
                    from: 'cult@momo.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'Hi , how  are you? ',
                    body: 'I wanted to know about my grades at the test yesterday',
                    isRead: true,
                    sentAt: 1197652430,
                    from: 'user@appsus.com',
                    to: 'Teacher@momo.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'Ive been at Omer`s',
                    body: 'I was trying to call you back but you didnt answer',
                    isRead: false,
                    sentAt: 1152154789,
                    from: 'user@appsus.com',
                    to: 'facebook@momo.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'WHAT IS THE FAKE MAIL GENERATOR?',
                    body: 'The Fake Mail Generator is an absolutely free disposable email system. By simply visiting this site the above address has already been activated. Use it instead of your regular email address to avoid spam. When an email is received it will pop up instantly on this pageasd asdasdasdasdd dasar email address to avoid',
                    isRead: false,
                    sentAt: 1132456189,
                    from: 'user@appsus.com',
                    to: 'menashe@momo.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'Chart of the Day: International Seaways - An Oceangoing Pi',
                    body: 'he Chart of the Day belongs to the petroleum tanker company International Seaways (INSW). I found the stock by sorting the Russell 3000 Index stocks first by the most frequent number of new highs in the last month and having a Trend Spotter buy signal then used the Flipchart feature to review the charts for consistent price appreciation. Since the Trend Spotter first signaled a buy on 10/12 the stock gained 26.42%.',
                    isRead: false,
                    sentAt: 12345846484,
                    from: 'user@appsus.com',
                    to: 'bachrat@gmail.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'היי , נובמבר חם בסופר-פארם אנחנו מזמינים אותך ליהנות ממגוון רחב של מבצעי ענק במסגרת Shopping IL | פרסומת',
                    body: 'נייה זו נעשית בדיוור ישיר בהסתמך על מידע מתוך מאגר מידע שבבעלות סופר-פארם (ישראל) בע"מ שמספרו 700061112, או כל מאגר מידע אחר שבבעלות החברה, בהתאם למדיניות הפרטיות של סופר-פארם. בכל עת, ניתן לבקש את הסרתך מרשימת התפוצה המשמשת למשלוח מידע שיווקי בפניה לשירות הלקוחות במייל NLcustomers@Super-Pharm.co.il או ע"י השבה למייל זה.',
                    isRead: true,
                    sentAt: 141514846,
                    from: 'user@appsus.com',
                    to: 'superPharm@gmail.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'matan, you’re getting noticed',
                    body: 'Your profile is looking greatttt Your work and accomplishments are being recognized',
                    isRead: true,
                    sentAt: 154845612,
                    from: 'user@appsus.com',
                    to: 'linkedin@gmail.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'היי , נובמבר חם בסופר-פארם אנחנו מזמינים אותך ליהנות ממגוון רחב של מבצעי ענק במסגרת Shopping IL | פרסומת',
                    body: 'נייה זו נעשית בדיוור ישיר בהסתמך על מידע מתוך מאגר מידע שבבעלות סופר-פארם (ישראל) בע"מ שמספרו 700061112, או כל מאגר מידע אחר שבבעלות החברה, בהתאם למדיניות הפרטיות של סופר-פארם. בכל עת, ניתן לבקש את הסרתך מרשימת התפוצה המשמשת למשלוח מידע שיווקי בפניה לשירות הלקוחות במייל NLcustomers@Super-Pharm.co.il או ע"י השבה למייל זה.',
                    isRead: true,
                    sentAt: 141514846,
                    from: 'superPharm@gmail.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'Miss you!',
                    body: 'Would love to catch up sometimes',
                    isRead: false,
                    sentAt: 1659907863,
                    from: 'momo@momo.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: '!!!',
                    body: 'Game of as rest time eyes with of this it. Add was music merry any truth since going. Happiness she ham but instantly put departure propriety. She amiable all without say spirits shy clothes morning. Frankness in extensive',
                    isRead: false,
                    sentAt: 1652907863,
                    from: 'wheat@momo.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'Join us!',
                    body: 'all without say spirits shy clothes morning. Frankness in extensive',
                    isRead: false,
                    sentAt: 1658647863,
                    from: 'cult@momo.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'Hi , how  are you? ',
                    body: 'I wanted to know about my grades at the test yesterday',
                    isRead: true,
                    sentAt: 1197652430,
                    from: 'user@appsus.com',
                    to: 'Teacher@momo.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'היי , נובמבר חם בסופר-פארם אנחנו מזמינים אותך ליהנות ממגוון רחב של מבצעי ענק במסגרת Shopping IL | פרסומת',
                    body: 'נייה זו נעשית בדיוור ישיר בהסתמך על מידע מתוך מאגר מידע שבבעלות סופר-פארם (ישראל) בע"מ שמספרו 700061112, או כל מאגר מידע אחר שבבעלות החברה, בהתאם למדיניות הפרטיות של סופר-פארם. בכל עת, ניתן לבקש את הסרתך מרשימת התפוצה המשמשת למשלוח מידע שיווקי בפניה לשירות הלקוחות במייל NLcustomers@Super-Pharm.co.il או ע"י השבה למייל זה.',
                    isRead: true,
                    sentAt: 141514846,
                    from: 'superPharm@gmail.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'היי , נובמבר חם בסופר-פארם אנחנו מזמינים אותך ליהנות ממגוון רחב של מבצעי ענק במסגרת Shopping IL | פרסומת',
                    body: 'נייה זו נעשית בדיוור ישיר בהסתמך על מידע מתוך מאגר מידע שבבעלות סופר-פארם (ישראל) בע"מ שמספרו 700061112, או כל מאגר מידע אחר שבבעלות החברה, בהתאם למדיניות הפרטיות של סופר-פארם. בכל עת, ניתן לבקש את הסרתך מרשימת התפוצה המשמשת למשלוח מידע שיווקי בפניה לשירות הלקוחות במייל NLcustomers@Super-Pharm.co.il או ע"י השבה למייל זה.',
                    isRead: true,
                    sentAt: 141514846,
                    from: 'superPharm@gmail.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'היי , נובמבר חם בסופר-פארם אנחנו מזמינים אותך ליהנות ממגוון רחב של מבצעי ענק במסגרת Shopping IL | פרסומת',
                    body: 'נייה זו נעשית בדיוור ישיר בהסתמך על מידע מתוך מאגר מידע שבבעלות סופר-פארם (ישראל) בע"מ שמספרו 700061112, או כל מאגר מידע אחר שבבעלות החברה, בהתאם למדיניות הפרטיות של סופר-פארם. בכל עת, ניתן לבקש את הסרתך מרשימת התפוצה המשמשת למשלוח מידע שיווקי בפניה לשירות הלקוחות במייל NLcustomers@Super-Pharm.co.il או ע"י השבה למייל זה.',
                    isRead: true,
                    sentAt: 141514846,
                    from: 'superPharm@gmail.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'היי , נובמבר חם בסופר-פארם אנחנו מזמינים אותך ליהנות ממגוון רחב של מבצעי ענק במסגרת Shopping IL | פרסומת',
                    body: 'נייה זו נעשית בדיוור ישיר בהסתמך על מידע מתוך מאגר מידע שבבעלות סופר-פארם (ישראל) בע"מ שמספרו 700061112, או כל מאגר מידע אחר שבבעלות החברה, בהתאם למדיניות הפרטיות של סופר-פארם. בכל עת, ניתן לבקש את הסרתך מרשימת התפוצה המשמשת למשלוח מידע שיווקי בפניה לשירות הלקוחות במייל NLcustomers@Super-Pharm.co.il או ע"י השבה למייל זה.',
                    isRead: true,
                    sentAt: 141514846,
                    from: 'superPharm@gmail.com',
                    to: 'user@appsus.com'

                },
                {
                    id: utilService.makeId(),
                    subject: 'היי , נובמבר חם בסופר-פארם אנחנו מזמינים אותך ליהנות ממגוון רחב של מבצעי ענק במסגרת Shopping IL | פרסומת',
                    body: 'נייה זו נעשית בדיוור ישיר בהסתמך על מידע מתוך מאגר מידע שבבעלות סופר-פארם (ישראל) בע"מ שמספרו 700061112, או כל מאגר מידע אחר שבבעלות החברה, בהתאם למדיניות הפרטיות של סופר-פארם. בכל עת, ניתן לבקש את הסרתך מרשימת התפוצה המשמשת למשלוח מידע שיווקי בפניה לשירות הלקוחות במייל NLcustomers@Super-Pharm.co.il או ע"י השבה למייל זה.',
                    isRead: true,
                    sentAt: 141514846,
                    from: 'superPharm@gmail.com',
                    to: 'user@appsus.com'

                },
            ]
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
    return emails
}


