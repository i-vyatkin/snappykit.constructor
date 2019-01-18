import {
  SET_BUSY,
  SET_VIEW,
} from './types';

export const setBusy = (busy: bool): func =>
  ({ type: SET_BUSY, busy });

export const setView = (view: string): func => (dispatch: func): void => {
  dispatch({ type: SET_BUSY, busy: true });
  dispatch({ type: SET_VIEW, view });
};
