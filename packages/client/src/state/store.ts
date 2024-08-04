import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

const reducer = combineReducers({
  user: userReducer,
})

export const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined'
      ? undefined
      : window.APP_INITIAL_STATE,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware(),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof reducer>
