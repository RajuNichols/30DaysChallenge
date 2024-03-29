export class User{
    username:string;
    userPassword:string;
    email:string;
    challenges:string[];
    friends:string[];
    numOfChallenges:number;
    alcDifficulty:number;
    smokingDifficulty:number;
 
    constructor(username:string, userPassword:string, email:string, alcDifficulty:number, smokingDifficulty:number){
        this.username = username;
        this.userPassword = userPassword;
        this.email = email;
        this.challenges = [];
        this.friends = [];
        this.numOfChallenges = 0;
        this.alcDifficulty = alcDifficulty;
        this.smokingDifficulty = smokingDifficulty;
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
    code:string;
 
    constructor(userChallengeName:string, challengeDifficulty:number, username:string, description:string, articleTitle:string, articleSource:string, challengeCode:string){
        this.userChallengeName = userChallengeName;
        this.challengeDifficulty = challengeDifficulty;
        this.startDate = new Date();
        this.startDate.setHours(0, 0, 0, 0);
        //this.startDate.setTime(this.startDate.getTime() - (10 * 24 * 60 * 60 * 1000));
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
        this.code = challengeCode;
    }
 
    public challengeComplete(){
        this.isComplete = true;
    }
}

export class Article{
    name:string;
    title:string;
    desc:string;
    source:string;

    constructor(name:string, title:string, desc:string, source:string){
        this.name = name;
        this.title = title;
        this.desc = desc;
        this.source = source;
    }
}

export class frontendDetails{
    challenge:Challenges;
    currentDay:number;
    daysComplete:friendsComplete[];

    constructor(){
        this.challenge = new Challenges("", 0, "", "", "", "", "");
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