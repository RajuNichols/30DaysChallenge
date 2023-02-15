class User{
    userID:string;
    username:string;
    userPassword:string;
    challenges:{ [key: string]: Challenges };
    private numOfChallenges:number;
 
 
    constructor(username:string, userPassword:string){
        this.username = username;
        this.userPassword = userPassword;
        this.challenges = {};
        this.numOfChallenges = 0;
    }
 
 
    public login(username:string, userPassword:string){
        /*
        Connect to Database and check username and password
        If they exist, login
        else, send error
        */
    }
 
 
    public forgotPassword(username:string, newUserPassword){
        /*
        Connect to Database and check username exists
        If they exist, change password on database
        else, send error
        */
    }
 
 
    public createUser(username:string, userPassword:string){
        /*Connect to Database and check if user exists
        if not, create user
        else, tell user to login
        */
    }
 
 
    public addChallenge(challengeName:string, challengeDifficulty:string){
        let temp = new Challenges(challengeName,challengeDifficulty);
        this.challenges[challengeName] = temp;
        this.numOfChallenges++;
    }
 
 
    public endChallenge(challengeName:string){
        this.challenges[challengeName].challengeComplete();
    }
 }
 
 
 class Challenges{
    challengeName:string;
    challengeDifficulty:string;
    daysCompleted:boolean[];
    date:Date;
 
 
    constructor(challengeName:string, challengeDifficulty:string){
        this.challengeName = challengeName;
        this.challengeDifficulty = challengeDifficulty;
 
 
        var i:number;
        for(i=0; i<30; i++){
            this.daysCompleted[i] = false;
        }
 
 
        this.date = new Date();
    }
 
 
    public getDayCompleted(index:number): boolean{
        return this.daysCompleted[index];
    }
 
 
    public challengeComplete(){
 
 
    }
 } 