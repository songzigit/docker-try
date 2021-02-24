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
     name: 'player',
     path: '/player',
     component: ()=>import('@/pages/Player')
   },
   {
     name: '404',
     path: '*',
     component: () => import('@/pages/404')
  }
];

export default new Router({
  routes
});
