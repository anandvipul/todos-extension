// Task Class Declaration
// Requirements:
//      Title
//      Expected Duration in Minutes
//      Task Creation Time
//      Expected End Time Stamp

class Task {
    constructor(title, userDuration) {
        this.title = title;
        this.expectedDuration = userDuration;
        this.creationtime = new Date();
        this.expectedEndTime = new Date(this.creationtime.getTime() + userDuration*60*1000);
    }
}