import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () =>
    import('@/views/login/index.vue')
}, {
  path: '/article/:articleId',
  name: 'article',
  component: () =>
    import('@/views/article'),
  props: true
}, {
  path: '/search',
  name: 'search',
  component: () =>
    import('@/views/search')
}, {
  path: '/',
  name: 'layout',
  component: () =>
    import('@/views/layout/index.vue'),
  children: [{
    path: '',
    name: 'home',
    component: () =>
      import('@/views/home')
  }, {
    path: '/qa',
    name: 'qa',
    component: () =>
      import('@/views/qa')
  }, {
    path: '/my',
    name: 'my',
    component: () =>
      import('@/views/my')
  }, {
    path: '/video',
    name: 'video',
    component: () =>
      import('@/views/video')
  }]
}]

const router = new VueRouter({
  routes
})

export default router
