import { User, Challenges, Article } from "./types";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
//import { readFileSync } from "fs";

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
var userName:string;

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
            //console.log(snapshot.val());

            var passwordSnap = snapshot.child("password");
            
            if(passwordSnap.val() == userPassword){

                console.log("User Found.");
                user = new User(snapshot.val(), passwordSnap.val(), snapshot.child("email").val(), snapshot.child("alcDiff").val(), snapshot.child("smokeDiff").val());
                user.numOfChallenges = snapshot.child("numOfChallenges").val();
                userName = username;

                var i:number;

                if(snapshot.child("friends").exists()){
                    var friendtemp:string = snapshot.child("friends").val();
                    var friendsArray = friendtemp.split(",");

                    for(i = 0; i < friendsArray.length; i++){
                        user.friends[i] = friendsArray[i];
                    }
                }

                if(snapshot.child("challenges").val() != ""){
                    var tokentemp = snapshot.child("challenges").val();
                    //console.log(tokentemp);
                    var tokenArray = tokentemp.split(",");
                    //console.log(tokenArray[0]);

                    for(i = 0; i < tokenArray.length; i++){
                        //console.log(tokenArray[i]);
                        user.challenges.push(tokenArray[i]);
                        //challengeNames.push(tokenArray[i]);
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
                challenges: "devwater",
                friends: "",
                numOfChallenges: "0", 
                alcDiff: "0",
                smokeDiff: "0"
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

    var temp = await login(username, userPassword);

    check = temp;

    return check;
}

export async function sendUser(username:string):Promise<User>{
    var temp:User = new User( "", "", "", 0, 0);

    await get(child(dbRef, `users/${username}`)).then((snapshot) => {
        if (snapshot.exists())
        {
            //console.log(snapshot.val());

            temp.username = username; 
            temp.userPassword = snapshot.child("password").val();
            temp.numOfChallenges = snapshot.child("numOfChallenges").val();
            temp.alcDifficulty = snapshot.child("alcDiff").val();
            temp.smokingDifficulty = snapshot.child("smokeDiff").val();

            var i:number;

            if(snapshot.child("friends").exists()){
                var friendtemp:string = snapshot.child("friends").val();
                var friendsArray = friendtemp.split(",");

                for(i = 0; i < friendsArray.length; i++){
                    temp.friends[i] = friendsArray[i];
                }
            }

            if(snapshot.child("challenges").val() != ""){
                var tokentemp:string = snapshot.child("challenges").val();
                //console.log(tokentemp);
                temp.challenges = tokentemp.split(",");

                //console.log(temp.challenges);

                // for(i = 0; i < tokenArray.length; i++){
                //     user.challenges[i] = tokenArray[i];
                // }
            }

        }else{
            console.log("User does not exist.");
        }
    }).catch((error) => {
        console.error(error);
    });

    return temp;
}

export async function updateUser(username:string):Promise<string>{
    await get(child(dbRef, `users/${username}`)).then((snapshot) => {
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

            set(ref(db, 'users/' + username), {
                password: user.userPassword,
                challenges: tokentemp,
                friends: friendtemp,
                numOfChallenges: user.numOfChallenges,
                alcDiff: user.alcDifficulty,
                smokeDiff: user.smokingDifficulty
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

export async function addDifficulty(username:string, alcDiff:number, smokeDiff:number){
    user = await sendUser(username)
    await get(child(dbRef, `users/${user.username}`)).then((snapshot) => {
        if (snapshot.exists())
        {
            set(ref(db, 'users/' + user.username), {
                password: user.userPassword,
                challenges: snapshot.child("challenges").val(),
                friends: snapshot.child("friends").val(),
                numOfChallenges: user.numOfChallenges,
                alcDiff: alcDiff,
                smokeDiff: smokeDiff
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
}

/*async function update(username:string):Promise<string>{
    var check = await updateUser(username);
    return check;
}*/

function makeid(length:number):string {
    let result = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

async function updateGroupCode(code:string, user:string, username:string, challengeName:string){
    if(user.includes(",") || user != ""){
        user += ",";
    }

    user += username;
    await set(ref(db, 'groupcode/' + code), {
        users: user,
        challengeName: challengeName
    });
}

export async function addChallenge(challengeName:string, challengeDifficulty:number, challengeDescription:string, articleTitle:string, articleSource:string, groupCode:string):Promise<boolean>{
    var returnBool:boolean = false;
    user = await sendUser("Dev");
    //user.username = "Raju"
    var challengeToken = user.username + challengeName;
    var friends:string[] = [];

    if(groupCode != ""){
        await get(child(dbRef, `groupcode/${groupCode}`)).then((snapshot) => {
            if(snapshot.exists()){
                var usertemp:string = snapshot.child("users").val();
                if(usertemp.includes(",")){
                    friends = usertemp.split(",");
                }else{
                    friends[0] = usertemp
                }
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    //challengeNames[user.numOfChallenges] = challengeToken;
    await get(child(dbRef, `challenges/${challengeToken}`)).then(async (snapshot) => {
        if (!snapshot.exists()) {
            if (user != null) {
                if(groupCode == ""){
                    groupCode = makeid(5);
                }
                let temp = new Challenges(challengeName, challengeDifficulty, user.username, challengeDescription, articleTitle, articleSource, groupCode);
                user.challenges[user.numOfChallenges] = challengeToken;
                user.numOfChallenges++;

                var string = await updateUser(user.username);

                var daystemp: string = "";
                var i: number;
                for (i = 0; i < temp.daysCompleted.length; i++) {
                    daystemp += temp.daysCompleted[i];
                    if (i + 1 != temp.daysCompleted.length) {
                        daystemp += ","
                    }
                }

                var friendstemp: string = "";
                var j: number;
                if(friends.length != 0){
                    for (j = 0; j < friends.length; j++) {
                        if(friends[j] != user.username){
                            friendstemp += friends[j];
                            if (j + 1 != friends.length) {
                                friendstemp += ","
                            }
                        }
                    }
                    var count = friends.length;

                    //if(temp.friends[0] != ""){
                        //friendstemp += ",";
                    //}

                    for (j = friends.length; j < temp.friends.length; j++){
                        if(!friends.includes(temp.friends[j])){
                            friendstemp += temp.friends[count];
                            if (j + 1 != friends.length + temp.friends.length - 1) {
                                friendstemp += ","
                            }
                            count++;
                        }
                    }
                }else{
                    if (temp.friends.length != 0) {
                        for (j = 0; j < temp.friends.length; j++) {
                            friendstemp += temp.friends[j];
                            if (j + 1 != temp.friends.length) {
                                friendstemp += ","
                            }
                        }
                    }
                }

                //console.log(string);

                set(ref(db, 'challenges/' + String(challengeToken)), {
                    challengeName: challengeName,
                    challengeDifficulty: challengeDifficulty,
                    description: challengeDescription,
                    startDate: temp.startDate.getTime(),
                    endDate: temp.endDate.getTime(),
                    daysCompleted: daystemp,
                    completed: temp.isComplete,
                    friends: friendstemp,
                    articleTitle: articleTitle,
                    articleSource: articleSource,
                    challengeCode: groupCode
                });

                updateGroupCode(groupCode, friendstemp, user.username, challengeName);

                returnBool = true;
            } else {
                returnBool = false;
            }
        } else {
            var error = "Challenge already exists.";
            console.log(error);
        }
    }).catch((error) => {
        console.error(error);
    });
    return returnBool;
}

export async function addChallengeWithCode(code:string):Promise<boolean>{
    var returnBool = false;
    var challengeName:string = "";
    var friends:string[] = [];
    user = await sendUser("Dev");

    await get(child(dbRef, `groupcode/${code}`)).then((snapshot) => {
        if(snapshot.exists()){
            challengeName = snapshot.child("challengeName").val();
            var friendstemp = snapshot.child("users").val();
            if(friendstemp.includes(",")){
                friends = friendstemp.split(",");
            }else{
                friends[0] = friendstemp;
            }
        }
    }).catch((error) => {
        console.error(error);
    });

    var challengeToken =  friends[0] + challengeName;
    var check:boolean = false;
    
    await get(child(dbRef, `challenges/${challengeToken}`)).then(async (snapshot) => {
        if(snapshot.exists()){
            check = await addChallenge(challengeName, parseInt(snapshot.child("challengeDifficulty").val()), snapshot.child("description").val(), snapshot.child("articleTitle").val(), snapshot.child("articleSource").val(), code);
        }
    }).catch((error) => {
        console.error(error);
    });

    returnBool = check;
    return returnBool;
}

async function getFriendsWithCode(code:string):Promise<string[]>{
    var friends:string[] = [];

    await get(child(dbRef, `groupcode/${code}`)).then((snapshot) => {
        if(snapshot.exists()){
            var usertemp:string = snapshot.child("users").val();
            if(usertemp.includes(",")){
                friends = usertemp.split(",");
            }else{
                friends[0] = usertemp
            }
        }
    }).catch((error) => {
        console.error(error);
    });

    return friends;
}

export async function getChallenges():Promise<Challenges[]>{
    var temp:Challenges[] = [];

    user = await sendUser("Dev");

    if(user != null){
        var i:number;
        //console.log(user.numOfChallenges);
        for (i = 0; i < user.numOfChallenges; i++){
            //console.log(challengeNames[i]);
            //console.log(user.challenges[i])
            //console.log(user);
            await get(child(dbRef, `challenges/${user.challenges[i]}`)).then(async (snapshot) => {
                if (snapshot.exists())
                {
                    //console.log(snapshot.child("challengeName").val());
                    temp[i] = new Challenges(snapshot.child("challengeName").val(), snapshot.child("challengeDifficulty").val(), userName, snapshot.child("description").val(), snapshot.child("articleTitle").val(), snapshot.child("articleSource").val(), snapshot.child("challengeCode").val());
                    temp[i].startDate.setTime(snapshot.child("startDate").val());
                    temp[i].endDate.setTime(snapshot.child("endDate").val());
                    temp[i].isComplete = snapshot.child("completed").val();
                    temp[i].code = snapshot.child("challengeCode").val();

                    var completedtemp:string = snapshot.child("daysCompleted").val();
                    var completed = completedtemp.split(",");
                    var completedArray:boolean[] = [];
                    var j:number;

                    for(j = 0; j < 30; j++){
                        if(completed[j] == "true"){
                            completedArray[j] = true;
                        }else{
                            completedArray[j] = false;
                        }
                    }

                    temp[i].daysCompleted=completedArray;
                    
                    var friendstemp:string = snapshot.child("friends").val();
                    var friendsCode = await getFriendsWithCode(temp[i].code);

                    if(friendstemp != null){
                        if (!friendstemp.includes(",")) {
                            temp[i].friends[0] = friendstemp;
                        } else {
                            var friends = friendstemp.split(",");
                            for (var j = 0; j < friends.length; j++) {
                                temp[i].friends[j] = friends[j];
                            }
                        }
                    }

                    var count = temp[i].friends.length;

                    if (friendstemp == "") {
                        count = 0;
                    }

                    for (var x = temp[i].friends.length; x < friendsCode.length; x++) {
                        if (!temp[i].friends.includes(friendsCode[x]) && friendsCode[x] != user.username) {
                            //console.log(count);
                            temp[i].friends[count] = friendsCode[x];
                            count++;
                        }
                    }

                    friendstemp = "";

                    for (var y = 0; y < temp[i].friends.length; y++) {
                        friendstemp += temp[i].friends[y];
                        if (y + 1 != temp[i].friends.length) {
                            friendstemp += ","
                        }
                    }

                    set(ref(db, 'challenges/' + String(user.challenges[i])), {
                        challengeName: temp[i].userChallengeName,
                        challengeDifficulty: temp[i].challengeDifficulty,
                        description: temp[i].description,
                        startDate: temp[i].startDate.getTime(),
                        endDate: temp[i].endDate.getTime(),
                        daysCompleted: snapshot.child("daysCompleted").val(),
                        completed: temp[i].isComplete,
                        friends: friendstemp,
                        articleTitle: temp[i].articleTitle,
                        articleSource: temp[i].articleSource,
                        challengeCode: temp[i].code
                    });
                    
                    temp[i].challengeToken = user.challenges[i];
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }
    return temp;
}

export async function getChallengeDates(username:string, challengeName:string):Promise<boolean[]>{
    var array:boolean[] = [];
    var challengeToken = userName + challengeName;

    await get(child(dbRef, `challenges/${challengeToken}`)).then((snapshot) => {
        if (snapshot.exists())
                {
                    var completedtemp:string = snapshot.child("daysCompleted").val();
                    var completed = completedtemp.split(",");
                    var completedArray:boolean[] = [];
                    var j:number;

                    for(j = 0; j < 30; j++){
                        if(completed[j] == "true"){
                            completedArray[j] = true;
                        }else{
                            completedArray[j] = false;
                        }
                    }

                    array = completedArray;
                }

    }).catch((error) => {
        console.error(error);
    });

    return array;
}

export async function completeDay(username:string, challengeName:string, dayCompleted:number):Promise<boolean>{
    if(user != null){
        var challengeToken = username + challengeName;

        await get(child(dbRef, `challenges/${challengeToken}`)).then((snapshot) => {
            if(snapshot.exists()){

                var completedtemp:string = snapshot.child("daysCompleted").val();
                var completed = completedtemp.split(",");
                var completedArray:boolean[] = [];
                var j:number;

                for(j = 0; j < 30; j++){
                    if(completed[j] == "true"){
                        completedArray[j] = true;
                    }else{
                        completedArray[j] = false;
                    }

                    if(j == dayCompleted){
                        completedArray[j] = true;
                    }
                }

                var daystemp:string = "";
                var i:number;
                for(i = 0; i < completedArray.length; i++){
                    daystemp += completedArray[i];
                    if(i + 1 != completedArray.length){
                        daystemp += ","
                    }
                }

                set(ref(db, 'challenges/' + challengeToken), {
                    challengeName: challengeName,
                    challengeDifficulty: snapshot.child("challengeDifficulty").val(),
                    description: snapshot.child("description").val(),
                    startDate: snapshot.child("startDate").val(),
                    endDate: snapshot.child("endDate").val(),
                    daysCompleted: daystemp,
                    completed: snapshot.child("completed").val(),
                    friends: snapshot.child("friends").val(),
                    articleTitle: snapshot.child("articleTitle").val(),
                    articleSource: snapshot.child("articleSource").val(),
                    challengeCode: snapshot.child("challengeCode").val()
                });
            }

        }).catch((error) => {
            console.error(error);
        });
        return true;
    }else{
        return false;
    }
}

export async function endChallenge(username:string, challengeName:string):Promise<boolean>{
    if(user != null){
        var challengeToken = username + challengeName;
        var index = user.challenges.findIndex((element) => element == challengeToken);

        var challengeArray = await getChallenges();

        challengeArray[index].challengeComplete();

        set(ref(db, 'challenges/' + challengeToken), {
            completed: true
        });

        return true;
    }else{
        return false;
    }
}

/*export async function addFriend(friendUsername:string): Promise<boolean>{
    if(user != null){
        var index = user.friends.length;
        user.friends[index] = friendUsername;

        var check = await updateUser(user.username);
        console.log(check);

        return true;
    }else{
        return false;
    }
}*/

export async function addFriendChallenge(friendUsername:string, challengeName:string): Promise<boolean>{
    if(user != null){
        var returnBool:boolean = false;
        var challengeToken:string = user.username + challengeName;

        await get(child(dbRef, `challenges/${challengeToken}`)).then((snapshot) => {
            if (snapshot.exists())
            {
                var temp = new Challenges(challengeName, snapshot.child("challengeDifficulty").val(), user.username, snapshot.child("challengeDescription").val(), snapshot.child("articleTitle").val(), snapshot.child("articleSource").val(), snapshot.child("challengeCode").val());
                temp.startDate = snapshot.child("startDate").val();
                temp.endDate = snapshot.child("endDate").val();
                temp.isComplete = snapshot.child("completed").val();

                var completedtemp:string = snapshot.child("daysCompleted").val();
                var completed = completedtemp.split(",");
                var completedArray:boolean[] = [];
                var j:number;

                for(j = 0; j < 30; j++){
                    if(completed[j] == "true"){
                        completedArray[j] = true;
                    }else{
                        completedArray[j] = false;
                    }
                }

                temp.daysCompleted = completedArray;

                var friendstemp:string = snapshot.child("friends").val();
                var friends = friendstemp.split(",");

                temp.friends = friends;

                temp.friends[temp.friends.length] = friendUsername;

                var friendsStringtemp:string = "";
                var j:number;
                if(temp.friends.length != 0){
                for(j = 0; j < temp.friends.length; j++){
                    friendsStringtemp += temp.friends[j];
                    if(j + 1 != temp.friends.length){
                        friendsStringtemp += ","
                        }
                    }
                }
                
                set(ref(db, 'challenges/' + temp.challengeToken), {
                    challengeName: challengeName,
                    challengeDifficulty: temp.challengeDifficulty,
                    description: temp.description,
                    startDate: temp.startDate,
                    endDate: temp.endDate,
                    daysCompleted: temp.daysCompleted,
                    completed: temp.isComplete,
                    friends: friendsStringtemp
                });

                friendsStringtemp = "";
                var friendChallengeToken:string = friendUsername + challengeName;
                friends[friends.length] = user.username;

                if(friends.length != 0){
                    for(j = 0; j < friends.length; j++){
                        friendsStringtemp += friends[j];
                        if(j + 1 != friends.length){
                            friendsStringtemp += ","
                            }
                        }
                    }

                set(ref(db, 'challenges/' + friendChallengeToken), {
                    challengeName: challengeName,
                    challengeDifficulty: temp.challengeDifficulty,
                    description: temp.description,
                    startDate: temp.startDate,
                    endDate: temp.endDate,
                    daysCompleted: temp.daysCompleted,
                    completed: temp.isComplete,
                    friends: friendsStringtemp
                });

                returnBool = true;
            }
        }).catch((error) => {
            console.error(error);
            returnBool = false;
        });
    }else{
        returnBool = false;
    }

    return returnBool;
}

export async function getFriend():Promise<string[]>{
    var array:string[] = [];

    if(user != null){
        for(var i = 0; i<user.friends.length; i++){
            array[i] = user.friends[i];
        }
        return array;
    }else{
        return array;
    }
}

/*export async function sendArticles(){
    var file = readFileSync('outputTest4.txt', 'utf-8');
    console.log(file);

    var category:string[] = [];
    var title:string[] = [];
    var source:string[] = [];
    var id:number[] = [];
    var label:string[] = [];
    var summary:string[] = [];

    var newlineSplit = file.split('\n');
    for (var i=0; i<newlineSplit.length; i++) {
        var temp = newlineSplit[i].split('\t');
        id[i] = parseInt(temp[0]);
        title[i] = temp[1];
        label[i] = temp[2];
        category[i] = temp[4];
        summary[i] = temp[5];
        source[i] = temp[6];
    }

    for(var i = 0; i < category.length; i++){
        set(ref(db, 'articles/' + title[i]), {
            category: category[i],
            source: source[i],
            description: summary[i],
            label: label[i],
            id: id[i]
        });
    }
}*/

export async function getArticles():Promise<Article[]>{
    var articles:Article[] = [];

    await get(child(dbRef, `articles/`)).then((snapshot) => {
        snapshot.forEach((article) => {
            console.log(article.key);

            var temp:Article = new Article(article.child("category").val(), String(article.key), article.child("description").val(), article.child("source").val())

            articles.push(temp);
        });
    }).catch((error) => {
        console.error(error);
    });

    console.log(articles);
    return articles;
}