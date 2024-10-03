import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useVulnerabilitiesStore } from '@/stores/vulnerabilities'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/inspect/:id',
      name: 'inspect',
      component: () => import('../views/InspectView.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/EditView.vue')
    }
  ]
})

// If users try to access a route that does not exist.
router.beforeEach(async (to) => {
  const store = useVulnerabilitiesStore()
  const { vulnerabilities } = storeToRefs(store)
  if (to.name === 'inspect' || to.name === 'edit') {
    const itemWasFound = vulnerabilities.value.find((v) => v.id === to.params.id)

    if (!itemWasFound) {
      return { name: 'home' }
    }
  }
})

export default router
