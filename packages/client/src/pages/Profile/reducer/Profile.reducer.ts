export type ProfileState = {
  view: 'info' | 'editProfile' | 'editPassword'
}

export type ProfileAction =
  | { type: 'SHOW_INFO' }
  | { type: 'EDIT_PROFILE' }
  | { type: 'EDIT_PASSWORD' }

export const actionTypes = {
  SHOW_INFO: 'SHOW_INFO',
  EDIT_PROFILE: 'EDIT_PROFILE',
  EDIT_PASSWORD: 'EDIT_PASSWORD',
} as const

export const initialState: ProfileState = {
  view: 'info',
}

export const profileReducer = (
  state: ProfileState,
  action: ProfileAction
): ProfileState => {
  switch (action.type) {
    case actionTypes.EDIT_PROFILE:
      return { ...state, view: 'editProfile' }
    case actionTypes.EDIT_PASSWORD:
      return { ...state, view: 'editPassword' }
    case actionTypes.SHOW_INFO:
      return { ...state, view: 'info' }
    default:
      return state
  }
}
