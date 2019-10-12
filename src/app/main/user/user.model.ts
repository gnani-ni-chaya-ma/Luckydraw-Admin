export class User {
    username: string;
    ak_ques_st: number;
    contactNumber: string;
    earnedTickets: number[];
    points: number;
    questionState: number;
    ticketMapping: any[];

    /**
     * Constructor
     *
     * @param user
     */
    constructor(user) {
        {
            this.username = user.username || '';
            this.ak_ques_st = user.ak_ques_st || 0;
            this.contactNumber = user.contactNumber || '';
            this.earnedTickets = user.earnedTickets || [];
            this.points = user.points || 0;
            this.questionState = user.questionState || 0;
            this.ticketMapping = user.ticketMapping || [];
        }
    }
}
