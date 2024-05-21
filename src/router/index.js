import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/Products.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'Home', 
      component: () => import('../views/Products.vue'), // Lazy-loaded
      alias: '/products'  
    },
    {
      path: '/Suppliers',
      name: 'Suppliers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Suppliers.vue')
    },
    {
      path: '/Statistics',
      name: 'Statistics',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Statistics.vue')
    }
  ]
})

export default router
