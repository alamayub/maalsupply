import HomePage from '../pages/home.vue';

//auth
import SignInPage from '../pages/auth/signin.vue';
import SignUpPage from '../pages/auth/signup.vue';
import EditProfilePage from '../pages/auth/editprofile.vue';

//chat
import RequestPage from '../pages/chat/requests.vue';
import ContactPage from '../pages/chat/contacts.vue';
import ChatPage from '../pages/chat/chat.vue';

//chatgroups
import ChatGroupsPage from '../pages/chatgroups/chatgroups.vue'
import NewGroupPage from '../pages/chatgroups/newgroup.vue'
import ChatGroup from '../pages/chatgroups/chatgroup.vue'
import AddMembers from '../pages/chatgroups/addmembers.vue'
import GroupMembers from '../pages/chatgroups/groupmembers.vue'
import GroupInfo from '../pages/chatgroups/groupinfo.vue'

/*import AllPhotosPage from '../pages/allphotos.vue';
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
  {
    path: '/editprofile/',
    component: EditProfilePage,
  },

  //chat
  {
    path: '/requests/',
    component: RequestPage,
  },
  {
    path: '/contacts/',
    component: ContactPage,
  },
  {
    path: '/chat/:frd',
    component: ChatPage,
  },

  //chatgroups
  {
    path: '/chatgroups/',
    component: ChatGroupsPage,
  },
  {
    path: '/newgroup/',
    component: NewGroupPage,
  },
  {
    path: '/chatgroup/:group',
    component: ChatGroup,
  },
  {
    path: '/addmembers/:group_name',
    component: AddMembers,
  },
  {
    path: '/groupmembers/:group_name',
    component: GroupMembers,
  },
  {
    path: '/groupinfo/:group_name',
    component: GroupInfo,
  },


  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
