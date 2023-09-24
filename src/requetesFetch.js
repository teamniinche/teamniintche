
export const UpdateProps=(url,state)=> {fetch(url, {
    // '/api/apprendre/0/name'
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(state)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    })
    .then(data => {
      // console.log(data);
      alert('Mise à jour réussie !')
    })
    .catch(error => {
      console.error(error);
    });}

export const Poster=(url,state)=>{
  fetch(url,
      {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
        }
  )}
export const ObtenirDonnee=(url)=>{
  
}