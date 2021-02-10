import Vue from 'vue'
import VueRouter from 'vue-router'
import NavBar from '@/components/NavBar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignIn',
    component: () =>
      import(/* webpackChunkName: "signin" */ '../views/Auth/SignIn.vue')
  },
  {
    path: '/home',
    name: 'Home',
    components: {
      NavBar,
      default: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    }
  },
  {
    path: '/news',
    name: 'News',
    components: {
      NavBar,
      default: () =>
        import(/* webpackChunkName: "news" */ '../views/News.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {


  const loggedIn = localStorage.getItem('token')
  if (to.name !== 'SignIn') {
    if (loggedIn) {
      next()
    } else {
      next({ name: 'SignIn', query: { redirect: to.path } })
    }
  } else {
    next()
  }

  //auth route is authenticated
})

export default router
