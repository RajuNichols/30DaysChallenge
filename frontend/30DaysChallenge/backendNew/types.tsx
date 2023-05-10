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
    userChallengeName:string;
    challengeToken:string;
    challengeDifficulty:number;
    description:string;
    daysCompleted:boolean[];
    startDate:Date;
    endDate:Date;
    isComplete:boolean;
    friends:string[];
    articleTitle:string;
    articleSource:string;
 
    constructor(userChallengeName:string, challengeDifficulty:number, username:string, description:string, articleTitle:string, articleSource:string){
        this.userChallengeName = userChallengeName;
        this.challengeDifficulty = challengeDifficulty;
        this.startDate = new Date();
        this.startDate.setHours(0, 0, 0, 0);
        this.endDate = new Date(this.startDate.getTime() + (30 * 24 * 60 * 60 * 1000));
        this.isComplete = false;
        this.description = description;
        this.daysCompleted = [];
 
        var i:number;
        for(i=0; i<30; i++){
            this.daysCompleted[i] = false;
        }

        this.challengeToken=username+userChallengeName;
        this.friends = [];
        this.articleTitle = articleTitle;
        this.articleSource = articleSource;
    }
 
    public challengeComplete(){
        this.isComplete = true;
    }
}

export class frontendDetails{
    challenge:Challenges;
    currentDay:number;
    daysComplete:friendsComplete[];

    constructor(){
        this.challenge = new Challenges("", 0, "", "", "", "");
        this.currentDay = 0;
        this.daysComplete = [];
    }
}

export class friendsComplete{
    name:string;
    completedDates:boolean[];

    constructor(){
        this.name = "";
        this.completedDates = [];
    }
}