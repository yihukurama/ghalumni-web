import request from './utils/request';
import {setAuthority} from './utils/authority';
import {getLocalStorageKey} from './utils/utils';

export function init(callback) {
  const _uid = localStorage.getItem(getLocalStorageKey());
  if (_uid) {
    request('/public/api/islogin', {
      method: 'get',
      params: {
        uid: _uid,
      },
    })
      .then((res) => {
        if (res.success) {
          setAuthority('user');
        } else {
          setAuthority('');
        }
        callback();
      });
  } else {
    setAuthority('');
    callback();
  }
}
