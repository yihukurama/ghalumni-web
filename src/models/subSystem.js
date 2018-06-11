import {subSystemApi} from '../services/api';

export default {
  namespace: 'subSystem',
  state: {
    data: [],
    total: '',
  },

  effects: {
    * fetch({payload}, {call, put}) {
      payload.api = 'list';
      const response = yield call(subSystemApi, payload);
      yield put({
        type: 'save',
        saveData: {
          data: response.data,
          total: response.total,
        }
      });
    },

    * add({payload, callback}, {call, put}) {
      payload.api = 'create';
      const response = yield call(subSystemApi, payload);

      yield put({
        type: 'save',
        saveData: {
          data: this.data.push(response.data),
        },
        payload: response,
      });
      if (callback) callback(response);
    },
    * remove({payload, callback}, {call, put}) {
      payload.api = 'remove';
      const response = yield call(subSystemApi, payload);

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
