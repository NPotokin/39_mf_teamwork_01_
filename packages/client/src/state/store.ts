import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
