import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import './lateam.css';

export default function LaTeam() {
  const [rubriques, setRubriques] = useState([]);
const [error, setError] = useState('');

useEffect(() => {
  document.getElementsByClassName('header')[0].style.height="0px"; //"0px" doit etre dynamisé
  fetch('/api/rubriques/allrubriques')
    .then(response => response.json())
    .then(rubriques => setRubriques(rubriques))
    .catch(error => setError(error.message)); // Stocke uniquement le message de l'erreur
}, []);

if (error) {
  return <div>Une erreur s'est produite : {error}</div>;
}
  return (
    <>
    <h6 id="tec" style={{height:'0px',margin:'0px'}}>'</h6>
    <div className='teamBody'>
      <ul id="entete">
        <li><a href='#hist'>Motivations</a></li>
        <li><a href='#1'>Missions</a></li>
        <li><a href='#2' id="hist">Historique</a></li>
        <li><a href='#3'>Réalisations</a></li>
        <li><a href='#4'>Histoires</a></li>
      </ul>
      <div>
        {rubriques.map(item => (
          <Lateam key={item.titre} rubrique={item} />
        ))}
      </div>
    </div>
    </>
  );
}


function Lateam(props) {
  const styleLink = {
    display: "inline",
    fontWeight: "bold",
    fontSize: "1em",
    color: "rgba(0, 0, 150, 1)",
    textDecoration: "underline"
  };

  const spanElement = (
    <Link to="/" style={styleLink}>
      Voir page dédiée aux réalisations
      <br />
    </Link>
  );

  const content = props.rubrique.titre === "Réalisations" ? (
    <>
      Pour plus de détails, {spanElement} {props.rubrique.redaction}
    </>
  ) : (
    props.rubrique.redaction
  );

  return (
    
    <div className="rubrique" id={props.rubrique.id}>
      <h3>
        <a href="#tec" style={{ letterSpacing: "2px" }}>
          {props.rubrique.titre} 🔺
        </a>
      </h3>
      <p>{content}</p>
    </div>
  );
}


