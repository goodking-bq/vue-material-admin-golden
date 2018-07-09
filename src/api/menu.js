const Menu = [
  {header: 'Apps'},
  {
    title: '首页',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
  },
]

const getMenu = () => {
  return this.$http.get('api/menus/')
}


export default getMenu;
