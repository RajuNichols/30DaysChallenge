const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => {
 res.send('Hello World!')
})


app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})

function login(username:string, userPassword:string){
    /*
    Connect to Database and check username and password
    If they exist, login
    else, send error
    */
}

function forgotPassword(username:string, newUserPassword){
    /*
    Connect to Database and check username exists
    If they exist, change password on database
    else, send error
    */
}

function createUser(username:string, userPassword:string){
    /*
    Connect to Database and check if user exists
    if not, create user
    else, tell user to login
    */
}

function addChallenge(challengeName:string, challengeDifficulty:number){
    var user:User;
    let temp = new Challenges(challengeName,challengeDifficulty);
    //user.challenges[challengeName] = temp;
    //user.numOfChallenges++;
}

function endChallenge(challengeName:string){
    //user.challenges[challengeName].challengeComplete();
}