import { configureStore,createSlice } from '@reduxjs/toolkit';
// import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';




const persistConfig = {
  key: 'root',
  storage: storage, // Utilisez storage pour localStorage par défaut
};

const counterSlice = createSlice({
    name: 'userNewChant',
    initialState:{loggedInUser: null,chantierToModifyName:null,nbreDeChantiers:null,local:{pos:[14.698230, -17.437130],index:0},index:0,chantier:null},
    reducers: {
      loggedAccess:(state, action) => {
        return {loggedInUser: action.payload,chantierToModifyName:null,local: {pos:[14.698230, -17.437130],index:0},}
        // return stat
    },
      modifyChantier: (state, action) => {
        return {...state, chantierToModifyName: action.payload}
        // return stat
    },
      chantiersCounter: (state, action) => {
        return {...state, nbreDeChantiers: action.payload}
        // return stat
    },
      localisation: (state, action) => {
        return {...state, local: action.payload}
        // return stat
    },
      setChantier: (state, action) => {
        return {...state, chantier: action.payload}
        // return stat
      },
      setIndex: (state, action) => {
        return {...state, index: action.payload}
        // return stat
      },
    },
  });

  // Exporter les actions générées automatiquement
export const { loggedAccess, modifyChantier,chantiersCounter,mapOpened,localisation,setChantier,setIndex} = counterSlice.actions;

//mon reduer
const reducer=counterSlice.reducer;
const persistedReducer=persistReducer(persistConfig,reducer)
export const store=configureStore({
    reducer:{
        userNewCh:persistedReducer
    }
})
export const persistor=persistStore(store)

// Exporter le réducteur
export default counterSlice.reducer;