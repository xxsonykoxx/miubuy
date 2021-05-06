import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Index from '../views/pages/Index.vue';
import Mypage from '../views/pages/Mypage.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import JapanAreaSelect from '../views/pages/JP_area_select.vue';
import TaiwanAreaSelect from '../views/pages/TW_area_select.vue';
import ChatroomList from '../views/pages/Chatroom_list.vue';
import Seller from '../views/pages/Mypage/Seller.vue';
import Buyer from '../views/pages/Mypage/Buyer.vue';
import Myinfo from '../views/pages/Mypage/Myinfo.vue';
import Chatroom from '../views/pages/Chatroom.vue';
import Checkout from '../views/pages/Checkout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Index',
        component: Index,
      },
      {
        path: '/Japan_area_select',
        name: 'JapanAreaSelect',
        component: JapanAreaSelect,
      },
      {
        path: '/Taiwan_area_select',
        name: 'TaiwanAreaSelect',
        component: TaiwanAreaSelect,
      },
      {
        path: '/ChatroomList',
        name: 'ChatroomList',
        component: ChatroomList,
      },
      {
        path: '/Mypage',
        name: 'Mypage',
        component: Mypage,
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: '/Mypage/Seller',
            name: 'Seller',
            component: Seller,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: '/Mypage/Buyer',
            name: 'Buyer',
            component: Buyer,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: '/Mypage/Myinfo',
            name: 'Myinfo',
            component: Myinfo,
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/Chatroom/:Id',
    name: 'Chatroom',
    component: Chatroom,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/Checkout/:Id',
    name: 'Checkout',
    component: Checkout,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
