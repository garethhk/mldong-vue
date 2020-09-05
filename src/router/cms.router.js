import Layout from '@/layout'

export default [
  {
    path: '/cms',
    name: 'cms',
    meta: {
      icon: 'cms',
      title: '内容管理',
      access: ['admin', 'cms'],
      notCache: true,
      showAlways: true
    },
    component: Layout,
    children: [
      {
        path: '/cms/category/index',
        name: 'cms:category:index',
        meta: {
          icon: '',
          title: '栏目管理',
          access: ['admin', 'cms:category:index'],
          notCache: true,
          tagName: '内容-栏目管理'
        },
        component: (resolve) => {
          import('@/views/modules/cms/category/index.vue').then(m => {
            resolve(m)
          })
        }
      },
      {
        path: '/cms/model/index',
        name: 'cms:model:index',
        meta: {
          icon: '',
          title: '模型管理',
          access: ['admin', 'cms:model:index'],
          notCache: true
        },
        component: (resolve) => {
          import('@/views/modules/cms/model/index.vue').then(m => {
            resolve(m)
          })
        }
      },
      {
        path: '/cms/article/index',
        name: 'cms:article:index',
        meta: {
          icon: '',
          title: '文章管理',
          access: ['admin', 'cms:article:index'],
          notCache: true
        },
        component: (resolve) => {
          import('@/views/modules/cms/article/index.vue').then(m => {
            resolve(m)
          })
        }
      }
    ]
  }
]
