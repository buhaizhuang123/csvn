import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import page from '../router/page/page'
import publish from '../router/blogs/page'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      // 自定义跳转为博客首页
      path: '/',
      name: 'HelloWorld',
      redirect: 'blogs'
    },
    page, publish
  ]
})
