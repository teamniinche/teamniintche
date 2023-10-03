import React,{useState,useLayoutEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';  //Le HOOK GETTER POUR LE CAS DE @REDUX/TOOLKIT
import {modifyChantier} from './stoore.js'  // ACTION Pour le HOOK SETTER pour le cas de @redux/toolkit
import {EditChantier} from './editionsOfItems.js';
import {convertToBase64,compressImage,dataURLtoFile} from './traitementImages.js';
import {UpdateProps,Poster} from './requetesFetch.js'

const NouveauChantier=()=> {
  // const item={name:"props.item.name",departement:"props.item.departement",dateAv:"props.item.dateAV",
  //             dateAp:"props.item.dateAp",imagesAv:"props.item.imagesAV",imagesAp:"props.item.imagesAp",redaction:"props.item.redaction"}
  // files : [file1,setFile1], [file2,setFile2], [file3,setFile3], [file4,setFile4], [file5,setFile5],
  // [chantierIdEtatN,sousTitre]
  const dispatch=useDispatch()
  const [item,setItem]=useState({
    id:0,
    name:"",
    departement:"",
    region:"",
    presentation:"",
    type:"réfection",
    dates:{debut:"01/01/1900",fin:"02/01/1900"},
      etat: {
        etat0: {
            linkImg: "chantier2Etat0.jpg",
            sTitre: "G"
        },
        etat1: {
            linkImg: "chantier2Etat1.jpg",
            sTitre: "G"
        },
        etat2: {
            linkImg: "chantier2Etat2.jpg",
            sTitre: "G"
        },
        etat3: {
            linkImg: "chantier2Etat3.jpg",
            sTitre: "H"
        },
        etat4: {
            linkImg: "",
            sTitre: ""
        }
      },
  

      etatLit:"",
      programme: {
        programme0: {
            linkImg: "chantier2Programme0.jpg",
            sTitre: "G"
        }
      },
      rendu: {
        rendu0: {
            linkImg: "chantier2Rendu0.jpg",
            sTitre: "G"
        },
        rendu1: {
            linkImg: "chantier2Rendu1.jpg",
            sTitre: "H"
        },
        rendu2: {
            linkImg: "chantier2Rendu2.jpg",
            sTitre: "H"
        },
        rendu3: {
            linkImg: "chantier2Rendu3.jpg",
            sTitre: "O"
        },
    },
    renduLit:"",
    bilan:""
  })
  const [file1,setFile1]=useState(null),[file2,setFile2]=useState(null),[file3,setFile3]=useState(null);
  const [file0,setFile0]=useState(null),[file4,setFile4]=useState(null),[file5,setFile5]=useState(null);
  const [file6,setFile6]=useState(null),[file7,setFile7]=useState(null),[file8,setFile8]=useState(null);
  const [nImg,setNImg]=useState({
  image0:{nomImg:'',sousTitre:''},image1:{nomImg:'',sousTitre:''},image2:{nomImg:'',sousTitre:''},
  image3:{nomImg:'',sousTitre:''},image4:{nomImg:'',sousTitre:''},image5:{nomImg:'',sousTitre:''},
  image6:{nomImg:'',sousTitre:''},image7:{nomImg:'',sousTitre:''},image8:{nomImg:'',sousTitre:''} });

  const [nombreDeChantiers,setNombreDeChantiers]=useState('');
  const idC=nombreDeChantiers.nbreCh;
  const ID=nombreDeChantiers.ID
  // Ces deux(testerSoustitres et indexArray) const à fusionner, mais pas pour l'instant
  const testerSoustitres=[nImg.image0.sousTitre,nImg.image1.sousTitre,nImg.image2.sousTitre,nImg.image3.sousTitre,nImg.image4.sousTitre,nImg.image5.sousTitre,nImg.image6.sousTitre,nImg.image7.sousTitre,nImg.image8.sousTitre]
  let Valid=(file0!==null?true:false && file1!==null?true:false &&file2!==null?true:false &&file3!==null?true:false &&file4!==null?true:false &&file5!==null?true:false &&file6!==null?true:false && file7!==null &&file8!==null?true:false
      && nImg.image0.nomImg!==''?true:false&& nImg.image1.nomImg!==''?true:false&& nImg.image2.nomImg!==''?true:false&& nImg.image3.nomImg!==''?true:false&& nImg.image4.nomImg!==''?true:false
      && nImg.image5.nomImg!==''?true:false&& nImg.image6.nomImg!==''?true:false&& nImg.image7.nomImg!==''?true:false&& nImg.image8.nomImg!==''?true:false)

// let Url='/api/membres/'+pseudo+'/'+prop+'/'+sProp
const indexArray=[
  [file0,"chantier"+idC+"Etat0"], //le 0 du ID à moduler aussi mais doit attendre pour l'instant:fait
  [file1,"chantier"+idC+"Etat1"],
  [file2,"chantier"+idC+"Etat2"],
  [file3,"chantier"+idC+"Etat3"],
  [file4,"chantier"+idC+"Rendu4"],
  [file5,"chantier"+idC+"Rendu5"],
  [file6,"chantier"+idC+"Rendu6"],
  [file7,"chantier"+idC+"Rendu7"],
  [file8,"chantier"+idC+"Programme8"]
]
//MISE A JOUR DU NOM ET SOUSTITRE DE IMAGE
// const prop=(n)=>{
//   if (n<=3){
//       return 'etat';
//   }else if(n<=7){
//       return 'rendu';
//   }else{
//       return 'programme'
//   }
// }
// const majTextImgNChantier=(prop,nom,sTitre)=>{      // '/api/nouveauChantier/:id/:prop/:nImg/:sousTitre'
//         fetch('/api/nouveauChantier/'+prop, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({nImage:nom,sousTitre:sTitre})
//           })
//             .then(response => {
//               if (response.ok) {
//                 return response.json();
//               } else {
//                 throw new Error('Erreur lors de la requête PUT');
//               }
//             })
//         } 
// FIN MISE A JOUR

const chantierAVide={
  id: 0,
  region: "",
  departement: "",
  name: "",
  type: "",
  dates: {
      debut: "",
      fin: ""
  },
  presentation: "",
  etat: {
      etat0: {
          linkImg: "",
          sTitre: ""
      },
      etat1: {
          linkImg: "",
          sTitre: ""
      },
      etat2: {
          linkImg: "",
          sTitre: ""
      },
      etat3: {
          linkImg: "",
          sTitre: ""
      },
      etat4: {
          linkImg: "",
          sTitre: ""
      }
  },
  etatLit:"",
  programme: {
      programme0: {
          linkImg: "",
          sTitre: ""
      }
  },
  rendu: {
      rendu0: {
          linkImg: "",
          sTitre: ""
      },
      rendu1: {
          linkImg: "",
          sTitre: ""
      },
      rendu2: {
          linkImg: "",
          sTitre: ""
      },
      rendu3: {
          linkImg: "",
          sTitre: ""
      },
      rendu4: {
          linkImg: "",
          sTitre: ""
      }
  },
  renduLit:"",
  bilan: ""
}
const handleModalClick=(e,actionneur)=>{
  if(e!==null && e!==undefined){e.preventDefault()}
  //actionneur pour identifier le bouton responsable(validateur ou enregistreur)
  if (actionneur==='Registrer'|| true){
    UpdateProps('/api/chantiers/majProps/'+ID,item) //Mise à jour des autres props (non nested props): id à determiner
    UpdateProps('/api/chantiers/'+ID,item.dates) //Mise à jour des dates(props nested)
    for(let i=0;i<9;i++){
      let file=indexArray[i][0]
      // let stitre=indexArray[i][1]
      const prop=(n)=>{if (n<=3){return 'etat';}else if(n<=7){return 'rendu';}else{return 'programme'}}
      if((file!==null && file!=='') ||testerSoustitres[i]!==''){//provisoire
        if(testerSoustitres[i]===''){alert('Les sous_titres des images déjà chargées sont obligatoires avant de les enregistrer !')}
        else{
            // console.log(nImg['image'+i])
            let nomFichier=nImg['image'+i].nomImg
            let sousTitre=nImg['image'+i].sousTitre
            // majTextImgNChantier(prop(i),nomFichier,sousTitre)
            fetch('/api/chantiers/nouveauChantier/'+ID+'/'+prop(i), { //Mise à jour des props nested (etat,rendu et programme) :id à determiner
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({nImage:nomFichier,sousTitre:sousTitre})
            })
            .then(response => {
                            if (response.ok) {
                              return ;
                            } else {
                              throw new Error('Erreur lors de la requête PUT');
                            }
                          })
            // console.log(nomFichier)
            let stringFichier=nomFichier.split('.')[0]
            // console.log(stringFichier)
            let nameInForm=indexArray[i][1]
            // console.log(stringFichier)
            const formData = new FormData();
            // console.log(nameInForm)
            // console.log(images)
            formData.append(nameInForm, file); //images=nom dans le formulaire: a determiner
            fetch('/uploadimage/'+stringFichier+'/'+nameInForm, {
                method: 'POST',
                body: formData,
                })
                .then(response => response.json())
                .then(data => {console.log('i');}) // Réponse JSON du serveur
                .catch(error => {console.error(error);});
            // UpdateProps(Url,fileName);
          }
        }else{
          if(file!==null || file!==''){
              const imageData={nImage:'',sousTitre:''}
              UpdateProps('/api/chantiers/nouveauChantier/'+ID+'/'+prop(i),imageData)
          }
          
        }}
      if(actionneur==='Valider' && Valid){
        Poster('/api/chantiers/newChantier',{...item,id:idC})
        UpdateProps('/api/chantiers/nouveauChantier',chantierAVide)
      }
  }else{alert("VALIDATION REFUSEE : Des données essentielles sont manquantes !")}
}

  const Setter=(file,name,n,sTitre,bool)=>{
    switch (n){
      case '0':
        if(bool){setFile0(file);}
        else{setNImg({...nImg,image0:{nomImg:name,sousTitre:sTitre}});}
        break;
      case '1':
        if(bool){setFile1(file);}
        else{setNImg({...nImg,image1:{nomImg:name,sousTitre:sTitre}});}
        break;
      case '2':
        if(bool){setFile2(file);}
        else{setNImg({...nImg,image2:{nomImg:name,sousTitre:sTitre}});}
        break;
      case '3':
        if(bool){setFile3(file);}
        else{setNImg({...nImg,image3:{nomImg:name,sousTitre:sTitre}});}
        break;
      case '4':
        if(bool){setFile4(file);}
        else{setNImg({...nImg,image4:{nomImg:name,sousTitre:sTitre}});}
        break;
      case '5':
        if(bool){setFile5(file);}
        else{setNImg({...nImg,image5:{nomImg:name,sousTitre:sTitre}});}
        break;
      case '6':
        if(bool){setFile6(file);}
        else{setNImg({...nImg,image6:{nomImg:name,sousTitre:sTitre}});}
        break;
      case '7':
        if(bool){setFile7(file);}
        else{setNImg({...nImg,image7:{nomImg:name,sousTitre:sTitre}});}
        break;
      default:
        if(bool){setFile8(file);}
        else{setNImg({...nImg,image8:{nomImg:name,sousTitre:sTitre}});}

    }
  }
  const handleImgChange=(file,string,n,sTitre,bool)=>{
    document.getElementById("id2").style.display="inline";
    document.getElementById("id1").style.display="none";
    Setter(file,string,n,sTitre,bool)
  }
  // nImg & item
  const name=useSelector(state=>state.userNewCh.chantierToModifyName) //Le HOOK GETTER pour le cas de @redux/toolkit
  useLayoutEffect(()=>{
  document.getElementById("id2").style.display="none";
 if(name===null){
    fetch('/api/chantiers/getNewChantier/64ea4cd959615516c76ae0b2') 
      .then(response => response.json())
      //chantier={chantier:...,nombreDeChantiers:...} i.e chantier is in a object here
      .then(data => {setItem(data.chantier);setNombreDeChantiers({nbreCh:data.nbreChantiers,ID:'64ea4cd959615516c76ae0b2'})}) //chantier.nombreDeChantiers
      .catch(error => console.log(error)); // Stocke uniquement le message de l'erreur
  }else{
    fetch('/api/chantiers/'+name) //+ID)
    .then(response => response.json())
    //chantier=chantier i.e chantier is the object
    .then(data => {setItem(data.chantier);setNombreDeChantiers({nbreCh:data.chantier.id,ID:data.ID})})
    .catch(error => console.log(error));     
  }
            },[name])

  function handleChange(element,valeur){
    document.getElementById("id2").style.display="inline";
    document.getElementById("id1").style.display="none";
    if(element.toUpperCase().includes('DATE')){
      if(element==='Date'){setItem({...item,dates:{...item.dates,debut:valeur}})}
      else{setItem({...item,dates:{...item.dates,fin:valeur}})}
    }else{setItem({...item,[element]:valeur})}
   }

  // const handleTextareaChange=(e)=>{

  // }

  const handleEnregistrerClick=()=>{
    if(document.getElementById("id2").style.display==="inline"){// "si Enregistrer cliqué alors qu'en modif"
    handleModalClick(null,'Registrer')
    document.getElementById("id2").style.display="none";
    document.getElementById("id1").style.display="inline";
    }}
    const numero=idC+1
    const label=name===null?'Nouveau Chantier '+ numero:'Modifier Chantier '+ numero;
    return (
    <div className="divtech" style={{paddingTop:"85px",width:"100vw"}} id="divTechPceo">
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:"0px 10%",height:"3em",borderBottom:"1px dotted grey"}}>
            <div style={{position:"relative",width:"1.5em",height:"1.5em",border:"0.5em double white",borderRadius:"50%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <i className="fas fa-xmark" id="id2" style={{color:"rgba(200,0,0,.6)",float:"left"}}></i>
                <i className="fas fa-check" id="id1" style={{color:"rgba(0,100,0,.8)",float:"left"}}></i>
            </div>
            <h2 style={{margin:"0px",textAlign:"center",padding:"0px"}}>{label}</h2>
            <Link style={{width:"2.3em",height:"2.5em",backgroundColor:"yellow",borderLeft:"0.3em solid green",borderRight:"0.3em solid red",borderRadius:"50%",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}><i className="fas fa-save" id="id3" onClick={handleEnregistrerClick}></i></Link>
        </div>
        <EditChantier item={item} render={(element,valeur)=>handleChange(element,valeur)} >
            <div style={{backgroundColor:"rgba(0,150,0,.5)",margin:"0px",padding:"5px",width:"100%",height:"fit-content",border:"0px",display:"grid",gridTemplate:"32% 32% 20%/50% 50%",overflow:"hidden"}}>
                <Img  pour="Etat" titre={nImg.image0.nomImg} srcSTitre={item.etat.etat0} item={{name:"chantier"+idC+"Etat0"}} numero="0" render={(file,string,n,sTitre,bool)=>handleImgChange(file,string,n,sTitre,bool)}/>
                <Img  pour="Etat" titre={nImg.image1.nomImg} srcSTitre={item.etat.etat1}  item={{name:"chantier"+idC+"Etat1"}} numero="1" render={(file,string,n,sTitre,bool)=>handleImgChange(file,string,n,sTitre,bool)}/>
                <Img  pour="Etat" titre={nImg.image2.nomImg} srcSTitre={item.etat.etat2}  item={{name:"chantier"+idC+"Etat2"}} numero="2" render={(file,string,n,sTitre,bool)=>handleImgChange(file,string,n,sTitre,bool)}/>
                <Img  pour="Etat" titre={nImg.image3.nomImg} srcSTitre={item.etat.etat3}  item={{name:"chantier"+idC+"Etat3"}} numero="3" render={(file,string,n,sTitre,bool)=>handleImgChange(file,string,n,sTitre,bool)}/>
                <textarea  value={item.etatLit} name="textarea1" id={"id4"} cols="" rows="15" style={{height:"50vw",marginTop:"15px",gridColumn:"1/3"}} placeholder={"props.placeholder"} onChange={(e)=>handleChange('etatLit',e.target.value)}></textarea>
            </div>
            <div style={{backgroundColor:"rgba(250,160,0,.5)",margin:"0px",padding:"5px",width:"100%",height:"fit-content",border:"0px",display:"grid",gridTemplate:"10% 90%/100%"}}>
                <label style={{width:"100%",height:"1.5em",padding:"1em 0px",margin:"0px",fontWeight:"bold",letterSpacing:"2px",textDecoration:"2px underline dotted brown"}}>🔸Programme des travaux<span id="titreCahe" style={{color:"rgba(0,0,0,.2)",fontSize:"1px"}}>{"props.item.titre"}</span></label>
                <Img  pour="Programme" titre={nImg.image8.nomImg}  srcSTitre={item.programme.programme0}   item={{name:"chantier"+idC+"Programme0"}} numero="8" render={(file,string,n,sTitre,bool)=>handleImgChange(file,string,n,sTitre,bool)}/>
            </div>
            <div style={{backgroundColor:"rgba(100,0,0,.5)",margin:"0px",padding:"5px",width:"100%",height:"fit-content",border:"0px",display:"grid",gridTemplate:"32% 32% 20%/50% 50%",overflow:"hidden"}}>
                <Img  pour="Rendu" titre={nImg.image4.nomImg} srcSTitre={item.rendu.rendu0}   item={{name:"chantier"+idC+"Rendu0"}} numero="4" render={(file,string,n,sTitre,bool)=>handleImgChange(file,string,n,sTitre,bool)}/>
                <Img  pour="Rendu" titre={nImg.image5.nomImg} srcSTitre={item.rendu.rendu1}   item={{name:"chantier"+idC+"Rendu1"}} numero="5" render={(file,string,n,sTitre,bool)=>handleImgChange(file,string,n,sTitre,bool)}/>
                <Img  pour="Rendu" titre={nImg.image6.nomImg} srcSTitre={item.rendu.rendu2}  item={{name:"chantier"+idC+"Rendu2"}} numero="6" render={(file,string,n,sTitre,bool)=>handleImgChange(file,string,n,sTitre,bool)}/>
                <Img  pour="Rendu" titre={nImg.image7.nomImg} srcSTitre={item.rendu.rendu3}  item={{name:"chantier"+idC+"Rendu3"}} numero="7" render={(file,string,n,sTitre,bool)=>handleImgChange(file,string,n,sTitre,bool)}/>
                <textarea  value={item.renduLit} name="textarea4" id={"id4"} cols="" rows="15" style={{height:"50vw",marginTop:"15px",gridColumn:"1/3"}} placeholder={"props.placeholder"} onChange={(e)=>handleChange('renduLit',e.target.value)}></textarea>
            </div>
            <div style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"flex-start"}}>
                <button className="succesButton"  onClick={(e)=>handleModalClick(e,'Valider')}>Valider</button>
                <button className="dangerButton" onClick={()=>dispatch(modifyChantier(null))}>Abandonner</button>
            </div>
        </EditChantier>
    </div>
  )
}

export function Img(props) {
  const [sTitreImg,setSTitreImg]=useState(props.srcSTitre.sTitre)
  let idImage='img'+props.item.name
  let numero=props.numero
  let nomImage=props.item.name
  const avatar='avatar.webp';
  let imageSrc=props.srcSTitre.linkImg!==''?props.srcSTitre.linkImg:avatar;
  let src=require('./images/'+imageSrc)
  const handleInputFileChange=async (e)=>{
      const input =e.target;
      if (input.files && input.files[0]){
          let file=input.files[0]
          let quality=null,wH=null
          if(nomImage.includes('Rendu')){quality=1;wH=300;}else if(nomImage.includes('Programme')){quality=0.6;wH=300}else{quality=0.2;wH=150}
          const base64Image = await convertToBase64(file); //on prend le base64 si le formatFile ne fonctionne pas.
          const compressedImage = await compressImage(base64Image,quality,wH);
          const compressedFile=dataURLtoFile(compressedImage,file.name)
          props.render(compressedFile,null,numero,null,true)

          const reader = new FileReader();
          reader.onload = function (e) {
          const image = document.getElementById(idImage);
          image.src=compressedImage;
          // image.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
  }

  const handleInputTextChange=(e)=>{
    setSTitreImg(e.target.value)
    let nomImageAEnregistrer=nomImage +'.jpg'
    props.render(null,nomImageAEnregistrer,numero,e.target.value,false)
  }
  // '45.5w'
return (
  <div style={{gridColumn:props.gridCol,margin:"0px",padding:"2vw 1.5vw",paddingLeft:"0px",width:'45.5vw',height:"47vw",position:"relative",border:"0px",marginBottom:'0px',marginTop:"16px"}}>
      <span style={{position:'absolute',display:"inine-block",width:"100%",fontSize:"15px",top:"-10px",left:"10px",color:"blue",fontWeight:"bold",height:"fit-content",margin:"0px",padding:"0px"}} >{props.titre} </span>
      <img src={src} id={idImage} alt={props.pour+numero} style={{float:"left",margin:"1%",padding:"0px",width:"98%",height:'95%',border:"none"}}/>
      <input id={'inputFile'+nomImage} style={{position:"absolute",top:"45%",left:"4vw",marginBottom:'20px'}} type='file' name={'file'+nomImage} accept='image/*' onChange={(e)=>handleInputFileChange(e)}/>
      <input value={sTitreImg} id={'inputText'+nomImage} maxLength={50} style={{position:"absolute",top:"88%",bottom:"0vw",left:"0%",width:"92%"}} type='text' name={'text'+nomImage} accept='image/*' placeholder={'sous-titre '+ numero} onChange={(e)=>handleInputTextChange(e)}/>
  </div>
)
}

// const mapStateToProps = (state) => {
//   return {
//     chantier: state.chantier,
//   };
// };
// export default connect(mapStateToProps)(NouveauChantier);
export default NouveauChantier;

