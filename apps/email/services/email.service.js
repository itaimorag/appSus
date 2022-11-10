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
                    return emails.filter(email => email.from === loggedinUser.email)

                case 'trash':
                    return emails.filter(email => email.status === 'trash')

                case 'draft':
                    return emails.filter(email => email.isDraft === true)


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
            ]
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
    return emails
}


