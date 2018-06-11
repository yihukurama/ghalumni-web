// use localStorage to store the authority info, which might be sent from server in actual project.
import {getLocalStorageKey} from './utils';

export function getAuthority() {
  return localStorage.getItem(getLocalStorageKey() + '-authority');
}

export function setAuthority(authority) {
  return localStorage.setItem(getLocalStorageKey() + '-authority', authority);
}
