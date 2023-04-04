import { login, createAccount, sendUser, updateUser, addChallenge, getChallenges, endChallenge } from "./backend";

//var check = login("anushamish", "password");
//console.log(check);

var check2 = addChallenge("Drink Water", 2, "Drinking water is good for you");
console.log(check2);