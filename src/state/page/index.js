import { getDefaultState } from '../state';

export default function reducer(state = getDefaultState().page, action) {
  switch (action.type) {
    default:
      return state;
  }
}
