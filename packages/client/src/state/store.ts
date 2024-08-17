import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

const reducer = combineReducers({
  user: userReducer,
})

export const store = configureStore({
  reducer,
  preloadedState:
    typeof window !== 'undefined' && window.APP_INITIAL_STATE
      ? window.APP_INITIAL_STATE
      : undefined,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof reducer>
