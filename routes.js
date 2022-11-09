import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'

import emailAppPage from './views/apps/email-app.cmp.js'
import keepAppPage from './views/apps/keep-app.cmp.js'
import bookAppPage from './views/apps/book-app.cmp.js'




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
			path: '/keepApp',
			component: keepAppPage,
		},
		{
			path: '/emailApp',
			component: emailAppPage,
		},
		{
			path: '/bookApp',
			component: bookAppPage,
		},
	],
}

export const router = createRouter(routerOptions)
