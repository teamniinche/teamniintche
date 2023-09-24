 import {LOGIN_SUCCESS,PROFIL_CHANGE,CHANTIER_TO_CHANGE} from './actionsTypes.js';
 // Définition de l'action creator
 export const loginSuccess = (user) => {
    return {
      type: LOGIN_SUCCESS,
      payload: user
    };
  };

  export const chantierToChange = (chantier) => {
    return {
      type: CHANTIER_TO_CHANGE,
      payload: chantier
    };
  };
  
  // Définition de l'action de mise à jour du state du store
  export const updateUserProfile = (user) => {
    return {
      type: PROFIL_CHANGE,
      payload: user
    };
  };