// class Chantier extends React.Component{
//     constructor(props){
//         super(props);
//         this.onClick=this.onClick.bind(this);
//         this.dateDebut=this.props.chantier.dates.debut;
//         this.dateFin=this.props.chantier.dates.fin;
//     }
//     intervalDate=(date1,date2)=>{
//       let date1Splited=date1.split('-')
//       let date2Splited=date2.split('-')
//       let arrayOfMonth=['Janv.','Fév.','Mar.','Avr.','Mai','Juin','Juil.','Aout','Sept.','Oct.','Nov.','Déc.']
//       // let mois1=date1Splited[1]
//       let mois2=date2Splited[1]
//       if(parseInt(date1Splited[0])>2000){
//         let jour1=date1Splited[2]
//       // let annee1=date1Splited[0]
//         let jour2=date2Splited[2]
//         let annee2=date2Splited[0]
//         return 'Du ' + jour1 + ' au ' + jour2 + ' '+ arrayOfMonth[parseInt(mois2)-1] + ' '+annee2
//       }else{
//         // let annee1=date1Splited[2]
//         let jour1=date1Splited[0]
//         let annee2=date2Splited[2]
//         let jour2=date2Splited[0]
//         return 'Du ' + jour1 + ' au ' + jour2 + ' '+ arrayOfMonth[parseInt(mois2)-1] + ' '+ annee2
//       }
//     }
//     onClick = ()=>{
//       this.props.render(this.props.chantier)
//     //   dispatch(setChantier(this.props.chantier))
//       document.getElementsByClassName("sideBar")[0].style.display= window.innerWidth >="700"?"inline-block":"none";
//       document.getElementsByClassName("tronc")[0].style.display="inline-block";
//       };
//     render(){
//       // const debut=this.dateDebut.split('-')[0]
//       // const fin=this.dateFin.split('-')[0]
//       // // const imagList=require("./images/" + this.props.chantier.imges.imgAvant);
//       const imagList=require("./images/" + this.props.chantier.etat.etat0.linkImg);
//       return  <div className="chantiers_bloc">
//           <Link onClick={this.onClick}>
//               <img src={imagList} alt="images-projet" id="img01"/>
//               <div className="item_left"><p>Chantier {this.props.chantier.name} <br/><span>{this.intervalDate(this.dateDebut,this.dateFin)} </span></p></div>
//           </Link>
//         </div>
//      }
//   }



// export function Chantier(props){
//     // constructor(props){
//     //     super(props);
//         // this.onClick=this.onClick.bind(this);
//         const dispatch=useDispatch()
//         const dateDebut=props.chantier.dates.debut;
//         const dateFin=props.chantier.dates.fin;
//     // }
//     const intervalDate=(date1,date2)=>{
//       let date1Splited=date1.split('-')
//       let date2Splited=date2.split('-')
//       let arrayOfMonth=['Janv.','Fév.','Mar.','Avr.','Mai','Juin','Juil.','Aout','Sept.','Oct.','Nov.','Déc.']
//       // let mois1=date1Splited[1]
//       let mois2=date2Splited[1]
//       if(parseInt(date1Splited[0])>2000){
//         let jour1=date1Splited[2]
//       // let annee1=date1Splited[0]
//         let jour2=date2Splited[2]
//         let annee2=date2Splited[0]
//         return 'Du ' + jour1 + ' au ' + jour2 + ' '+ arrayOfMonth[parseInt(mois2)-1] + ' '+annee2
//       }else{
//         // let annee1=date1Splited[2]
//         let jour1=date1Splited[0]
//         let annee2=date2Splited[2]
//         let jour2=date2Splited[0]
//         return 'Du ' + jour1 + ' au ' + jour2 + ' '+ arrayOfMonth[parseInt(mois2)-1] + ' '+ annee2
//       }
//     }
//     const onClick = ()=>{
//       props.render(props.chantier)
//       dispatch(setChantier(props.chantier))
//       // window.innerWidth// capture la largeur de l'ecran
//       document.getElementsByClassName("sideBar")[0].style.display= window.innerWidth >="700"?"inline-block":"none";
//       document.getElementsByClassName("tronc")[0].style.display="inline-block";
//       };
//     // render(){
//       // const debut=this.dateDebut.split('-')[0]
//       // const fin=this.dateFin.split('-')[0]
//       // // const imagList=require("./images/" + this.props.chantier.imges.imgAvant);
//       const imagList=require("./images/" + props.chantier.etat.etat0.linkImg);
//       return  <div className="chantiers_bloc">
//           <Link onClick={onClick}>
//               <img src={imagList} alt="images-projet" id="img01"/>
//               <div className="item_left"><p>Chantier {props.chantier.name} <br/><span>{intervalDate(dateDebut,dateFin)} </span></p></div>
//           </Link>
//         </div>
//     //  }
//   }
    
    // <iframe title="cartographie" 
    // width="750"
    // height="750"
    // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2452779.335296511!2d-16.67700964701947!3d14.475060520080398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10d1362c042035c7%3A0x524e051ab216f152!2sSénégal!5e0!3m2!1sfr!2sfr!4v1597211340146!5m2!1sfr!2sfr&zoom=10"
    // allowfullscreen
    // ></iframe>

//     {/* <div className="containerOnly"> */}
//     <div className="infos_large">
//     {/* 🔴  */}
//         <p style={{color:"brown"}}><h1>Le chantier de {props.chantier.name}</h1> </p>
//         <hr/>
//      </div>
//     <PresentationEtablissement chantier={props.chantier}/>
//   {/* </div> */}