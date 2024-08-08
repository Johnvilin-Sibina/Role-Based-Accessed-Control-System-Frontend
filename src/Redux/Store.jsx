import { combineReducers, configureStore } from "@reduxjs/toolkit";
import employeeReducer from './Slice/employeeSlice';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import departmentReducer from './Slice/departmentSlice'


const rootReducer = combineReducers({
    employee:employeeReducer,
    department:departmentReducer
})

const persistConfig = {
    key:'root',
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false})
    }
})

export const persistor = persistStore(store)


// import { configureStore } from "@reduxjs/toolkit";
// import employeeReducer from './Slice/employeeSlice'


// export const store = configureStore({
//     reducer:{
//         employee:employeeReducer
//     }
// })