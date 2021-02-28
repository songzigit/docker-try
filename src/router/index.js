import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    name: 'home',
    path: '/',
    redirect: '/discovery',
    component: () => import('@/pages/Home'),
    children: [
      {
        name: 'discovery',
        path: '/discovery',
        component: () => import('@/pages/Home/Discovery')
      },
      {
        name: 'podcast',
        path: '/podcast',
        component: () => import('@/pages/Home/Podcast')
      }, {
        name: 'mine',
        path: '/mine',
        component: () => import('@/pages/Home/Mine')
      }, {
        name: 'ksong',
        path: '/ksong',
        component: () => import('@/pages/Home/KSong')
      }, {
        name: 'cloud-village',
        path: '/cloud-village',
        component: () => import('@/pages/Home/CloudVillage')
      }
    ]
  },
  {
    name: 'daily-recommend',
    path: '/daily-recommend',
    component: () => import('@/pages/DailyRecommend')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/pages/Login')
  },
  {
    name: 'main-player',
    path: '/song',
    component: () => import('@/pages/MainPlayer')
  },
  {
    name: 'album-detail',
    path: '/album-detail',
    component: () => import('@/pages/AlbumDetail')
  },
  {
    name: 'video-detail',
    path: '/video-detail',
    component: () => import('@/pages/VideoDetail')
  },
  {
    name: 'album-square',
    path: '/album-square',
    component: () => import('@/pages/AlbumSquare')
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('@/pages/Search')
  },
  {
    name: 'search-result',
    path: '/search/result',
    component: () => import('@/pages/Search/Result')
  },
  {
    name: 'user-home',
    path: '/user-home',
    component: () => import('@/pages/User/Home')
  },
  {
    name: 'comments',
    path: '/comments',
    component: () => import('@/pages/Comments')
  },
  {
    name: '404',
    path: '*',
    component: () => import('@/pages/404')
  }
];

export default new Router({
  routes,
  scrollBehavior(savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
