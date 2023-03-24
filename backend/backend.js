"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endChallenge = exports.getChallenges = exports.addChallenge = exports.updateUser = exports.sendUser = exports.createAccount = exports.login = void 0;
var types_1 = require("./types");
var app_1 = require("firebase/app");
var database_1 = require("firebase/database");
var firebaseConfig = {
    apiKey: "AIzaSyBC_HeFNe_YZksC9p7axJWkbS6ktgIsYX4",
    authDomain: "dayschallenge-d8b3c.firebaseapp.com",
    databaseURL: "https://dayschallenge-d8b3c-default-rtdb.firebaseio.com",
    projectId: "dayschallenge-d8b3c",
    storageBucket: "dayschallenge-d8b3c.appspot.com",
    messagingSenderId: "718109439350",
    appId: "1:718109439350:web:7cf1441683172cd6efb657",
    measurementId: "G-JKM4RHLFHS"
};
var firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
var db = (0, database_1.getDatabase)(firebaseApp);
var dbRef = (0, database_1.ref)(db);
var express = require('express');
var app = express();
var port = 3000;
var user;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
function login(username, userPassword) {
    /*
    Connect to Database and check username and password
    If they exist, login
    else, send error
    */
    (0, database_1.get)((0, database_1.child)(dbRef, "users/".concat(username))).then(function (snapshot) {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            var passwordSnap = snapshot.child("password");
            if (passwordSnap.val() == userPassword) {
                console.log("User Found.");
                user = new types_1.User(snapshot.val(), passwordSnap.val());
                user.numOfChallenges = snapshot.child("numOfChallenges").val();
                var friendtemp = snapshot.child("friends").val();
                var friendsArray = friendtemp.split(",");
                var tokentemp = snapshot.child("challengeTokens").val();
                var tokenArray = tokentemp.split(",");
                var i;
                for (i = 0; i < friendsArray.length; i++) {
                    user.friends[i] = friendsArray[i];
                }
                for (i = 0; i < tokenArray.length; i++) {
                    user.challenges[i] = tokenArray[i];
                }
                return "User Found.";
            }
            else {
                console.log("Password isn't correct.");
                return "Password isn't correct.";
            }
        }
        else {
            var error = "User doesn't exist.";
            console.log(error);
            return error;
        }
    }).catch(function (error) {
        console.error(error);
        return error;
    });
    return "Something went wrong.";
}
exports.login = login;
function createAccount(username, userPassword) {
    /*
    Connect to Database and check if user exists
    if not, create user
    else, tell user to login
    */
    (0, database_1.get)((0, database_1.child)(dbRef, "users/".concat(username))).then(function (snapshot) {
        if (!snapshot.exists()) {
            (0, database_1.set)((0, database_1.ref)(db, 'users/' + username), {
                password: userPassword,
                challenges: "",
                friends: "",
                numOfChallenges: "0"
            });
            console.log("Added user.");
            return "Added user.";
        }
        else {
            var error = "User already exists.";
            console.log(error);
            return error;
        }
    }).catch(function (error) {
        console.error(error);
        return error;
    });
    return "Something went wrong.";
}
exports.createAccount = createAccount;
function sendUser(username) {
    if (username == user.username) {
        return user;
    }
    var temp = new types_1.User("", "");
    (0, database_1.get)((0, database_1.child)(dbRef, "users/".concat(username))).then(function (snapshot) {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            temp.username = snapshot.val();
            temp.userPassword = snapshot.child("password").val();
            temp.numOfChallenges = snapshot.child("numOfChallenges").val();
            var friendtemp = snapshot.child("friends").val();
            var friendsArray = friendtemp.split(",");
            var tokentemp = snapshot.child("challengeTokens").val();
            var tokenArray = tokentemp.split(",");
            var i;
            for (i = 0; i < friendsArray.length; i++) {
                temp.friends[i] = friendsArray[i];
            }
            for (i = 0; i < tokenArray.length; i++) {
                temp.challenges[i] = tokenArray[i];
            }
        }
        else {
            console.log("User does not exist.");
        }
    }).catch(function (error) {
        console.error(error);
    });
    return temp;
}
exports.sendUser = sendUser;
function updateUser(user) {
    (0, database_1.get)((0, database_1.child)(dbRef, "users/".concat(user.username))).then(function (snapshot) {
        if (snapshot.exists()) {
            var friendtemp = "";
            var tokentemp = "";
            var i;
            for (i = 0; i < user.friends.length; i++) {
                friendtemp += user.friends[i];
                if (i + 1 != user.friends.length) {
                    friendtemp += ",";
                }
            }
            for (i = 0; i < user.challenges.length; i++) {
                tokentemp += user.challenges[i];
                if (i + 1 != user.challenges.length) {
                    tokentemp += ",";
                }
            }
            (0, database_1.set)((0, database_1.ref)(db, 'users/' + user.username), {
                password: user.userPassword,
                challenges: tokentemp,
                friends: friendtemp,
                numOfChallenges: user.numOfChallenges
            });
            console.log("Updated User.");
            return "Updated user.";
        }
        else {
            var error = "User does not exist.";
            console.log(error);
            return error;
        }
    }).catch(function (error) {
        console.error(error);
        return error;
    });
    return "Something went wrong";
}
exports.updateUser = updateUser;
function addChallenge(challengeName, challengeDifficulty, challengeDescription) {
    if (user != null) {
        var temp = new types_1.Challenges(challengeName, challengeDifficulty, user.username, challengeDescription);
        user.challenges[user.numOfChallenges] = temp.challengeToken;
        user.numOfChallenges++;
        var string = updateUser(user);
        console.log(string);
        (0, database_1.set)((0, database_1.ref)(db, 'challenges/' + temp.challengeToken), {
            challengeName: challengeName,
            challengeDifficulty: challengeDifficulty,
            description: challengeDescription,
            startDate: temp.startDate,
            endDate: temp.endDate,
            completed: temp.isComplete
        });
        return "Success!";
    }
    else {
        return "User is not logged in.";
    }
}
exports.addChallenge = addChallenge;
function getChallenges() {
    var temp = [];
    if (user != null) {
        var i;
        for (i = 0; i < user.numOfChallenges; i++) {
            (0, database_1.get)((0, database_1.child)(dbRef, "challenges/".concat(user.challenges[i]))).then(function (snapshot) {
                if (snapshot.exists()) {
                    temp[i].challengeName = snapshot.child("challengeName").val();
                    temp[i].challengeDifficulty = snapshot.child("challengeDifficulty").val();
                    temp[i].description = snapshot.child("challengeDescription").val();
                    temp[i].startDate = snapshot.child("startDate").val();
                    temp[i].endDate = snapshot.child("endDate").val();
                    temp[i].isComplete = snapshot.child("completed").val();
                    var completedtemp = snapshot.child("daysCompleted").val();
                    var completed = completedtemp.split(",");
                    var completedArray = [];
                    var j;
                    for (j = 0; j < 30; j++) {
                        if (completed[i] == "true") {
                            completedArray[i] = true;
                        }
                        else {
                            completedArray[i] = false;
                        }
                    }
                    temp[i].daysCompleted = completedArray;
                }
            }).catch(function (error) {
                console.error(error);
            });
        }
    }
    return temp;
}
exports.getChallenges = getChallenges;
function endChallenge(challengeName) {
    if (user != null) {
        user.challenges[challengeName].challengeComplete();
        return "Success!";
    }
    else {
        return "User is not logged in.";
    }
}
exports.endChallenge = endChallenge;
