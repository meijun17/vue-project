import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/CheckoutView.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/ArticlesView.vue')
      },
      {
        path: 'article/:articleId',
        component: () => import('../views/ArticleView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/backend/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/AdminProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/backend/AdminOrders.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/backend/AdminCoupon.vue')
      },
      {
        path: 'article',
        component: () => import('../views/backend/AdminArticle.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
