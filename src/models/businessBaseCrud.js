import {businessBaseApi} from '../services/api';
import {message} from "antd/lib/index";

export default {
  namespace: 'businessBaseCrud',
  state: {
    data: [],
    total: '',
  },

  effects: {
    * fetch({payload, callback, noSave}, {call, put}) {
      payload.api = 'list';
      for (var p in payload.params) {
        if (payload.params[p] == "") {
          payload.params[p] = null;
        }
      }
      const response = yield call(businessBaseApi, payload);

      if (!noSave) {
        yield put({
          type: 'save',
          saveData: {
            data: response.data,
            total: response.total,
          }
        });
      }
      if (callback) callback(response);
    },
    * fetchDetail({payload, callback}, {call}) {
      payload.api = 'load';
      const response = yield call(businessBaseApi, payload);

      if (callback) callback(response);
    },
    * add({payload, callback}, {call}) {
      payload.api = 'create';
      for (var p in payload.params) {
        if (payload.params[p] == "") {
          payload.params[p] = null;
        }
      }
      const response = yield call(businessBaseApi, payload);

      if (response) {
        message.success(response.msg);
      }
      if (callback) callback(response);
    },
    * remove({payload, callback}, {call}) {
      payload.api = 'remove';
      for (var p in payload.params) {
        if (payload.params[p] == "") {
          payload.params[p] = null;
        }
      }
      const response = yield call(businessBaseApi, payload);
      if (response) {
        message.success(response.msg);
      }
      if (callback) callback(response);
    },
    * update({payload, callback}, {call}) {
      payload.api = 'update';
      for (var p in payload.params) {
        if (payload.params[p] == "") {
          payload.params[p] = null;
        }
      }
      const response = yield call(businessBaseApi, payload);
      if (response) {
        message.success(response.msg);
      }
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.saveData
      };
    },
  },
};
