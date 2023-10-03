import React,{useEffect} from 'react';
import {useState,useRef} from 'react';
import { useSelector} from 'react-redux'
import { MapContainer, TileLayer,Marker,Popup} from 'react-leaflet'
import {Icon} from 'leaflet';
import './leafletCss.css'

export default function Map(props) {
    const [center,setCenter]=useState([14.5998233, -14.7402745])
    const [kZoom,setKZoom]=useState(0)
    const [coord,setCoord]=useState(null)
    const mapRef=useRef(null);

    // un tableau de refs qui permet une ref à chaque element d'une liste sur laquelle on boucle
    //sinon const listMarkerRef=useRef() est unique et affecté uniquement au dernier element la fin de la boucle
    const listMarkerRef=useRef([]); //il faut mettre [] sinon on a une erreur de "[...]Ref est null ou undefined"

    const fc=20+kZoom
    const icon =new Icon({
        iconUrl:'/markerTn1.ico',
        iconSize:[fc,fc],
        iconAnchor:[fc/2,fc],
        popupAnchor:[0,-fc*3/4]
    })
    const handleClick=(site,index)=>{ 
      // document.querySelector('.leaflet-container').style.height="12vw"
      const map=mapRef.current; //A mapContainer on l'utilise en ref={mapRef} au lieu de whenCreayed() qui ne mar che pas d'ailleurs
                          setCoord([site.lat,site.long]);
                          // let lt=site.lat-0.120000 //0.12 coefficent de deplacement du centre vers le haut(sur la lattitude) pour l'adapter à la retraction
                          setCenter([site.lat,site.long]);
                          if(map) map.flyTo([site.lat,site.long],14);
                          const marker=listMarkerRef.current[index]
                          // marker.icon.iconSize=[80,100]
                          if(marker) marker.openPopup()
                          setKZoom(20)

                      }

  return <div id="map">
     
    <MapContainer ref={mapRef} center={center} zoom={6.2} scrollWheelZoom={false} className='mapContainer'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sites.map((site,index)=>{
          return <Marker key={index} position={[site.lat, site.long]} icon={icon} ref={element=>listMarkerRef.current[index]=element} eventHandlers={{ mouseover: ""}}>
                      <Popup>{site.name}</Popup> 
                      {/* </Marker><img src={srcPopup} alt="" style={{height:"70px",width:"100px"}}/></Popup> */}
                </Marker>})
        }
        {/* <Sites render={(num)=>setKZoom(num)}/> */}
    </MapContainer>
     {/* center of Senegal:[14.5998233, -14.7402745] */}
     <div id="div-avec-map">
          <div className="enfant-de-list">
              <p>{sites.length} CHANTIERS</p>
              <input value={coord} onChange={()=>null}/>
          </div>
          <ul className="enfant-de-list"> 
              {sites.map((site,index)=><li key={index} id={'ID'+index} onClick={()=>{handleClick(site,index)}} style={{width:"fit-content",lineHeight:"2rem",cursor:"pointer"}}><span style={{width:"fit-content",color:"green"}}>{site.ID<10?('0'+site.ID+'.  '):site.ID+ '.  ' }</span>{site.name}</li>)} 
          </ul> 
      </div>
  </div>
}
const sites=[
  {ID:0,name:'Ecole primaire de Ngolar sérère - Noto Diobass',lat:14.681982,long:-16.840937},
  {ID:1,name:'Lycée John Fitzgerald Kennedy',lat:14.6945440,long:-17.4455588},
  {ID:2,name:'Ecole Manguier 2',lat:14.689191,long:-17.458508},
  {ID:3,name:'Lycée Lamine Gueye(Réfectoire)',lat:14.661993,long:-17.439949},
  {ID:4,name:'Lycée Blaise Diagne',lat:14.696999,long:-17.453558},
  {ID:5,name:'Ecole élémentaire de Yoff',lat:14.751712,long:-17.459920},
  {ID:6,name:'Lycée Ousmane Sembene de Yoff',lat:14.759137,long:-17.483991},
  {ID:7,name:'Ecole élémentaire LA LINGUERE(Keur Massar)',lat:14.763831,long:-17.309521},
  {ID:8,name:'Ecole élémentaire Soukeyna Konaré(Saint Louis)',lat:16.024871,long:-16.491862},
  {ID:9,name:'Ecole Sebi Gare(Sebikotane)',lat:14.741661,long:-17.154132},
  {ID:10,name:'Ecole Primaire de Fakhane(Bambey) X2',lat:14.692870,long:-16.392642},
  {ID:11,name:'Ecole primaire de Keur Madiabel(Kaolack)',lat:13.852332,long:-16.053818},
  {ID:12,name:'Ecole Hamo 3 Guediawaye',lat:14.756895,long:-17.425552},
  {ID:13,name:'Dahra Keur Mady DRAME(Kaolack)',lat:13.709280,long:-16.117002},
  {ID:14,name:'Daray Serigne El Hadji MBACKE(TOUBA) X2',lat:14.905985,long:-15.918944},
  {ID:15,name:'Ecole Lamane Ngomak Faye(Thiès)',lat:14.791097,long:-16.935935},
  {ID:16,name:'Annexe Empire des enfants(Popenguine)',lat:14.554464,long:-17.113234},
  {ID:17,name:'Ecole élémentaire Amath BA de Podor',lat:16.651486,long:-14.955794},
  {ID:18,name:'Ecole Kaguitte(Campagne 2022 distribution des fournitures sclaires) - Ziguinchor',lat:12.409300,long:-16.396568},
  {ID:19,name:'Ecole 4 Gayenne pres de école Serigne Bassirou Mbacké - Gossas',lat:14.485250,long:-16.063436},
  {ID:20,name:'Ecole 9 - Dagana',lat:16.522814,long:-15.508815},
  {ID:21,name:'Ecole Sinthiou Daga(Campagne 2021 distribution des fournitures sclaires) - Kaolack',lat:13.612586,long:-16.124997},
  {ID:22,name:'Mour Diop(Salle informatique) - Medina',lat:14.6830064,long:-17.4507858},
  {ID:23,name:'Ecole 4 de Nguekokh - Fatick',lat:14.5183854,long:-17.0004184},
  {ID:24,name:'Plage Bargny(Operation plage Zéro dechets)',lat:14.686545,long:-17.228878}
] 

export function Mapp(props) {
  const index=useSelector(state=>state.userNewCh.index)
  const lat=props.lat!==undefined?props.chantier.lat:14.5998233;
  const long=props.long!==undefined?props.chantier.long:-14.7402745;
  // alert(lat+"  "+long)
  const center=[lat, long];
  const mapRef=useRef(null);

  // un tableau de refs qui permet une ref à chaque element d'une liste sur laquelle on boucle
  //sinon const listMarkerRef=useRef() est unique et affecté uniquement au dernier element la fin de la boucle
  const listMarkerRef=useRef([]); //il faut mettre [] sinon on a une erreur de "[...]Ref est null ou undefined"

  const fc=40 //20+kZoom
  const icon =new Icon({
      iconUrl:'/markerTn1.ico',
      iconSize:[fc,fc],
      iconAnchor:[fc/2,fc],
      popupAnchor:[0,-fc*3/4]
  })
  const showPopup=(index)=>{
      const site=sites[0]
      // document.querySelector('.leaflet-container').style.height="12vw"
      const map=mapRef.current;
      // let lat=site.lat-0.120000 //0.12 coefficent de deplacement du centre
      if(map) map.flyTo([site.lat,site.long],13);
      const marker=listMarkerRef.current[index]
      if(marker) marker.openPopup()
  }
// const index=Site.index
useEffect(
  ()=>showPopup(index)
)
  // const handleClick=(site,index)=>{ 
  //   // document.querySelector('.leaflet-container').style.height="12vw"
  //   const map=mapRef.current; //A mapContainer on l'utilise en ref={mapRef} au lieu de whenCreayed() qui ne mar che pas d'ailleurs
  //                       setCoord([site.lat,site.long]);
  //                       // let lt=site.lat-0.120000 //0.12 coefficent de deplacement du centre vers le haut(sur la lattitude) pour l'adapter à la retraction
  //                       setCenter([site.lat,site.long]);
  //                       if(map) map.flyTo([site.lat,site.long],14);
  //                       const marker=listMarkerRef.current[index]
  //                       // marker.icon.iconSize=[80,100]
  //                       if(marker) marker.openPopup()
  //                       setKZoom(20)

  //                   }
// const handleSideBarClick=()=>{
// // const clicked=useSelector(state=>{return state.userNewCh.local})
// }
// const centre=center;
return <>
   
  <MapContainer ref={mapRef} center={center} zoom={6.2} scrollWheelZoom={false} className='mapContainer'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sites.map((site,index)=>{
        return <Marker key={index} position={[site.lat, site.long]} icon={icon} ref={element=>listMarkerRef.current[index]=element} eventHandlers={{ mouseover: ""}}>
                    <Popup>{sites[index].name}</Popup> 
                    {/* </Marker><img src={srcPopup} alt="" style={{height:"70px",width:"100px"}}/></Popup> */}
              </Marker>})
      }
      {/* <Sites render={(num)=>setKZoom(num)}/> */}
  </MapContainer>
</>
}