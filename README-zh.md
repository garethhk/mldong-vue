# mldong-vue

> 这是一个极简的 vue admin 管理后台。
[线上地址](http://vueadmin.mldong.com))

[国内访问](http://vueadmin.mldong.com)

[接口文档](http://api.mldong.com/doc.html)

## Extra

## 相关项目

- [mldong后台工程](https://gitee.com/mldong/mldong)



写了一个系列的教程配套文章，如何从零构建后一个完整的后台项目:



## Build Setup

```bash
# 克隆项目
git clone https://gitee.com/mldong/mldong-vue/

# 进入项目目录
cd mldong-vue

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://gitee.com/mldong/mldong-vue/)

## Demo

## 关于代码生成器

### 运行说明

#### 查看帮助

``` shell
node generate/index.js -h
```

```
Usage: index [options]
Options:
  -V, --version          output the version number
  -f, --file <type>      数据文件
  -d, --debug <type>     开启调试模式 (default: 1)
  -c, --config <type>    配置文件 (default: "config.json")
  -co, --covered <type>  是否覆盖(1->覆盖,0->不覆盖) (default: 0)
  -h, --help             display help for command
```

#### 指定某个元数据生成代码

``` shell
node generate/index.js -f sys_role.json
```

#### 指定某个元数据生成代码－覆盖式

``` shell
node generate/index.js -f sys_role.json -co 1
```

### 模板语法

#### 输出

##### 标准语法

```
<{value}>
<{data.key}>
<{data['key']}>
<{a ? b : c}>
<{a || b}>
<{a + b}>
```

##### 原始语法

``` 
<%= value %>
<%= data.key %>
<%= data['key'] %>
<%= a ? b : c %>
<%= a || b %>
<%= a + b %>
```

#### 原文输出，不转义

##### 标准语法

``` 
<{@ value }>
```

##### 原始语法

``` 
<%- value %>
```

#### 条件

##### 标准语法

``` 
<{if value}> ... <{/if}>
<{if value}> ... <{else}> ... <{/if}>
<{if v1}> ... <{else if v2}> ... <{/if>}
<{if v1}> ... <{else if v2}> ... <{else}> ... <{/if}>
```

##### 原始语法

```
<% if (value) { %> ... <% } %>
<% if (value) { %> ... <% } else { %>... <% } %>
<% if (v1) { %> ... <% } else if (v2) { %> ... <% } %>
<% if (v1) { %> ... <% } else if (v2) { %> ... <% }  else { %>... <% } %>
```

#### 循环

##### 标准语法

```
隐式定义，默认$value/$index
<{each target}>
    <{$index}} <{$value>}>
<{/each}>
显示定义
<{each target val index}>
    <{index}> <{val>}>
<{/each}>
```

##### 原始语法

```
<% for(var i = 0; i < target.length; i++){ %>
    <%= i %> <%= target[i] %>
<% } %>
```

#### 变量

##### 标准语法

```
<{set temp = data.sub.content}>
```

##### 原始语法

``` 
<% var temp = data.sub.content; %>
```

## 相关文章

 [打造一款适合自己的快速开发框架-先导篇](https://juejin.im/post/5eca0304518825432978055c) 

 [打造一款适合自己的快速开发框架-前端脚手架搭建](https://juejin.im/post/5eca049be51d457848684e16) 

[打造一款适合自己的快速开发框架-前端篇之登录与路由模块化](https://juejin.im/post/5eeb877bf265da02be0ce628)

[打造一款适合自己的快速开发框架-前端篇之框架分层及CURD样例](https://juejin.im/post/5eed4f81f265da02c94e1346) 

[打造一款适合自己的快速开发框架-前端篇之字典组件设计与实现](https://juejin.im/post/5ef2233ce51d45741e436c11) 

[打造一款适合自己的快速开发框架-前端篇之下拉组件设计与实现](https://juejin.im/post/5ef43301f265da22cb481369) 

[打造一款适合自己的快速开发框架-前端篇之选择树组件设计与实现](https://juejin.im/post/5ef563185188252e9a1fe26a) 

[打造一款适合自己的快速开发框架-前端篇之代码生成器](https://juejin.im/post/5ef6a6b16fb9a07e693a5eae) 

[打造一款适合自己的快速开发框架-前端篇之权限管理](https://juejin.im/post/5efcb274f265da22df3cc314) 