import {stringify} from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function accountLogin(data) {
  return request('/public/api/login', {
    ...data,
  });
}

export async function accountLogout() {
  return request('/public/api/logout');
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function queryFunc(data) {
  return request('/AdminBaseController/Func/list', {
    ...data,
  });
}

export async function getReachStoreQrcode(data) {
  return request('/recommandbusiness/api/createPerSonalwxa', {
    ...data,
  });
}

export async function queryWorkOrder(data) {
  const api = {
    list: '/BusinessBaseController/Workorder/list',
    load: '/BusinessBaseController/Workorder/load',
  }
  return request(api[data.api], {
    ...data,
  });
}

export async function subSystemApi(data) {
  const api = {
    list: '/AdminBaseController/Subsystem/list',
    load: '/AdminBaseController/Subsystem/load',
    create: '/AdminBaseController/Subsystem/create',
    remove: '/AdminBaseController/Subsystem/remove',
    update: '/AdminBaseController/Subsystem/update',
  }
  return request(api[data.api], {
    ...data,
  });
}


export async function adminBaseApi(data) {
  const modelName = data.modelName;
  const api = {
    list: '/AdminBaseController/' + modelName + '/list',
    load: '/AdminBaseController/' + modelName + '/load',
    create: '/AdminBaseController/' + modelName + '/create',
    remove: '/AdminBaseController/' + modelName + '/remove',
    update: '/AdminBaseController/' + modelName + '/update',
  }
  return request(api[data.api], {
    ...data,
  });
}


export async function businessBaseApi(data) {
  const modelName = data.modelName;
  const api = {
    list: '/BusinessBaseController/' + modelName + '/list',
    load: '/BusinessBaseController/' + modelName + '/load',
    create: '/BusinessBaseController/' + modelName + '/create',
    remove: '/BusinessBaseController/' + modelName + '/remove',
    update: '/BusinessBaseController/' + modelName + '/update',
  }
  return request(api[data.api], {
    ...data,
  });
}

