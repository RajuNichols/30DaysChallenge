export class User{
    username:string;
    userPassword:string;
    challenges:{ [key: string]: Challenges };
    friends:string[];
    numOfChallenges:number;
 
    constructor(username:string, userPassword:string){
        this.username = username;
        this.userPassword = userPassword;
        this.challenges = {};
        this.friends = [];
        this.numOfChallenges = 0;
    }
 }
 
 
export class Challenges{
    challengeName:string;
    challengeToken:string;
    challengeDifficulty:number;
    daysCompleted:boolean[];
    startDate:Date;
    endDate:Date;
    isComplete:boolean;
 
    constructor(challengeName:string, challengeDifficulty:number, username:string){
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

        this.challengeToken=username+challengeName;
    }
 
    public getDayCompleted(index:number): boolean{
        return this.daysCompleted[index];
    }
 
    public challengeComplete(){
        this.isComplete = true;
    }
 } 