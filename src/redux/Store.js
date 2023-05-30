import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './AuthSlice'

const persistConfig = {
  key: 'root',
  storage
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const Store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:false
    })
})

export const persistor = persistStore(Store)