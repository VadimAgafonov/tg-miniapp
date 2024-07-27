import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LanguageView from '../views/LanguageView.vue'
import LanguageDetailView from '../views/LanguageDetailView.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView
	},
	{
		path: '/language/',
		name: 'Language',
		component: LanguageView
	},
	{
		path: '/language/:lang',
		name: 'LanguageDetailView',
		component: LanguageDetailView,
		props: true
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
