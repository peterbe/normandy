/* eslint import/prefer-default-export: "off" */

import {
  SERVICE_INFO_RECEIVE,
} from 'control_new/state/action-types';
import {
  makeApiRequest,
} from 'control_new/state/requests/actions';


export function fetchServiceInfo() {
  return async dispatch => {
    const requestId = 'fetch-service-info';
    const serviceInfo = await dispatch(makeApiRequest(requestId, 'v2/service_info/'));

    dispatch({
      type: SERVICE_INFO_RECEIVE,
      serviceInfo,
    });
  };
}
