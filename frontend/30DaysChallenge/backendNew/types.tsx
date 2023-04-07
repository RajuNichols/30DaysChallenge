export class User{
    username:string;
    userPassword:string;
    email:string;
    challenges:string[];
    friends:string[];
    numOfChallenges:number;
 
    constructor(username:string, userPassword:string, email:string){
        this.username = username;
        this.userPassword = userPassword;
        this.email = email;
        this.challenges = [];
        this.friends = [];
        this.numOfChallenges = 0;
    }
 }
 
 
export class Challenges{
    challengeName:string;
    challengeToken:string;
    challengeDifficulty:number;
    description:string;
    daysCompleted:boolean[];
    startDate:Date;
    endDate:Date;
    isComplete:boolean;
 
    constructor(challengeName:string, challengeDifficulty:number, username:string, description:string){
        this.challengeName = challengeName;
        this.challengeDifficulty = challengeDifficulty;
        this.startDate = new Date();
        this.endDate = new Date();
        this.endDate.setDate(this.startDate.getDate() + 30);
        this.isComplete = false;
        this.description = description;
        this.daysCompleted = [];
 
        var i:number;
        for(i=0; i<30; i++){
            this.daysCompleted.push(false);
        }

        this.challengeToken=username+challengeName;
    }
 
    public getCompletedArray(): boolean[]{
        return this.daysCompleted;
    }

    public completeDay(index:number){
        this.daysCompleted[index] = true;
    }
 
    public challengeComplete(){
        this.isComplete = true;
    }
 }