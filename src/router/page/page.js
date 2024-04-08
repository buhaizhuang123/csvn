import page from '../../views/page/page'

var Page = {
  path: '/page',
  name: 'page',
  component: page,
  meta: {
    title : '首页'
  },
  children : [
    {
      path : '/blogs',
      name: 'blogs',
      component: () => import('@/views/page/blogs/blogs')
    }
  ]
}
export default {
  ...Page
}
