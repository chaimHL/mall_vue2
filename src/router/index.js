import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/home/index')
const Category = () => import('@/views/category/index')
const Cart = () => import('@/views/cart/index')
const Profile = () => import('@/views/profile/index')

// 1.安装
Vue.use(Router)

// 路由规则
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]
// 2.创建路由对象
const router = new Router({
  routes
})

// 3.导出router
export default router
