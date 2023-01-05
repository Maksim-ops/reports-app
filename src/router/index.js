import axios from "axios"
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
//import DateView from '@/views/DateView.vue'
import store from '@/store'


const routes = [
  {
    path: '/login',
    name: 'Главная',
    component: LoginView
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DashboardView.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: '/',
    name: 'Date',
    component: () => import(/* webpackChunkName: "Главная" */ '../views/DateView.vue')
  },
  {
    path: '/region',
    name: 'Город',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Город" */ '../views/RegionView.vue')
  },
  {
    path: '/volunteers',
    name: 'Волонтеры',
    component: () => import(/* webpackChunkName: "Волонтеры" */ '../views/VolunteersView.vue')
  },
  {
    path: '/institution',
    name: 'Учреждение',
    component: () => import(/* webpackChunkName: "Группа" */ '../views/InstitutionView.vue')
  },
  {
    path: '/theme',
    name: 'Тема',
    component: () => import(/* webpackChunkName: "Тема" */ '../views/ThemeView.vue')
  },
  {
    path: '/stage',
    name: 'Этап',
    component: () => import(/* webpackChunkName: "Тема" */ '../views/StageView.vue')
  },
  {
    path: '/hours',
    name: 'Часы',
    component: () => import(/* webpackChunkName: "Часы" */ '../views/HoursView.vue')
  },
  {
    path: '/images',
    name: 'Фото',
    component: () => import(/* webpackChunkName: "Фото" */ '../views/ImageView.vue')
  },
  {
    path: '/review',
    name: 'Проверка',
    component: () => import(/* webpackChunkName: "Проверка" */ '../views/ReviewView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  if(!store.state.report.jwt) {
    if(localStorage.getItem("JWT")) {
      const jwt = JSON.parse(localStorage.getItem("JWT"))
      const headers = { headers: { authorization: 'Bearer ' + jwt } }
      await axios.get(process.env.VUE_APP_API_URL + '/verifyJWT.php', headers)
      .then(res => {
        if(res.data.jwt) {
          store.commit('report/setJWT', res.data.jwt)
        } else {
          store.commit('report/setMessage', res.data.message)
          store.commit('report/clearJWT')
        }
      }).catch(err => {
        store.commit('report/setMessage', err.response)
        store.commit('report/clearJWT')
      })
    }
  }

  if(store.state.report.jwt) {
    if(!store.state.report.isLoadedData)
      store.dispatch('report/loadData')
    if(to.path == '/login')
      return '/'
  } else if(to.path != '/login')
      return '/login'
  else {
    return
  }
});

export default router
