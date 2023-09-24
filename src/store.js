import { createStore } from 'redux';
import {LOGIN_SUCCESS,PROFIL_CHANGE} from './actionsTypes.js';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


// const initialState = {
//   userProfile: null,
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'UPDATE_USER_PROFILE':
//       return {
//         ...state,
//         userProfile: action.payload,
//       };
//     default:
//       return state;
//   }
// };

const initialState = {
    loggedInUser: null,
  };

const persistConfig = {
  key: 'root',
  storage: storage, // Utilisez storage pour localStorage par défaut
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    case PROFIL_CHANGE:
    return {
      ...state,
      userProfile: action.payload,
    };
    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);