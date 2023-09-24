export const nameValidator=new RegExp('^[a-zA-Z0-9.éèÈÉêÊôÔëËÇïÏîÎŒœçù@%+-_\\s]{3,50}$');
export const lastNameValidator=new RegExp('^[a-zA-Z0-9.éèÈÉêÊôÔëËÇïÏîÎŒœçù@%+-_\\s]{2,50}$');
export const pseudoValidator=new RegExp('^[a-zA-Z0-9.éèÈÉêÊôÔëËÇïÏîÎŒœçù@%+-_]{3,20}$');
export const emailValidator=new RegExp('^[a-z]{1,20}[a-z0-9_]{0,50}@[a-z]{2,50}(\\.com|\\.sn|\\.fr|\\.org)$');
export const passwordValidator=new RegExp('^[a-zA-Z0-9\\.éèÈÉêÊôÔëËÇïÏîÎŒœçù@%+-_#]{6,8}$');
export const phoneValidator=new RegExp('^(\\(?(00|\\+)?[0-9\\s]{3}\\)?)?[0-9\\s]{9,11}$');
export const imgValidator=new RegExp('^[a-zA-Z0-9_]{2,50}(\\.jpg|\\.jpeg|\\.png|\\.psg|\\.gif|\\.svg)$');
export const dateValidator=new RegExp('[0-9]$');
export const linkFacebookValidator=new RegExp('^(https://facebook.com/)[^<>}{]');
export const linkTwitterValidator=new RegExp('^(https://twitter.com/)[^<>}{]');
export const linkInstagramValidator=new RegExp('^(https://instagram.com/)[^<>}{]');
export const linkLinkedinValidator=new RegExp('^(https://linkedin.com/)[^<>}{]');
// '^[0-9+)(\\s]*$'

// https://twitter.com/mustafaag346?s=20