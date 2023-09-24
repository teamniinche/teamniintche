import React,{useState,useEffect} from 'react'
import './slider.css';

export default function Slider(props) {
    const [imgSousTitre,setImgSousTitre]=useState({number:1,rapport:''});
    const {images,classe,classe1,classe2}=props;
    
    useEffect(()=>{
        document.getElementsByClassName('header')[0].style.height="0px"; //"0px" doit etre dynamisé
        let Rapport='1/'+images.length;
        document.querySelector('.'+classe1).style.display="none";
        document.querySelector('.'+classe2).style.display="inline-block";
        setImgSousTitre({number:1,rapport:Rapport});
        },[images.length,classe2,classe1]);

    function precedent(){
        let sliderContent=document.querySelector('.'+classe)
        let sliderContentWidth=sliderContent.offsetWidth;
        let Number=imgSousTitre.number-1;
        let Rapport=Number+'/'+images.length;
        sliderContent.scrollLeft -= sliderContentWidth;
        document.querySelector('.'+classe2).style.display="inline-block";//sliderNavSuiv
        if(Number===1){document.querySelector('.'+classe1).style.display="none";}//sliderNavPrec
        setImgSousTitre({number:Number,rapport:Rapport});
    }
  
    function suivant(){
        if(images.length===1){
        document.querySelector('.'+classe2).style.display="none";
        }else{
            let sliderContent=document.querySelector('.'+classe)
            let sliderContentWidth=sliderContent.offsetWidth;
            let Number=imgSousTitre.number+1;
            let Rapport=Number+'/'+images.length;
            sliderContent.scrollLeft += sliderContentWidth;
            document.querySelector('.'+classe1).style.display="inline-block";//sliderNavPrec
            if(Number===images.length){document.querySelector('.'+classe2).style.display="none";}//sliderNavSuiv
            setImgSousTitre({number:Number,rapport:Rapport});
        }
    }

    const img=(url,sTitre)=>{
        let img=require('./images/'+ url);
        return <div className="sliderContentItem">
                    <img src={img} alt="imageSlider" className="imageSlider"/>
                    <span className="spanBottom">{sTitre}</span>
                </div>
    }
    

    return (
    <div className="slider">
        <span className="spanTop">{imgSousTitre.rapport}</span>
        <div className="sliderNav">
            <svg onClick={()=>precedent()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classe1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
            <svg onClick={()=>suivant()}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={classe2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
        </div>
        <div className={classe} 
            style={{
                width:"100%",
                height: "100%",
                overflow: "hidden",
                display:"flex",
                flexDirection:"row",
                scrollBehavior: "smooth"
            }}>
            {images.map(item=>img(item[0],item[1]))}
        </div>
    </div>
  )
}