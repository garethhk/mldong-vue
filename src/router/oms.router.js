import Layout from '@/layout'

export default [
  {
    path: '/oms',
    name: 'oms',
    meta: {
      icon: 'oms',
      title: '订单管理',
      access: ['admin', 'oms'],
      notCache: true,
      showAlways: true
    },
    component: Layout,
    children: [
      {
        path: '/oms/order/index',
        name: 'oms:order:index',
        meta: {
          icon: '',
          title: '订单列表',
          access: ['admin', 'oms:order:index'],
          notCache: true
        },
        component: (resolve) => {
          import('@/views/modules/oms/order/index.vue').then(m => {
            resolve(m)
          })
        }
      },
      {
        path: '/oms/orderSetting/index',
        name: 'oms:orderSetting:index',
        meta: {
          icon: '',
          title: '订单设置',
          access: ['admin', 'oms:orderSetting:index'],
          notCache: true
        },
        component: (resolve) => {
          import('@/views/modules/oms/orderSetting/index.vue').then(m => {
            resolve(m)
          })
        }
      }
    ]
  }
]
