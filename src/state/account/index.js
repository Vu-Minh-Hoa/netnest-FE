import { getDefaultState } from '../state'
import { SET_ACCOUNT_TOKEN } from './constants'

export const setAccountToken = (token) => ({
  type: SET_ACCOUNT_TOKEN,
  token,
})

export default function reducer(state = getDefaultState().account, action) {
  switch (action.type) {
    case SET_ACCOUNT_TOKEN:
      return { ...state, token: action.token }

    default:
      return state
  }
}

export const accountTokenSelector = (state) => state.account.token
