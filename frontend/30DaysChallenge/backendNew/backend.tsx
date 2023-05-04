import { User, Challenges } from "./types";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";


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
var challengeNames:string[] = ["Devwater", "Devexercise"];

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
                userName = username;

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
                        console.log(tokenArray[i]);
                        user.challenges.push(tokenArray[i]);
                        //challengeNames.push(tokenArray[i]);
;                    }
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

            temp.username = username; 
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

async function update(username:string):Promise<string>{
    var check = await updateUser(username);
    return check;
}

export async function addChallenge(challengeName:string, challengeDifficulty:number, challengeDescription:string, articleTitle:string, articleSource:string):Promise<boolean>{
    var returnBool:boolean = false;
    var challengeToken = userName + challengeName;
    await get(child(dbRef, `challenges/${challengeToken}`)).then((snapshot) => {
        if (!snapshot.exists()) {
            if (user != null) {
                let temp = new Challenges(challengeName, challengeDifficulty, user.username, challengeDescription, articleTitle, articleSource);
                user.challenges[user.numOfChallenges] = challengeToken;
                challengeNames[user.numOfChallenges] = challengeToken;
                user.numOfChallenges++;

                var string = update(userName);

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
                if (temp.friends.length != 0) {
                    for (j = 0; j < temp.friends.length; j++) {
                        friendstemp += temp.friends[j];
                        if (j + 1 != temp.friends.length) {
                            friendstemp += ","
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
                    articleSource: articleSource
                });

                returnBool = true;
            } else {
                returnBool = false;
            }
        } else {
            var error = "User already exists.";
            console.log(error);
        }
    }).catch((error) => {
        console.error(error);
    });
    return returnBool;
}

export async function getChallenges():Promise<Challenges[]>{
    var temp:Challenges[] = [];

    if(user != null){
        var i:number;
        //console.log(user.numOfChallenges);
        for (i = 0; i < user.numOfChallenges; i++){
            //console.log(challengeNames[i]);
            await get(child(dbRef, `challenges/${challengeNames[i]}`)).then((snapshot) => {
                if (snapshot.exists())
                {
                    //console.log(snapshot.child("challengeName").val());
                    temp[i] = new Challenges(snapshot.child("challengeName").val(), snapshot.child("challengeDifficulty").val(), userName, snapshot.child("description").val(), snapshot.child("articleTitle").val(), snapshot.child("articleSource").val());
                    temp[i].startDate.setMilliseconds(snapshot.child("startDate").val());
                    temp[i].endDate.setMilliseconds(snapshot.child("endDate").val());
                    temp[i].isComplete = snapshot.child("completed").val();

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
                    var friends = friendstemp.split(",");

                    temp[i].friends = friends;
                    temp[i].challengeToken = challengeNames[i]
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
                    daysCompleted: daystemp
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
                var temp = new Challenges(challengeName, snapshot.child("challengeDifficulty").val(), user.username, snapshot.child("challengeDescription").val(), snapshot.child("articleTitle").val(), snapshot.child("articleSource").val());
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

export async function sendArticles(){
    var category:string[] = ["Fitness", "Hair Care", "Academics", "Skin", "Self Care", "Self Care", "Health", "Fitness", "Sleep", "Nutrition"];
    var title:string[] = ["Insights on Surya namaskar from its origin to application towards health", "Hair Cosmetics for the Hair Loss Patient", "The Effect of Mechanical Tongue Cleaning on Oral Malodor and Tongue Coating", "Dietary Supplementation for Attenuating Exercise-Induced Muscle Damage and Delayed-Onset Muscle Soreness in Humans", "Nutritional Therapy in Persons Suffering from Psoriasis", "Nutrition Concepts for the Treatment of Obesity in Adults", "Hinokitiol chelates intracellular iron to retard fungal growth by disturbing mitochondrial respiration", "Comparison of Weightlifting, Traditional Resistance Training and Plyometrics on Strength, Power and Speed: A Systematic Review with Meta-Analysis", "Analysis of Trend of Studies on Microneedle Treatment System (MTS)", "Drug treatment for panic disorder with or without agoraphobia: systematic review and network meta-analysis of randomised controlled trials"];
    var source:string[] = [];
    var id:number[] = [34974957, 34984093, 35010368, 35010943, 35010995, 35011045, 35024181, 35025093, 35028169, 35045991];
    var label:string[] = ["+", "=", "+", "+", "+", "+", "+", "+", "+", "+"];
    var summary:string[] = ["Fitness	Suryanamaskar practice is the most widely adopted sequence of asanas which has its origin from indian traditional physical training. It also has lots of variations regarding different yogic traditions of india in the modern era. The review presents the physical benefits of the practice with regards to the increasing mobility of joints  extending muscle power  and vitality with the literature reference. The physiological attributes of improving the metabolic rate  cardiovascular stimulation  and increase of respiratory capacity  improvement of mental health of the body  and proper functioning of endocrine glands were also discussed. Highlighting the yogic point of view of the benefits of suryanamaskar practice  the positive effects of suryanamaskar on puberty  menstrual cycle  and childbirth were also emphasized. We conclude from the above points that the practice of suryanamaskar is necessary not just for those who are regular yogic practitioners or spiritual seekers but for a common man  to maintain the physical  physiological  and mental health by spending very little time of their choice. If this practice is initiated to children at the age of 7 or 8 it helps grow better not only physically but also with great mental health. We propose that suryanamaskar practice could be a group activity of the family to ensure total family health. Suryanamaskar is a boon for those who want to involve in yogic practices but yet not dedicate even an hour every day.", 
                            "Among the available hair relaxers  thioglycolate is the best option as it minimizes protein loss. Hairdryers and flat irons should be used with care as far as possible from the scalp skin. Hair stiffness caused by the use of topical lotions  such as minoxidil  can be mitigated if applied directly to the scalp and in combination with a leave-on product containing soluble silicones and vegetable oils. If the hair becomes dull with excessive residue  a clarifying shampoo should be used every 15 days. It is important that clinicians educate hair-transplant patients about the safe hair care routine that will follow the surgery. In the authors' experience  a safe routine consists of daily shampooing with sulfate-free products  followed by conditioning rinsing creams rich in hydrolyzed amino acids  vegetable oils  and water-soluble silicones. If dying the new hair is necessary  we recommend the use of nonpermanent dyes. Bleaching  hair relaxers  and bkt should be avoided. Traction grooming habits should be avoided at the site of the transplantation.", 
                            "This study was conducted in order to assess the effect of reducing bad breath and tongue coating through mechanical tongue cleaning  and to assess the difference in the reduction effect according to mechanical tongue-cleaning methods. Among the mechanical tongue-cleaning methods were: removing tongue coating using a toothbrush; removing tongue coating using a tongue scraper; and removing tongue coating using a toothbrush and a tongue scraper together. The results were as follows.", 
                            "In addition  we need to understand the differences between natural vs. purified products. We may need to take a large amount of natural products to increase the bioavailability necessary to attenuate eimd and doms. It is also important to note that natural products may contain non-target ingredients which might modulate the action of supplements. Therefore  it is necessary to pay attention not only to the amount but also to the form of products.", 
                            "Unfortunately  no specific nutritional therapy regimens for psoriasis have been established yet. However  numerous studies confirm the positive effect of consumption or elimination of the nutrients and food products mentioned above. When planning the diet of patients with psoriasis  one should also consider co-morbidities and implement actions to prevent the diseases to which these persons are vulnerable.", 
                            "This scientific viewpoint is a narrative review and not comparable with a systematic review but gives an overview of various treatment approaches  which should be used and combined considering the individuals‘ needs  preferences  weight status  and cardio-metabolic risk factors. All treatment approaches have to result in a negative energy balance. Independent of the weight loss concept (e.g.  intermittent fasting  low carb  low fat  drugs or  bariatric surgery)  weight loss failed without a negative energy balance. Many trends like gene-based or microbiome-based dietary recommendations still lack conclusive scientific evidence. In general  weight loss studies often have methodological limitations (e.g.  study design or duration)  leading to results not being comparable  and they therefore should be interpreted with caution. With lifestyle changes  a moderate weight loss after one year is possible. Other approaches  such as bariatric surgery  lead to greater weight loss  but are proven only for specific target groups. More research  especially by long-term intervention studies  is needed to evaluate weight loss concepts and to obtain evidence-based tailored recommendations.", 
                            "These findings suggested the potential application of hinokitiol as an iron chelator to treat fungal infections. We demonstrated that hinokitiol has promising antifungal activity by interfering with iron homeostasis. Respiratory chain dysfunction caused by the disruption of iron homeostasis by hinokitiol ultimately impeded the proliferation of fungal cells. Our findings reveal the underlying antifungal mechanism of hinokitiol and support its potential application to treat relevant fungal infections  particularly those resulting from resistant organisms.", 
                            "Overall  these findings support the notion that if the training goal is to improve strength  power and speed  supplementary weightlifting training may be advantageous for athletic development. Whilst wlt and plyo may result in similar improvements  wlt can elicit additional benefits above that of trt  resulting in greater improvements in weightlifting and jumping performance. The current study revealed that wlt is an effective training method to improve strength  cmj  sj and sprint speed performance. When compared with alternative training modalities  wlt may elicit additional benefits above that of trt alone  resulting in greater improvements in weightlifting and cmj performance. Wlt and plyo may result in similar improvements in strength  jump performance and speed. Overall  these findings support the notion that if the training goal is to improve strength  power and speed  the inclusion of weightlifting exercises within phases of the training cycle may be advantageous to target goal-specific adaptations while also promoting the development of a well-rounded athlete.", 
                            "Most of the studies related to mts focused on skin  hair  and stability. The effect of mts on hair growth and skin improvement has been confirmed  and it has been proven to have significant effects on the treatment of acne  acne scars  and hair loss in clinical practice. No serious side effects were observed during the mts treatment  and the safety assessment confirmed that it was safe for use. 1. as a result of analyzing the studies using mts according to the study type  there were 7 animal research  2 clinical trials  and 10 case studies.", 
                            "The findings suggest that ssris provide high rates of remission with low risk of adverse events for the treatment of panic disorder. Among ssris  sertraline and escitalopram were associated with high remission and low risk of adverse events. The findings were  however  based on studies of moderate to very low certainty levels of evidence  mostly as a result of within study bias  inconsistency  and imprecision of the findings reported."];

    for(var i = 0; i < category.length; i++){
        set(ref(db, 'challenges/' + category[i]), {
            title: title[i],
            source: source[i],
            description: summary[i],
            label: label[i],
            id: id[i]
        });
    }
}