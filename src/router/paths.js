const paths = [{
  path: '/',
  meta: {},
  name: 'Root',
  redirect: {
    name: 'Dashboard'
  }
},
  {
    path: '/dashboard',
    meta: {breadcrumb: true},
    name: 'Dashboard',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy" */
      `@/pages/Dashboard.vue`
      )
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: () => import(
      /* webpackChunkName: "routes" */
      /* webpackMode: "lazy-once" */
      `@/pages/Login.vue`
      )
  },
];
export default paths
