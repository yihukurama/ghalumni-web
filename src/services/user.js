import request from '../utils/request';
import {getLocalStorageKey} from '../utils/utils';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/public/api/getAuths', {
    params: {
      secret: localStorage.getItem(getLocalStorageKey() + '_secret'),
    },
  });
}
