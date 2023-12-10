class Transaction{
    constructor(status, proposerID, accepterID, sort, productID){
        this.status = status;
        this.productID = productID;
        this.accepterID = accepterID;
        this.sort = sort;
        this.productID = productID;

    }
    
    checkStatus() {//return present status
        
        return this.status;
    }

    calculateRisk() {

    }
}

export default {Transaction};