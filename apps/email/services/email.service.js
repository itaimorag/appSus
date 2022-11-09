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

function query() {
    return storageService.query(EMAIL_KEY)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    console.log(email);
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
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com'

            }
        ]
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
    return emails
}


