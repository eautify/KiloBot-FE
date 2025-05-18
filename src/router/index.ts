import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/DashboardView.vue'
import Fruits from '../views/FruitsView.vue'
import About from '../views/AboutView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard, meta: { title: 'Dashboard - KiloBot' } },
  { path: '/fruits_database', component: Fruits, meta: { title: 'Fruits - KiloBot' } },
  { path: '/about', component: About, meta: { title: 'About - KiloBot' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = (to.meta?.title ?? 'KiloBott') as string
})

export default router
