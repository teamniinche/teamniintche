import React from 'react';
import {Link} from 'react-router-dom';
import './nousContacter.css';
import {InputString} from './forms.js';
import { identifiant,mail } from './icons';

function NousContacter(){
    const facebook=require('./images/RS_logos/facebook.webp');
    const twitter=require('./images/RS_logos/twitter.webp');
    const instagram=require('./images/RS_logos/instagram.webp');
    const youtube=require('./images/RS_logos/youtube.webp');
    return <div className="reseaux_Sociaux">
                <p className="suivre">Nous suivre sur nos réseaux sociaux</p>
                <ul id="liste_reseaux_sociaux">
                    <li><Link to=""><img src={facebook} alt="facebook"/><span>Facebook</span></Link></li>
                    <li><Link to=""><img src={twitter} alt="Twitter"/><span>Twitter</span></Link> </li>
                    <li><Link to=""><img src={instagram} alt="Instagram"/><span>Instagram</span></Link> </li>
                    <li><Link to=""><img src={youtube} alt="Youtube"/><span>Youtube</span></Link></li>
                </ul>
            </div>
        }

function Opinion(){
    const style={color:"white"}
    function handleChange(){

    }
    return <div className="opinion">
                <p className="ecrire">Nous écrire à la newsletter</p>
                <textarea name="textar" id="textare" cols="" rows="15" placeholder="Saisir votre message ici..."></textarea>
                <InputString type="text" icon={identifiant} iconStyle={style} for="Nom" render={(obj)=>{handleChange(obj)}}/>
                <InputString type="mail" icon={mail} iconStyle={style} for="Adresse mail" render={(obj)=>{handleChange(obj)}}/>
                <button type="submit" className="submit_idee" value="">Envoyer</button>
            </div>
        }
function Numeros(){
    return <div className="reseaux_Sociaux">
                <p className="suivre">Nos numéros de téléphone</p>
                <ul id="liste_numeros">
                    <li>(+221) 77 152 86 20</li>
                    <li>(+221) 76 375 57 32</li>
                    <li>(+221) 70 000 00 00</li>
                    <li>(+221) 75 000 00 00</li>
                </ul>
            </div>
        }
        
export default function MetaData(){
    return <div className="divtech">
            <div className="meta-data">
            <div className="copyright">
                Copyright © 2023
                @MBEGAAN JS (+221 77 152 86 20)
                Tous droits réservés ®
            </div>
            <Numeros/>
            <NousContacter/>
            <Opinion/>
            </div>
        </div>
    }