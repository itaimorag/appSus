import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'

import emailAppPage from './apps/email/pages/email-app.cmp.js'
import noteAppPage from './apps/note/pages/note-app.cmp.js'
import bookAppPage from './apps/book/js/views/books-app.cmp.js'

import bookDetails from './apps/book/js/views/book-details.cmp.js'
import addBook from './apps/book/js/views/add-book.cmp.js'


const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage,
		},
		{
			path: '/about',
			component: aboutPage,
		},
		{
			path: '/noteApp',
			component: noteAppPage,
		},
		{
			path: '/emailApp',
			component: emailAppPage,
		},
		{
			path: '/bookApp',
			component: bookAppPage,
		},
		{
            path: '/bookApp/:id',
            component: bookDetails
        },
        {
            path: '/bookApp/add',
            component: addBook
        },
	],
}

export const router = createRouter(routerOptions)
