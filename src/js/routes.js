import HomePage from '../pages/home.vue';

//auth
import SignInPage from '../pages/auth/signin.vue';
import SignUpPage from '../pages/auth/signup.vue';
/*import EditProfilePage from '../pages/auth/editprofile.vue';

//chat
import RequestPage from '../pages/chat/request.vue';
import ContactPage from '../pages/chat/contact.vue';

import AllPhotosPage from '../pages/allphotos.vue';
import AllFriendsPage from '../pages/friends.vue';*/

import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  //auth
  {
    path: '/signin/',
    component: SignInPage,
    options: {
      transition: 'f7-circle',
    },
  },
  {
    path: '/signup/',
    component: SignUpPage,
    options: {
      transition: 'f7-circle',
    },
  },
  /*{
    path: '/editprofile/',
    component: EditProfilePage,
  },


  {
    path: '/request/',
    component: RequestPage,
  },
  {
    path: '/contact/',
    component: ContactPage,
  },*/
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
