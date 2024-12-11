import { combineReducers, configureStore } from "@reduxjs/toolkit";
import applicationSlice from "./slice/applicationSlice.js"
import authSlice from "./slice/authSlice.js"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    application:applicationSlice,
    auth:authSlice
})


const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({

    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

})

export default store