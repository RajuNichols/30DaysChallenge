class User{
    userID:string;
    username:string;
    userPassword:string;
    challenges:{ [key: string]: Challenges };
    numOfChallenges:number;
 
    constructor(username:string, userPassword:string){
        this.username = username;
        this.userPassword = userPassword;
        this.challenges = {};
        this.numOfChallenges = 0;
    }
 }
 
 
 class Challenges{
    challengeName:string;
    challengeDifficulty:number;
    daysCompleted:boolean[];
    startDate:Date;
    endDate:Date;
    isComplete:boolean;
 
    constructor(challengeName:string, challengeDifficulty:number){
        this.challengeName = challengeName;
        this.challengeDifficulty = challengeDifficulty;
        this.startDate = new Date();
        this.endDate = new Date();
        this.endDate.setDate(this.startDate.getDate() + 30);
        this.isComplete = false;
 
        var i:number;
        for(i=0; i<30; i++){
            this.daysCompleted[i] = false;
        }
    }
 
    public getDayCompleted(index:number): boolean{
        return this.daysCompleted[index];
    }
 
    public challengeComplete(){
        this.isComplete = true;
    }
 } 