import { createSlice } from '@reduxjs/toolkit';

// Créer un slice de réducteur
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    incrementByAmount: (state, action) => state + action.payload,
  },
});

// const counteSlice = createSlice({
//     name: 'counter',
//     initialState:{loggedInUser: null,modifyChantier:null},
//     reducers: {
//       loggedAccess:(state, action) => {return {...state, loggedInUser: action.payload,}},
//       modifyChantier: (state, action) => {return {...state, chantierToModifyID: action.payload,}},
//     },
//   });

// Exporter les actions générées automatiquement
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Exporter le réducteur
export default counterSlice.reducer;