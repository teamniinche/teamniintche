import React,{useState} from 'react';
import {ConversionFunction} from './imgConversion.js'
// import path from 'path';

// import axios from 'axios';
// const chantiers=require('./chantiers.json');


export default function Inscription() {
  const [state,setState]=useState({name:"",nom:"",images:[]})
  const [chantiers,setChantiers]=useState({})
  const [error,setError]=useState("")
  const [images,setImages]=useState(null)
  const [imgName,setImgName]=useState('')
  const [imgConversion,setImgConversion]=useState('')
  // let jstr=JSON.stringify(state)
  // console.log(jstr)
  // // console.log(jstrArray.json())
  // let jsOb=JSON.parse(JSON.stringify(state))
  // console.log(jsOb.prenom)
  function oClick(){

    fetch('/api/membres/membre0')
    .then(response => response.json())
    .then(rubriques => {
      setChantiers(rubriques)
      console.log(rubriques)
    })
    .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
    

// if (error) {
//   return <div>Une erreur s'est produite : {error}</div>;
// }

const PostElem=()=> {fetch('/api/apprendre', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(state)
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Erreur lors de la requête POST');
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });}

  const UpdateProp=()=> {fetch('/api/apprendre/0', {
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
        throw new Error('Erreur lors de la requête PUT');
      }
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });}
  
  //   RESCUSSES ABSOLUES: axios.post('/api/apprendre', state)
  // .then(response => {
  //   console.log('Réponse du serveur :', response.data);
  // })
  // .catch(error => {
  //   console.error('Erreur lors de la requête POST :', error);
  // });


    // fetch('/api/apprendre')
    //     .then(response => response.json())
    //     .then(chantiers => {
    //       let membre="membre"+0
    //       chantiers[membre].id=100
    //       console.log('👇chantiers apres modification "chantiers["membre0"].id=100"')
    //       console.log(chantiers["membre0"].id)
    //       let parsedData=Object.values(chantiers)
    //       parsedData.map(chantier=>console.log(chantier["id"]));
    //       let filtredData=parsedData.filter(chantier=>chantier["id"]===100)
    //       console.log(filtredData)
    //       setChantiers(chantiers)})
    //     .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
    
    
    // if (error) {
    //   return <div>Une erreur s'est produite : {error}</div>;
    // }
    // let membre="membre"+0
    // chantiers[membre].id=100


    // console.log('👇chantiers apres modification "chantiers["membre0"].id=100"')
    // console.log(chantiers["membre0"].id)

// let parsedData=Object.values(chantiers)
// parsedData.map(chantier=>console.log(chantier["id"]));
// let filtredData=parsedData.filter(chantier=>chantier["id"]===100)
// console.log(filtredData)
    


    // let myarray=Object.values(Object.values(chantiers))
    // console.log('👇Object.values(Object.values(chantiers))')
    // console.log(myarray)
    // // console.log('👇Modifier "prenom" de Object.values(chantiers)')
    // // myarray[0]={prenom:"ndeye fatou"}
    // console.log('👇JSON.stringify(chantiers)')
    // console.log(JSON.stringify(chantiers))
    // console.log('👇JSON.stringify(Object.values(chantiers))')
    // let myJson=JSON.stringify(myarray)
    // console.log(myJson)

    // let objet=premierObjet[1]
    // objet.id=90

    // console.log(JSON.stringify(objet))
      // fetch('/changerprenom',
      // {
      //   method: 'POST',
      //   headers: {
      //       'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({prenom:"maaaaaaaaaaaamaaaaaaaaaaaaaaadou"})
      //   })
    }
  function handleChange(e){
    let target=e.target.name
    let value=e.target.value
    setState({...state,[target]:value})
  }
  function testHandleImagesChange(e){
        ConversionFunction(e)
        const input =e.target;
        if (input.files && input.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const image = document.getElementById('imgAconvertir');
            image.src = e.target.result;
          };
          reader.readAsDataURL(input.files[0]);
          setImgConversion(input.files[0].name)
        }
      // const file= e.target.files[0]; // Récupérer le fichier sélectionné
      // setImages(file)
      // setImgName('ndourFichier')
      // console.log(file.name)
    //bloc0
      // const formData = new FormData();
      // formData.append('images', e.target.files[0]); // Ajouter le fichier à l'objet FormData avec le nom "image"
    // console.log(formData.toString());
    //   fetch('/upload', {
    //     method: 'POST',
    //     body: formData,
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data); // Réponse JSON du serveur
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
      // bloc0
    // console.log(imagesSelected)
  }
  
 //Chargement & uploading d'images 1) et 2)
    // 1)Au chargement
  function handleImagesChange(e){
    const file= e.target.files[0]; // Récupérer le fichier sélectionné
    setImages(file)
    setImgName('ndourFichier')
    console.log(file.name)
  }
    // 2)Uploading de l'image
  function onClick() {
    const formData = new FormData();
    console.log(images)
    formData.append('images', images); 
    fetch('/uploadimage/'+imgName, {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Réponse JSON du serveur
        })
        .catch(error => {
          console.error(error);
        });
  }

  return (
    <div style={{display:"flex",flexDirection:"column",width:"'40%",margin:"15vh 30%",backgroundColor:"grey",alignItems:"center",height:"100vh",justifyContent:"space-around"}}>
      <span>inscription</span>
      {/* <label htmlFor="name">Prenom</label>
      <input name="name" onChange={(e)=>{handleChange(e)}}/>
      <label htmlFor="nom">Nom</label>
      <input name="nom" onChange={(e)=>{handleChange(e)}}/> */}
      <label htmlFor="images">Images</label>
      <input type="file" name="images" onChange={(e)=>{testHandleImagesChange(e)}}/>
      <button onClick={onClick}>Enregistrer les modifs</button>
      <p style={{margin:'0px',padding:'0px'}}>{imgConversion}</p>
      <img src='' alt='testConversionImage' id='imgAconvertir' style={{width:'200px',height:'200px'}}/>
      <span className="visionnage">{}</span>
    </div>
  )
}
