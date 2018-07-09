import {isUrl} from '../utils/utils';

const menuData = [
//   {
//   name: 'dashboard',
//   icon: 'dashboard',
//   path: 'dashboard',
//   children: [{
//     name: '分析页',
//     path: 'analysis',
//   }, {
//     name: '监控页',
//     path: 'monitor',
//   }, {
//     name: '工作台',
//     path: 'workplace',
//     // hideInMenu: true,
//   }],
// },
//   {
//   name: '工单',
//   icon: 'table',
//   path: 'page=workOrder&current=1',
//   children: [{
//     name: '工单一览',
//     path: 'workOrder-list',
//   }],
// },
  {
  name: '开发人员配置',
  icon: 'table',
  path: 'page=adminDevConfig&current=1',
  children: [{
    name: '平台子系统',
    path: 'subSystem-list',
  }, {
    name: '系统菜单管理',
    path: 'menue-list',
  }, {
    name: '系统功能管理',
    path: 'func-list',
  }],
}, {
  name: '系统运行参数',
  icon: 'table',
  path: 'page=adminRunConfig&current=1',
  children: [{
    name: '短信模板配置',
    path: 'SMS-list',
  }, {
    name: '系统参数配置',
    path: 'configuration-list',
  }],
}, {
  name: '资料档案管理',
  icon: 'table',
  path: 'page=adminOrg&current=1',
  children: [{
    name: '组织机构',
    path: 'organization-list',
  }, {
    name: '部门管理',
    path: 'department-list',
  }, {
    name: '网点管理',
    path: 'serviceBranch-list',
  }, {
    name: '员工管理',
    path: 'employee-list',
  }],
}, {
  name: '系统账号权限',
  icon: 'table',
  path: 'page=userAccount&current=1',
  children: [{
    name: '账号管理',
    path: 'userAccount-list',
  }, {
    name: '角色管理',
    path: 'role-list',
  }],
}, {
  name: '微信业务',
  icon: 'table',
  path: 'page=wechatAccount&current=1',
  children: [{
    name: '微信用户管理',
    path: 'wechatAccount-list',
  }],
},
//   {
//   name: '表单页',
//   icon: 'form',
//   path: 'form',
//   children: [{
//     name: '基础表单',
//     path: 'basic-form',
//   }, {
//     name: '分步表单',
//     path: 'step-form',
//   }, {
//     name: '高级表单',
//     authority: 'admin',
//     path: 'advanced-form',
//   }],
// }, {
//   name: '列表页',
//   icon: 'table',
//   path: 'page=table&current=1',
//   children: [{
//     name: '查询表格',
//     path: 'table-list',
//   }, {
//     name: '标准列表',
//     path: 'basic-list',
//   }, {
//     name: '卡片列表',
//     path: 'card-list',
//   }, {
//     name: '搜索列表',
//     path: 'search',
//     children: [{
//       name: '搜索列表（文章）',
//       path: 'articles',
//     }, {
//       name: '搜索列表（项目）',
//       path: 'projects',
//     }, {
//       name: '搜索列表（应用）',
//       path: 'applications',
//     }],
//   }],
// }, {
//   name: '详情页',
//   icon: 'profile',
//   path: 'page=profile',
//   children: [{
//     name: '基础详情页',
//     path: 'profile/basic',
//   }, {
//     name: '高级详情页',
//     path: 'profile/advanced',
//     authority: 'user',
//   }],
// }, {
//   name: '结果页',
//   icon: 'check-circle-o',
//   path: 'result',
//   children: [{
//     name: '成功',
//     path: 'success',
//   }, {
//     name: '失败',
//     path: 'fail',
//   }],
// }, {
//   name: '异常页',
//   icon: 'warning',
//   path: 'exception',
//   children: [{
//     name: '403',
//     path: '403',
//   }, {
//     name: '404',
//     path: '404',
//   }, {
//     name: '500',
//     path: '500',
//   }, {
//     name: '触发异常',
//     path: 'trigger',
//     hideInMenu: true,
//   }],
// }, {
//   name: '账户',
//   icon: 'user',
//   path: 'user',
//   authority: 'guest',
//   children: [{
//     name: '登录',
//     path: 'login',
//   }, {
//     name: '注册',
//     path: 'register',
//   }, {
//     name: '注册结果',
//     path: 'register-result',
//   }],
// }
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let {path} = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
