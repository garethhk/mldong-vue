import Layout from '@/layout'

export default [
  {
    path: '/sys',
    name: 'sys',
    meta: {
      icon: 'sys',
      title: '系统设置',
      access: ['admin', 'sys'],
      notCache: true,
      showAlways: true
    },
    component: Layout,
    children: [
      {
        path: '/sys/menu/index',
        name: 'sys:menu:index',
        meta: {
          icon: '',
          title: '菜单管理',
          access: ['admin', 'sys:menu:index'],
          notCache: true
        },
        component: (resolve) => {
          import('@/views/modules/sys/menu/index.vue').then(m => {
            resolve(m)
          })
        }
      },
      {
        path: '/sys/user/index',
        name: 'sys:user:index',
        meta: {
          icon: '',
          title: '用户管理',
          access: ['admin', 'sys:user:index'],
          notCache: true
        },
        component: (resolve) => {
          import('@/views/modules/sys/user/index.vue').then(m => {
            resolve(m)
          })
        }
      },
      {
        path: '/sys/role/index',
        name: 'sys:role:index',
        meta: {
          icon: '',
          title: '角色管理',
          access: ['admin', 'sys:role:index'],
          notCache: true
        },
        component: (resolve) => {
          import('@/views/modules/sys/role/index.vue').then(m => {
            resolve(m)
          })
        }
      },
      {
        path: '/sys/dict/index',
        name: 'sys:dict:index',
        meta: {
          icon: '',
          title: '字典管理',
          access: ['admin', 'sys:dict:index'],
          notCache: true
        },
        component: (resolve) => {
          import('@/views/modules/sys/dict/index.vue').then(m => {
            resolve(m)
          })
        }
      },
      {
        path: '/sys/requestLog/index',
        name: 'sys:requestLog:index',
        meta: {
          icon: '',
          title: '日志管理',
          access: ['admin', 'sys:requestLog:index'],
          notCache: true
        },
        component: (resolve) => {
          import('@/views/modules/sys/requestLog/index.vue').then(m => {
            resolve(m)
          })
        }
      }
    ]
  }
]
