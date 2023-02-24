import {User, Challenges} from "./types";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, remove } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBC_HeFNe_YZksC9p7axJWkbS6ktgIsYX4",
  authDomain: "dayschallenge-d8b3c.firebaseapp.com",
  databaseURL: "https://dayschallenge-d8b3c-default-rtdb.firebaseio.com",
  projectId: "dayschallenge-d8b3c",
  storageBucket: "dayschallenge-d8b3c.appspot.com",
  messagingSenderId: "718109439350",
  appId: "1:718109439350:web:7cf1441683172cd6efb657",
  measurementId: "G-JKM4RHLFHS"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const dbRef = ref(db);

const express = require('express')
const app = express()
const port = 3000
var user:User;


app.get('/', (req, res) => {
 res.send('Hello World!')
})


app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})

export function login(username:string, userPassword:string):string{
    /*
    Connect to Database and check username and password
    If they exist, login
    else, send error
    */

    get(child(dbRef, `users/${username}`)).then((snapshot) => {
        if (snapshot.exists())
        {
            console.log(snapshot.val());

            var passwordSnap = snapshot.child("password");
            
            if(passwordSnap.val() == userPassword){
                console.log("User Found.");
                return "User Found.";

                user = new User(snapshot.val(), passwordSnap.val());
            }else{
                console.log("Password isn't correct.");
                return "Password isn't correct.";
            }

        } else {
            var error = "User doesn't exist.";
            console.log(error);
            return error;
        }       
    }).catch((error) => {
        console.error(error);
        return error;
    });
    
    return "Something went wrong.";
}

export function forgotPassword(username:string, newUserPassword){
    /*
    Connect to Database and check username exists
    If they exist, change password on database
    else, send error
    */
}

export function createAccount(username:string, userPassword:string):string{
    /*
    Connect to Database and check if user exists
    if not, create user
    else, tell user to login
    */
    get(child(dbRef, `users/${username}`)).then((snapshot) => {
        if (!snapshot.exists())
        {
            set(ref(db, 'users/' + username), {
                password: userPassword,
                challenges: "",
                friends: "",
                numofChallenges: "0"
            });

            console.log("Added user.");
            return "Added user."

        } else {
            var error = "User already exists.";
            console.log(error);
            return error;
        }
    }).catch((error) => {
        console.error(error);
        return error;
    });

    return "Something went wrong.";
}

export function addChallenge(challengeName:string, challengeDifficulty:number){
    if(user != null){
        //let temp = new Challenges(challengeName,challengeDifficulty, user.username);
        //user.challenges[challengeName] = temp;
        //user.numOfChallenges++;
    }
}

export function endChallenge(challengeName:string){
    if(user != null){
        user.challenges[challengeName].challengeComplete();
    }
}