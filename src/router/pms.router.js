import Layout from '@/layout'

export default [
  {
    path: '/pms',
    name: 'pms',
    meta: {
      icon: 'pms',
      title: '商品管理',
      access: ['admin', 'pms'],
      notCache: true,
      showAlways: true
    },
    component: Layout,
    children: [
      {
        path: '/pms/category/index',
        name: 'pms:category:index',
        meta: {
          icon: '',
          title: '商品分类',
          access: ['admin', 'pms:productCategory:index'],
          notCache: true
        },
        component: (resolve) => {
          import('@/views/modules/pms/productCategory/index.vue').then(m => {
            resolve(m)
          })
        }
      },
      {
        path: '/pms/product/index',
        name: 'pms:product:index',
        meta: {
          icon: '',
          title: '商品列表',
          access: ['admin', 'pms:product:index'],
          notCache: true
        },
        component: (resolve) => {
          import('@/views/modules/pms/product/index.vue').then(m => {
            resolve(m)
          })
        }
      },
      {
        path: '/pms/brand/index',
        name: 'pms:brand:index',
        meta: {
          icon: '',
          title: '品牌管理',
          access: ['admin', 'pms:brand:index'],
          notCache: true
        },
        component: (resolve) => {
          import('@/views/modules/pms/brand/index.vue').then(m => {
            resolve(m)
          })
        }
      }
    ]
  }
]
