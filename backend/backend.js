"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var user = new types_1.User("anushamish", "password");
/*app.get('/', (req, res) => {
 res.send('Hello World!')
})


app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})*/
function login(username, userPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
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
                        var friendsArray;
                        if (friendtemp != "") {
                            friendsArray = friendtemp.split(",");
                        }
                        var tokentemp = snapshot.child("challengeTokens").val();
                        var tokenArray;
                        if (tokentemp != "") {
                            tokenArray = tokentemp.split(",");
                        }
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
            return [2 /*return*/, "Something went wrong in login."];
        });
    });
}
exports.login = login;
function createAccount(username, userPassword) {
    return __awaiter(this, void 0, void 0, function () {
        var check;
        return __generator(this, function (_a) {
            check = false;
            (0, database_1.get)((0, database_1.child)(dbRef, "users/".concat(username))).then(function (snapshot) {
                if (!snapshot.exists()) {
                    (0, database_1.set)((0, database_1.ref)(db, 'users/' + username), {
                        password: userPassword,
                        challenges: "",
                        friends: "",
                        numOfChallenges: "0"
                    });
                    console.log("Added user.");
                    check = true;
                }
                else {
                    var error = "User already exists.";
                    console.log(error);
                    check = false;
                }
            }).catch(function (error) {
                console.error(error);
                check = false;
            });
            return [2 /*return*/, check];
        });
    });
}
exports.createAccount = createAccount;
function sendUser(username) {
    return __awaiter(this, void 0, void 0, function () {
        var temp;
        return __generator(this, function (_a) {
            if (username == user.username) {
                return [2 /*return*/, user];
            }
            temp = new types_1.User("", "");
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
            return [2 /*return*/, temp];
        });
    });
}
exports.sendUser = sendUser;
function updateUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, database_1.get)((0, database_1.child)(dbRef, "users/".concat(user.username))).then(function (snapshot) {
                if (snapshot.exists()) {
                    var friendtemp = "";
                    var tokentemp = "";
                    var i;
                    if (user.friends.length != 0) {
                        for (i = 0; i < user.friends.length; i++) {
                            friendtemp += user.friends[i];
                            if (i + 1 != user.friends.length) {
                                friendtemp += ",";
                            }
                        }
                    }
                    if (user.challenges.length != 0) {
                        for (i = 0; i < user.challenges.length; i++) {
                            tokentemp += user.challenges[i];
                            if (i + 1 != user.challenges.length) {
                                tokentemp += ",";
                            }
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
            return [2 /*return*/, "Something went wrong"];
        });
    });
}
exports.updateUser = updateUser;
function addChallenge(challengeName, challengeDifficulty, challengeDescription) {
    return __awaiter(this, void 0, void 0, function () {
        var returnString, temp, string;
        return __generator(this, function (_a) {
            returnString = "";
            try {
                if (user != null) {
                    temp = new types_1.Challenges(challengeName, challengeDifficulty, user.username, challengeDescription);
                    user.challenges.push(temp.challengeToken);
                    user.numOfChallenges++;
                    string = updateUser(user);
                    console.log(string);
                    (0, database_1.set)((0, database_1.ref)(db, 'challenges/' + temp.challengeToken), {
                        challengeName: challengeName,
                        challengeDifficulty: challengeDifficulty,
                        description: challengeDescription,
                        startDate: temp.startDate,
                        endDate: temp.endDate,
                        completed: temp.isComplete
                    });
                    returnString = "Success!";
                }
                else {
                    returnString = "User is not logged in.";
                }
            }
            catch (e) {
                console.error(e);
            }
            return [2 /*return*/, returnString];
        });
    });
}
exports.addChallenge = addChallenge;
function getChallenges() {
    return __awaiter(this, void 0, void 0, function () {
        var temp, i;
        return __generator(this, function (_a) {
            temp = [];
            if (user != null) {
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
            return [2 /*return*/, temp];
        });
    });
}
exports.getChallenges = getChallenges;
function endChallenge(challengeName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (user != null) {
                user.challenges[challengeName].challengeComplete();
                return [2 /*return*/, "Success!"];
            }
            else {
                return [2 /*return*/, "User is not logged in."];
            }
            return [2 /*return*/];
        });
    });
}
exports.endChallenge = endChallenge;
