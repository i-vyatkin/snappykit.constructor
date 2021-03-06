import axios from 'axios';
import { get } from 'lodash';

import models from './models';

const API = (
  method: Array<string | Object> | string,
  params: Object = {},
  { noCredentials } = {}
) => {
  if (!method) {
    return new Promise((resolve: Function) => resolve({ data: {} }));
  }

  const token = localStorage.getItem('token');
  const batch = []
    .concat(typeof method === 'string' ? { method, params } : method)
    .map((request: string | Object) => {
      const model = get(models, get(request, 'method', request));
      const url = get(model, 'url', '/');

      return model
        ? axios({
            ...(get(model, 'method') !== 'delete' && {
              data: get(request, 'params', params)
            }),
            headers: !noCredentials && {
              Authorization: `JWT ${token}`
            },
            method: get(model, 'method', 'get'),
            url:
              typeof url === 'function'
                ? url(get(request, 'params', params))
                : url
          })
        : new Promise((resolve: func, reject: func) =>
            reject(new Error('Undefined method!'))
          );
    });

  return batch.length > 1 ? axios.all(batch) : batch[0];
};

export default API;
