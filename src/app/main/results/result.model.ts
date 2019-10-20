export class Result {
    date: any;
    result: any[];

    /**
     * Constructor
     *
     * @param result
     */
    constructor(result) {
        {
            this.date = result.date || '';
            this.result = result.result || [];
        }
    }
}
