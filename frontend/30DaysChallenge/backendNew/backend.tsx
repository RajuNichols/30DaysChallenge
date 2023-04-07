import { User, Challenges } from "./types";
import { initializeApp } from "../firebase/app";
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
var user:User;

export async function login(username:string, userPassword:string):Promise<boolean>{
    /*
    Connect to Database and check username and password
    If they exist, login
    else, send error
    */

    var check:boolean = false;
    await get(child(dbRef, `users/${username}`)).then((snapshot) => {
        if (snapshot.exists())
        {
            console.log(snapshot.val());

            var passwordSnap = snapshot.child("password");
            
            if(passwordSnap.val() == userPassword){

                console.log("User Found.");
                user = new User(snapshot.val(), passwordSnap.val(), snapshot.child("email").val());
                user.numOfChallenges = snapshot.child("numOfChallenges").val();

                var i:number;

                if(snapshot.child("friends").exists()){
                    var friendtemp:string = snapshot.child("friends").val();
                    var friendsArray = friendtemp.split(",");

                    for(i = 0; i < friendsArray.length; i++){
                        user.friends[i] = friendsArray[i];
                    }
                }

                if(snapshot.child("challengeTokens").exists()){
                    var tokentemp:string = snapshot.child("challengeTokens").val();
                    var tokenArray = tokentemp.split(",");

                    for(i = 0; i < tokenArray.length; i++){
                        user.challenges[i] = tokenArray[i];
                    }
                }

                check = true;
            }else{
                console.log("Password isn't correct.");
                check = false;
            }

        } else {
            var error = "User doesn't exist.";
            console.log(error);
            check = false;
        }       
    }).catch((error) => {
        console.error(error);
        check = false;
    });
    
    return check;
}

export async function createAccount(username:string, userPassword:string, email:string):Promise<boolean>{
    /*
    Connect to Database and check if user exists
    if not, create user
    else, tell user to login
    */
   var check:boolean = false;
   await get(child(dbRef, `users/${username}`)).then((snapshot) => {
        if (!snapshot.exists())
        {
            set(ref(db, 'users/' + username), {
                password: userPassword,
                email: email,
                challenges: "",
                friends: "",
                numOfChallenges: "0"
            });

            console.log("Added user.");
            check = true;

        } else {
            var error = "User already exists.";
            console.log(error);
            check = false;
        }
    }).catch((error) => {
        console.error(error);
        check = false;
    });

    return check;
}

export async function sendUser(username:string):Promise<User>{
    if(username == user.username){
        return user;
    }

    var temp:User = new User( "", "", "");

    await get(child(dbRef, `users/${username}`)).then((snapshot) => {
        if (snapshot.exists())
        {
            console.log(snapshot.val());

            temp.username = snapshot.val(); 
            temp.userPassword = snapshot.child("password").val();
            temp.numOfChallenges = snapshot.child("numOfChallenges").val();

            var i:number;

            if(snapshot.child("friends").exists()){
                var friendtemp:string = snapshot.child("friends").val();
                var friendsArray = friendtemp.split(",");

                for(i = 0; i < friendsArray.length; i++){
                    user.friends[i] = friendsArray[i];
                }
            }

            if(snapshot.child("challengeTokens").exists()){
                var tokentemp:string = snapshot.child("challengeTokens").val();
                var tokenArray = tokentemp.split(",");

                for(i = 0; i < tokenArray.length; i++){
                    user.challenges[i] = tokenArray[i];
                }
            }

        }else{
            console.log("User does not exist.");
        }
    }).catch((error) => {
        console.error(error);
    });

    return temp;
}

export async function updateUser(user:User):Promise<string>{
    await get(child(dbRef, `users/${user.username}`)).then((snapshot) => {
        if (snapshot.exists())
        {
            var friendtemp:string = "";
            var tokentemp:string = "";

            var i:number;
            if(user.friends.length != 0){
                for(i = 0; i < user.friends.length; i++){
                    friendtemp += user.friends[i];
                    if(i + 1 != user.friends.length){
                        friendtemp += ","
                    }
                }
            }

            if(user.challenges.length != 0){
                for(i = 0; i < user.challenges.length; i++){
                    tokentemp += user.challenges[i];
                    if(i + 1 != user.challenges.length){
                        tokentemp += ","
                    }
                }
            }

            set(ref(db, 'users/' + user.username), {
                password: user.userPassword,
                challenges: tokentemp,
                friends: friendtemp,
                numOfChallenges: user.numOfChallenges
            });

            console.log("Updated User.");
            return "Updated user."

        } else {
            var error = "User does not exist.";
            console.log(error);
            return error;
        }
    }).catch((error) => {
        console.error(error);
        return error;
    });

    return "Something went wrong in update User";
}

export async function addChallenge(challengeName:string, challengeDifficulty:number, challengeDescription:string):Promise<string>{
    var returnString:string = "";
    try{
    if(user != null){
        let temp = new Challenges(challengeName, challengeDifficulty, user.username, challengeDescription);
        user.challenges.push(temp.challengeToken);
        user.numOfChallenges++;

        var string = updateUser(user);

        console.log(string);

        set(ref(db, 'challenges/' + temp.challengeToken), {
            challengeName: challengeName,
            challengeDifficulty: challengeDifficulty,
            description: challengeDescription,
            startDate: temp.startDate,
            endDate: temp.endDate,
            completed: temp.isComplete
        });

        returnString = "Success!";
    }else{
        returnString = "User is not logged in.";
    }
    }catch(e){
        console.error(e);
    }

    return returnString;
}

export async function getChallenges():Promise<Challenges[]>{
    var temp:Challenges[] = [];

    if(user != null){
        var i:number;

        for (i = 0; i < user.numOfChallenges; i++){
            await get(child(dbRef, `challenges/${user.challenges[i]}`)).then((snapshot) => {
                if (snapshot.exists())
                {
                    temp[i].challengeName = snapshot.child("challengeName").val();
                    temp[i].challengeDifficulty= snapshot.child("challengeDifficulty").val();
                    temp[i].description = snapshot.child("challengeDescription").val();
                    temp[i].startDate = snapshot.child("startDate").val();
                    temp[i].endDate = snapshot.child("endDate").val();
                    temp[i].isComplete = snapshot.child("completed").val();

                    var completedtemp:string = snapshot.child("daysCompleted").val();
                    var completed = completedtemp.split(",");
                    var completedArray:boolean[] = [];
                    var j:number;

                    for(j = 0; j < 30; j++){
                        if(completed[i] == "true"){
                            completedArray[i] = true;
                        }else{
                            completedArray[i] = false;
                        }
                    }

                    temp[i].daysCompleted=completedArray;
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }
    return temp;
}

export async function endChallenge(challengeName:string):Promise<boolean>{
    if(user != null){
        

        return true;
    }else{
        return false;
    }
}