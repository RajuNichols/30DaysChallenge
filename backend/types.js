"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Challenges = exports.User = void 0;
var User = /** @class */ (function () {
    function User(username, userPassword) {
        this.username = username;
        this.userPassword = userPassword;
        this.challenges = [];
        this.friends = [];
        this.numOfChallenges = 0;
    }
    return User;
}());
exports.User = User;
var Challenges = /** @class */ (function () {
    function Challenges(challengeName, challengeDifficulty, username, description) {
        this.challengeName = challengeName;
        this.challengeDifficulty = challengeDifficulty;
        this.startDate = new Date();
        this.endDate = new Date();
        this.endDate.setDate(this.startDate.getDate() + 30);
        this.isComplete = false;
        this.description = description;
        var i;
        for (i = 0; i < 30; i++) {
            this.daysCompleted[i] = false;
        }
        this.challengeToken = username + challengeName;
    }
    Challenges.prototype.getCompletedArray = function () {
        return this.daysCompleted;
    };
    Challenges.prototype.completeDay = function (index) {
        this.daysCompleted[index] = true;
    };
    Challenges.prototype.challengeComplete = function () {
        this.isComplete = true;
    };
    return Challenges;
}());
exports.Challenges = Challenges;
